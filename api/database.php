<?php

$DB = [];
$DB_CONN = NULL;

function get_binding_type($value) {
    if (is_int($value))
        return 'i';
    if (is_float($value))
        return 'd';
    return 's';
}

function db_connect() {
    global $DB_CONN, $ENV;
    
    if ($DB_CONN != NULL) return;

    $DB_CONN = new mysqli($ENV['DB_HOST'], $ENV['DB_USER'], $ENV['DB_PASS'], $ENV['DB_NAME']);

    if ($DB_CONN -> connect_error) {
        die("Connection to database failed! Reason: " . $DB_CONN -> connect_error);
    }
}

function count_all_rows($table_name) {
    global $DB_CONN;
    if (is_null($DB_CONN)) return NULL;
    
    $count_query = "SELECT COUNT(*) AS total FROM $table_name";
    $count_result = $DB_CONN -> query($count_query);

    if ($count_result->num_rows > 0) {
        $count_row = $count_result->fetch_assoc();
        return intval($count_row['total']);
    }
}

function select_from($table_name, $columns=null, $limit=0, $offset=0) {
    global $DB_CONN;
    if (is_null($DB_CONN)) return NULL;
    
    if ($columns == null)
        $column_names = "*";
    else
        $column_names = implode(', ', $columns);

    $sql = "SELECT $column_names FROM $table_name";

    if ($limit > 0)
        $sql .= " LIMIT $limit OFFSET $offset";

    return $DB_CONN -> query($sql);
}

function select_from_where($table_name, $columns=null, $id_value, $id_column="id", $comparison_type="=", $limit=0, $offset=0) {
    global $DB_CONN;
    if (is_null($DB_CONN)) return NULL;
    
    if ($columns == null)
        $column_names = "*";
    else
        $column_names = implode(', ', $columns);

    $sql = "SELECT $column_names FROM $table_name WHERE $id_column $comparison_type ?";

    if ($limit > 0)
        $sql .= " LIMIT $limit OFFSET $offset";

    $stmt = $DB_CONN -> prepare($sql);
    $stmt -> bind_param(get_binding_type($id_value), $id_value);
    $stmt -> execute();

    $DB['last_error'] = $stmt -> error;

    return $stmt -> get_result();
}

function insert_into($table_name, $values) {
    global $DB_CONN, $DB;
    if (is_null($DB_CONN)) return NULL;
    
    $columns = array_keys($values);
    $column_names = implode(', ', $columns);
    $column_placeholders = implode(', ', array_fill(0, count($columns), '?'));

    $sql = "INSERT INTO $table_name ($column_names) VALUES ($column_placeholders)";
    $stmt = $DB_CONN -> prepare($sql);
    
    $bind_values = array_values($values);
    $bind_types = "";
    foreach ($values as $value) {
        $bind_types .= get_binding_type($value);
    }

    $stmt -> bind_param($bind_types, ...$bind_values);
    $stmt -> execute();

    $DB['last_error'] = $stmt -> error;

    return !($stmt -> error);
}

function delete_from($table_name, $id_value, $id_column="id", $comparison_type="=") {
    global $DB_CONN, $DB;
    if (is_null($DB_CONN)) return NULL;

    $sql = "DELETE FROM $table_name WHERE $id_column $comparison_type ?";
    $stmt = $DB_CONN->prepare($sql);
    $stmt->bind_param("i", $id_value);
    $stmt->execute();

    $DB['last_error'] = $stmt -> error;

    return $stmt->affected_rows > 0;
}

function update_where($table_name, $values, $id_value, $id_column="id", $comparison_type="=") {
    global $DB_CONN, $DB;
    if (is_null($DB_CONN)) return NULL;

    $columns = array_keys($values);
    $column_names = implode(" = ?, ", $columns) . " = ?";

    $sql = "UPDATE $table_name SET $column_names WHERE $id_column $comparison_type ?";
    $stmt = $DB_CONN->prepare($sql);
    
    $bind_values = array_values($values);
    $bind_types = "";
    foreach ($values as $value) {
        $bind_types .= get_binding_type($value);
    }
    $bind_values[] = $id_value;
    $bind_types .= "i";

    $stmt->bind_param($bind_types, ...$bind_values);
    $stmt->execute();

    $DB['last_error'] = $stmt -> error;

    return $stmt->affected_rows > 0;
}

?>