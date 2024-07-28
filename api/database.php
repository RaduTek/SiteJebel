<?php

/**
 * This file contains database related functions
 * like the connection function and the CRUD class
 */

/**
 * Initializes a new connection to a database
 * @return PDO|null
 */
function db_connect(): ?PDO
{
    global $ENV;

    // build PDO Data Source Name string
    if ($ENV['DB_TYPE'] == 'sqlite')
        $pdo_dsn = "sqlite:{$ENV['DB_FILE']}";
    else
        $pdo_dsn = "{$ENV['DB_TYPE']}:host={$ENV['DB_HOST']};dbname={$ENV['DB_NAME']}";

    try {
        $pdo = new PDO($pdo_dsn, $ENV['DB_USER'], $ENV['DB_PASS']);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        if ($ENV['DEBUG'])
            echo 'PDO Error: ' . $e->getMessage();
        return NULL;
    }

    return $pdo;
}

/**
 * CRUD class, that implements Create, Read, Update and Delete operations on a table, with PDO.
 */
class CRUD
{
    private PDO $pdo;
    private string $table;
    private array $schema;
    private array $columns;

    /**
     * Constructor to initialize PDO instance, table name, and schema.
     * 
     * @param PDO $pdo The PDO instance.
     * @param array $table_schema Key/value pair that defines the table name and table schema
     */
    public function __construct(PDO $pdo, array $table_schema)
    {
        $this->pdo = $pdo;
        $this->table = key($table_schema);
        $this->schema = current($table_schema);

        $this->columns = array_keys($this->schema);
    }


    /**
     * Get the columns of the table.
     * 
     * @param bool $without_id If true, the 'id' column is excluded from the result.
     * @return array The list of column names.
     */
    public function get_columns(bool $without_id = false): array
    {
        $columns = $this->columns;

        if ($without_id && in_array('id', $columns)) {
            unset($columns[array_search('id', $columns)]);
        }

        return $columns;
    }

    /**
     * Insert a new record into the table.
     * 
     * @param array $data An associative array of column names and values to insert.
     * @return bool True on success, false on failure.
     * @throws InvalidArgumentException If any column name is not in the schema.
     */
    public function create(array $data): bool
    {
        $columns = array_keys($data);
        foreach ($columns as $col) {
            if ($col == 'id')
                continue;
            if (!array_key_exists($col, $this->schema))
                throw new InvalidArgumentException("Column $col does not exist in the schema.");
        }

        $columns_str = implode(", ", $columns);
        $bind_keys_str = implode(", ", array_map(fn ($col) => ":$col", $columns));

        $query = "INSERT INTO {$this->table} ({$columns_str}) VALUES ({$bind_keys_str})";
        $stmt = $this->pdo->prepare($query);

        foreach ($columns as $col) {
            $stmt->bindValue(":{$col}", $data[$col], $this->schema[$col]);
        }

        return $stmt->execute();
    }

    /**
     * Retrieve a single record by its ID or other specified column.
     * 
     * @param mixed $id The value of the ID or other specified column.
     * @param string $id_column The name of the column to use for the lookup.
     * @param array $columns The columns to select.
     * @return array|null The retrieved record as an associative array, or null if not found.
     * @throws InvalidArgumentException If any specified column is not in the schema.
     */
    public function read(mixed $id, string $id_column = 'id', array $columns = ['*']): ?array
    {
        foreach ($columns as $col) {
            if ($col !== '*' && !array_key_exists($col, $this->schema)) {
                throw new InvalidArgumentException("Column $col does not exist in the schema.");
            }
        }

        $columns_str = implode(", ", $columns);
        $query = "SELECT {$columns_str} FROM {$this->table} WHERE {$id_column} = :id";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindValue(':id', $id, $this->getPDODataType($id));
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result ?: null;
    }

    /**
     * Update a record by its ID or other specified column.
     * 
     * @param mixed $id The value of the ID or other specified column.
     * @param array $data An associative array of column names and values to update.
     * @param string $id_column The name of the column to use for the lookup.
     * @return bool True on success, false on failure.
     * @throws InvalidArgumentException If any column name is not in the schema.
     */
    public function update(mixed $id, array $data, string $id_column = 'id'): bool
    {
        $columns = array_keys($data);
        foreach ($columns as $col) {
            if ($col == $id_column)
                continue;
            if (!array_key_exists($col, $this->schema))
                throw new InvalidArgumentException("Column $col does not exist in the schema.");
        }

        $update_str = implode(", ", array_map(fn ($col) => "$col = :$col", $columns));

        $query = "UPDATE {$this->table} SET {$update_str} WHERE {$id_column} = :id";
        $stmt = $this->pdo->prepare($query);

        foreach ($columns as $col) {
            $stmt->bindValue(":{$col}", $data[$col], $this->schema[$col]);
        }

        $stmt->bindValue(':id', $id, $this->getPDODataType($id));

        return $stmt->execute();
    }

