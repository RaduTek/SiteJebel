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
