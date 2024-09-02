<?php

/**
 * User table schema
 */
const Users = [
    'table_name' => 'users',
    'columns' => [
        'id' => [
            'type' => 'VARCHAR(255)',
            'index' => 'primary',
            'unique' => true,
        ],
        'name' => [
            'type' => 'VARCHAR(255)',
        ],
        'email' => [
            'type' => 'VARCHAR(255)',
            'unique' => true,
        ],
        'phone' => [
            'type' => 'VARCHAR(255)',
        ],
        'password' => [
            'type' => 'VARCHAR(255)',
        ],
        'isAdmin' => [
            'type' => 'BOOLEAN',
        ],
    ],
    'sensitive_columns' => ['password'],
];

/**
 * Event table schema
 */
const Events = [
    'table_name' => 'events',
    'columns' => [
        'id' => [
            'type' => 'VARCHAR(255)',
            'index' => 'primary',
            'unique' => true,
        ],
        'date' => [
            'type' => 'DATETIME',
        ],
        'title' => [
            'type' => 'VARCHAR(255)',
        ],
        'photoUrl' => [
            'type' => 'VARCHAR(255)',
        ],
        'color' => [
            'type' => 'VARCHAR(7)', // Assuming color is stored as HEX (e.g., #EE0000)
        ],
        'description' => [
            'type' => 'TEXT',
        ],
        'visible' => [
            'type' => 'BOOLEAN',
        ],
        'linkTitle' => [
            'type' => 'VARCHAR(255)',
        ],
        'linkUrl' => [
            'type' => 'VARCHAR(255)',
        ],
    ],
];

const Blog_Posts = [
    'table_name' => 'blog_posts',
    'columns' => [
        'id' => [
            'type' => 'VARCHAR(64)',
            'index' => 'primary',
            'unique' => true,
        ],
        'date' => [
            'type' => 'DATETIME',
        ],
        'title' => [
            'type' => 'VARCHAR(255)',
        ],
        'coverPhoto' => [
            'type' => 'VARCHAR(255)',
        ],
        'content' => [
            'type' => 'TEXT',
        ],
        'visible' => [
            'type' => 'BOOLEAN',
        ],
    ],
];

// DB_Tables ==============================================

/**
 * Associative array with database table objects
 */
const DB_Tables = [
    Users,
    Events
];