    /**
     * Delete a record by its ID or other specified column.
     * 
     * @param mixed $id The value of the ID or other specified column.
     * @param string $id_column The name of the column to use for the lookup.
     * @return bool True on success, false on failure.
     */
    public function delete(mixed $id, string $id_column = 'id'): bool
    {
        $query = "DELETE FROM {$this->table} WHERE {$id_column} = :id";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindValue(':id', $id, $this->getPDODataType($id));

        return $stmt->execute();
    }

    /**
     * Create the table based on the schema, if it does not exist.
     * 
     * @return bool True on success, false on failure.
     */
    public function createTable(): bool
    {
        $columns = [];
        foreach ($this->schema as $col => $type) {
            $column_def = "$col " . $this->getColumnType($type);
            if ($col == 'id') {
                $column_def .= " PRIMARY KEY AUTO_INCREMENT";
            }
            $columns[] = $column_def;
        }

        $columns_str = implode(", ", $columns);
        $query = "CREATE TABLE IF NOT EXISTS {$this->table} ({$columns_str})";
        $stmt = $this->pdo->prepare($query);

        return $stmt->execute();
    }


    /**
     * Create or update the table based on the schema, if exists or not.
     * 
     * @return bool True on success, false on failure.
     */
    public function createOrUpdateTable(): bool
    {
        // Check if the table exists
        $query = "SHOW TABLES LIKE :table";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindValue(':table', $this->table, PDO::PARAM_STR);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            // Table exists, check and add new columns
            $query = "DESCRIBE {$this->table}";
            $stmt = $this->pdo->query($query);
            $existing_columns = $stmt->fetchAll(PDO::FETCH_COLUMN);

            $alter_table_queries = [];
            foreach ($this->schema as $col => $type) {
                if (!in_array($col, $existing_columns)) {
                    $alter_table_queries[] = "ADD COLUMN $col " . $this->getColumnType($type);
                }
            }

            if (!empty($alter_table_queries)) {
                $alter_query = "ALTER TABLE {$this->table} " . implode(", ", $alter_table_queries);
                $stmt = $this->pdo->prepare($alter_query);
                return $stmt->execute();
            }

            return true;
        } else {
            // Table does not exist, create it
            return $this->createTable();
        }
    }


    /**
     * Retrieve a list of records with optional filtering, sorting, and pagination.
     * 
     * @param array $filters An associative array of column names and values to filter by.
     * @param array $columns The columns to select.
     * @param string $order_by The column to order the results by.
     * @param string $order_direction The direction to order the results ('ASC' or 'DESC').
     * @param int|null $limit The maximum number of records to retrieve.
     * @param int|null $offset The number of records to skip.
     * @return array The retrieved records as an associative array.
     * @throws InvalidArgumentException If any column name is not in the schema.
     */
    public function list(array $filters = [], array $columns = ['*'], string $order_by = 'id', string $order_direction = 'ASC', ?int $limit = null, ?int $offset = null): array
    {
        foreach ($columns as $col) {
            if ($col !== '*' && !array_key_exists($col, $this->schema)) {
                throw new InvalidArgumentException("Column $col does not exist in the schema.");
            }
        }

        $columns_str = implode(", ", $columns);
        $where_clauses = [];
        $bind_values = [];
        foreach ($filters as $col => $value) {
            if (!array_key_exists($col, $this->schema)) {
                throw new InvalidArgumentException("Column $col does not exist in the schema.");
            }
            $where_clauses[] = "$col = :$col";
            $bind_values[":$col"] = $value;
        }

        $where_str = !empty($where_clauses) ? "WHERE " . implode(" AND ", $where_clauses) : "";
        $query = "SELECT {$columns_str} FROM {$this->table} {$where_str} ORDER BY {$order_by} {$order_direction}";
        if ($limit !== null) {
            $query .= " LIMIT :limit";
        }
        if ($offset !== null) {
            $query .= " OFFSET :offset";
        }

        $stmt = $this->pdo->prepare($query);

        foreach ($bind_values as $placeholder => $value) {
            $stmt->bindValue($placeholder, $value, $this->schema[substr($placeholder, 1)]);
        }
        if ($limit !== null) {
            $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        }
        if ($offset !== null) {
            $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        }

        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Get the PDO data type for a given variable.
     * 
     * @param mixed $var The variable to get the PDO data type for.
     * @return int The PDO data type.
     */
    private function getPDODataType(mixed $var): int
    {
        switch (true) {
            case is_int($var):
                return PDO::PARAM_INT;
            case is_bool($var):
                return PDO::PARAM_BOOL;
            case is_null($var):
                return PDO::PARAM_NULL;
            case is_string($var):
                return PDO::PARAM_STR;
            default:
                return PDO::PARAM_STR; // Fallback to string type for other data types
        }
    }

    /**
     * Get the SQL column type for a given PDO data type.
     * 
     * @param int $pdo_type The PDO data type.
     * @return string The SQL column type.
     */
    private function getColumnType(int $pdo_type): string
    {
        return match ($pdo_type) {
            PDO::PARAM_INT => 'INT',
            PDO::PARAM_BOOL => 'BOOLEAN',
            PDO::PARAM_NULL => 'NULL',
            PDO::PARAM_STR => 'VARCHAR(255)',
            default => 'VARCHAR(255)', // Fallback for other data types
        };
    }
}
