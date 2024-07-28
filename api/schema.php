<?php

$User = [
    'id' => PDO::PARAM_STR,
    'name' => PDO::PARAM_STR,
    'email' => PDO::PARAM_STR,
    'phone' => PDO::PARAM_STR,
    'isAdmin' => PDO::PARAM_BOOL
];

$Event = [
    'id' => PDO::PARAM_INT,
    'date' => PDO::PARAM_STR,
    'title' => PDO::PARAM_STR,
    'photoId' => PDO::PARAM_STR,
    'color' => PDO::PARAM_STR,
    'description' => PDO::PARAM_STR,
    'link' => PDO::PARAM_STR
];

/**
 * Associative array that links the table names with matching schemas
 */
$db_tables = [
    "users" => $User,
    "events" => $Event
];
