<?php

require_once('../../include.php');
$pdo = db_connect();

try {
    $crud = new CRUD($pdo, Courses);

    $columns = ['id', 'title', 'difficulty', 'shortdesc'];

    $courses = $crud->list(
        columns: $columns
    );

    return_json($courses);
} catch (Exception $e) {
    return_json(['error' => $e->getMessage()], 500);
}
