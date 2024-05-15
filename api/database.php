<?php

function db_connect() {
    global $ENV;
    
    try {
        $pdo = new PDO("mysql:host=" . $ENV['DB_HOST'] . ";dbname=" . $ENV['DB_NAME'], $ENV['DB_USER'], $ENV['DB_PASS']);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);    
    } catch (PDOException $e) {
        if ($ENV['DEBUG'])
            echo 'PDO Error: ' . $e -> getMessage();
        return NULL;
    }

    return $pdo;
}

?>