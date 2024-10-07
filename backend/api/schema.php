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
            'type' => 'VARCHAR(128)',
        ],
        'coverPhoto' => [
            'type' => 'VARCHAR(255)',
        ],
        'content' => [
            'type' => 'MEDIUMTEXT',
        ],
        'visible' => [
            'type' => 'BOOLEAN',
        ],
    ],
];

const Courses = [
    'table_name' => 'courses',
    'columns' => [
        'id' => [
            'type' => 'VARCHAR(64)',
            'index' => 'primary',
            'unique' => true,
        ],
        'title' => [
            'type' => 'VARCHAR(128)',
        ],
        'difficulty' => [
            'type' => 'VARCHAR(128)',
        ],
        'shortdesc' => [
            'type' => 'VARCHAR(255)',
        ],
        'description' => [
            'type' => 'TEXT',
        ],
        'quiz' => [
            'type' => 'MEDIUMTEXT',
        ],
        'content' => [
            'type' => 'MEDIUMTEXT',
        ],
    ]
];

const Course_Progress = [
    'table_name' => 'course_progress',
    'columns' => [
        'id' => [
            'type' => 'VARCHAR(64)',
            'index' => 'primary',
            'unique' => true,
        ],
        'course_id' => [
            'type' => 'VARCHAR(64)',
        ],
        'user_id' => [
            'type' => 'VARCHAR(64)',
        ],
        'start_date' => [
            'type' => 'DATETIME',
        ],
        'end_date' => [
            'type' => 'DATETIME',
        ],
        'quiz_answers' => [
            'type' => 'TEXT',
        ],
        'quiz_score' => [
            'type' => 'INT',
        ],
        'content_progress' => [
            'type' => 'INT',
        ],
        'status' => [
            'type' => 'VARCHAR(64)',
        ],
    ]
];

// DB_Tables ==============================================

/**
 * Associative array with database table objects
 */
const DB_Tables = [
    Users,
    Events,
    Blog_Posts,
    Courses,
    Course_Progress,
];
