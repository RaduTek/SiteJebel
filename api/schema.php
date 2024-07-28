<?php

// User ===================================================

/**
 * User table schema
 */
const User = [
    'id' => PDO::PARAM_STR,
    'name' => PDO::PARAM_STR,
    'email' => PDO::PARAM_STR,
    'phone' => PDO::PARAM_STR,
    'password' => PDO::PARAM_STR,
    'isAdmin' => PDO::PARAM_BOOL
];

/**
 * User table sensitive keys 
 * (keys that need to be removed when data is sent to frontend)
 * 
 * Used in auth.php
 */
const User_sensitive_keys = ['password'];

/**
 * User table object
 */
const Table_Users = ['users' => User];


// Event ==================================================

/**
 * Event table schema
 */
const Event = [
    'id' => PDO::PARAM_INT,
    'date' => PDO::PARAM_STR,
    'title' => PDO::PARAM_STR,
    'photoId' => PDO::PARAM_STR,
    'color' => PDO::PARAM_STR,
    'description' => PDO::PARAM_STR,
    'visible' => PDO::PARAM_BOOL,
    'link' => PDO::PARAM_STR,
    'linkTitle' => PDO::PARAM_STR
];

/**
 * Events table object
 */
const Table_Events = ['events' => Event];


// DB_Tables ==============================================

/**
 * Associative array with database table objects
 */
const DB_Tables = [
    ...Table_Users,
    ...Table_Events
];
