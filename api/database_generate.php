<?php

/**
 * This script generates the tables in the database, according to the schema
 * Database connection must be defined in environment file
 * 
 * $db_tables is an associative array of table names and schema arrays
 * it is defined in schema.php file
 * 
 * On successful run, a marker file is created
 * This file must be manually deleted for the script to be able to run again
 */


// Include file
require_once("include.php");

// If marker file is present, exit
// Debug flag disables this check           
if (!$ENV['DEBUG'] && file_exists("database_generated"))
    exit(500);

// Set output type
header('Content-Type: text/plain');

// Connect to the database and get PDO object
$pdo = db_connect();

$success_count = 0;

// For each table, create or update it
foreach (DB_Tables as $table => $schema) {
    try {
        $crud = new CRUD($pdo, [$table => $schema]);
        if ($crud->createOrUpdateTable()) {
            $success_count++;
        } else {
            echo "Failed to create/update table!\n";
        }
    } catch (Exception $e) {
        echo "Error creating/updating table: {$e->getMessage()}!\n";
    }
}

echo "{$success_count} tables processed successfully!\n";

// Create marker file   
file_put_contents('database_generated', '');
