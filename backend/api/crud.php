<?php

/**
 * CRUD class, that implements Create, Read, Update and Delete operations on a table, with PDO.
 */
class CRUD
{
    private PDO $pdo;
    private string $table;
    private array $columns;

    public function __construct(PDO $pdo, array $schema)
    {
        $this->pdo = $pdo;
        $this->table = $schema['table_name'];
        $this->columns = $schema['columns'];
    }

    /**
     * Get the columns from the schema
     * 
     * @param bool $without_id Whether to exclude the id column.
     * @return array The column names.
     */
    public function get_columns(bool $without_id = false): array
    {
        $columns = array_keys($this->columns);
        if ($without_id && in_array('id', $columns)) {
            unset($columns[array_search('id', $columns)]);
        }
        return $columns;
    }

    /**
     * Create a new record in the table.
     * 
     * @param array $data The data to insert.
     * @return bool Whether the operation was successful.
     */
    public function create(array $data): bool
    {
        $columns = array_keys($data);
        foreach ($columns as $col) {
            if ($col == 'id') continue;
            if (!array_key_exists($col, $this->columns))
                throw new InvalidArgumentException("Column $col does not exist in the schema.");
        }

        $columns_str = implode(", ", $columns);
        $bind_keys_str = implode(", ", array_map(fn ($col) => ":$col", $columns));

        $query = "INSERT INTO {$this->table} ({$columns_str}) VALUES ({$bind_keys_str})";
        $stmt = $this->pdo->prepare($query);

        foreach ($columns as $col) {
            $stmt->bindValue(":{$col}", $data[$col]);
        }

        return $stmt->execute();
    }

    /**
     * Read a record by its ID.
     * 
     * @param mixed $id The ID of the record.
     * @param string $id_column The name of the ID column.
     * @param array $columns The columns to select.
     * @return array|null The record, or null if not found.
     */
    public function read(mixed $id, string $id_column = 'id', array $columns = ['*']): ?array
    {
        foreach ($columns as $col) {
            if ($col !== '*' && !array_key_exists($col, $this->columns)) {
                throw new InvalidArgumentException("Column $col does not exist in the schema.");
            }
        }

        $columns_str = implode(", ", $columns);
        $query = "SELECT {$columns_str} FROM {$this->table} WHERE {$id_column} = :id";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindValue(':id', $id);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result ?: null;
    }

    /**
     * Update a record by its ID.
     * 
     * @param mixed $id The ID of the record.
     * @param array $data The data to update.
     * @param string $id_column The name of the ID column.
     * @return bool Whether the operation was successful.
     */
    public function update(mixed $id, array $data, string $id_column = 'id'): bool
    {
        $columns = array_keys($data);
        foreach ($columns as $col) {
            if ($col == $id_column) continue;
            if (!array_key_exists($col, $this->columns))
                throw new InvalidArgumentException("Column $col does not exist in the schema.");
        }

        $update_str = implode(", ", array_map(fn ($col) => "$col = :$col", $columns));

        $query = "UPDATE {$this->table} SET {$update_str} WHERE {$id_column} = :id";
        $stmt = $this->pdo->prepare($query);

        foreach ($columns as $col) {
            $stmt->bindValue(":{$col}", $data[$col]);
        }
        $stmt->bindValue(':id', $id);

        return $stmt->execute();
    }

    /**
     * Delete a record by its ID.
     * 
     * @param mixed $id The ID of the record.
     * @param string $id_column The name of the ID column.
     * @return bool Whether the operation was successful.
     */
    public function delete(mixed $id, string $id_column = 'id'): bool
    {
        $query = "DELETE FROM {$this->table} WHERE {$id_column} = :id";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindValue(':id', $id);

        return $stmt->execute();
    }

    /**
     * Create the table based on the schema, adding columns if they don't exist.
     * 
     * @return bool Whether the operation was successful.
     */
    public function createOrUpdateTable(): bool
    {
        $columns = [];
        foreach ($this->columns as $col => $options) {
            $column_def = "$col " . $options['type'];
            if (isset($options['index']) && $options['index'] === 'primary') {
                $column_def .= " PRIMARY KEY";
            }
            if (isset($options['unique']) && $options['unique']) {
                $column_def .= " UNIQUE";
            }
            $columns[] = $column_def;
        }

        $columns_str = implode(", ", $columns);
        $query = "CREATE TABLE IF NOT EXISTS {$this->table} ({$columns_str})";
        $stmt = $this->pdo->prepare($query);

        if (!$stmt->execute()) {
            return false;
        }

        // Add new columns if they don't exist
        foreach ($this->columns as $col => $options) {
            $query = "ALTER TABLE {$this->table} ADD COLUMN IF NOT EXISTS $col " . $options['type'];
            if (isset($options['unique']) && $options['unique']) {
                $query .= " UNIQUE";
            }
            $stmt = $this->pdo->prepare($query);
            $stmt->execute();
        }

        return true;
    }

    /**
     * Count the number of records with optional filters.
     * 
     * @param array $filters An associative array of column names and values to filter by.
     * @return int The number of records.
     * @throws InvalidArgumentException If any column name is not in the schema.
     */
    public function count(array $filters = []): int
    {
        $where_clauses = [];
        $bind_values = [];
        foreach ($filters as $col => $value) {
            if (!array_key_exists($col, $this->columns)) {
                throw new InvalidArgumentException("Column $col does not exist in the schema.");
            }
            $where_clauses[] = "$col = :$col";
            $bind_values[":$col"] = $value;
        }

        $where_str = !empty($where_clauses) ? "WHERE " . implode(" AND ", $where_clauses) : "";
        $query = "SELECT COUNT(*) FROM {$this->table} {$where_str}";

        $stmt = $this->pdo->prepare($query);
        foreach ($bind_values as $placeholder => $value) {
            $stmt->bindValue($placeholder, $value);
        }

        $stmt->execute();
        return (int) $stmt->fetchColumn();
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
    public function list(
        array $filters = [],
        array $columns = ['*'],
        string $order_by = 'id',
        string $order_direction = 'ASC',
        ?int $limit = null,
        ?int $offset = null
    ): array {
        foreach ($columns as $col) {
            if ($col !== '*' && !array_key_exists($col, $this->columns)) {
                throw new InvalidArgumentException("Column $col does not exist in the schema.");
            }
        }

        $columns_str = implode(", ", $columns);
        $where_clauses = [];
        $bind_values = [];
        foreach ($filters as $col => $filter) {
            $col_bind_id = rand(1000, 9999);
            $col_bind = ":{$col}_f{$col_bind_id}";

            if (!array_key_exists($col, $this->columns)) {
                throw new InvalidArgumentException("Column $col does not exist in the schema.");
            }

            if (!is_array($filter)) {
                // Single value filter
                $where_clauses[] = "{$col} = {$col_bind}";
                $bind_values[$col_bind] = $filter;
            } else {
                // Associative array filter
                $value = $filter['value'];
                $operator = $filter['operator'];
                $bind = $filter['bind'] ?? true;

                if ($bind === false) {
                    // Don't bind value
                    $where_clauses[] = "{$col} {$operator} {$value}";
                } else {
                    // Bind value
                    $where_clauses[] = "{$col} {$operator} {$col_bind}";
                    $bind_values[$col_bind] = $value;
                }
            }
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
            $stmt->bindValue($placeholder, $value);
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
}
