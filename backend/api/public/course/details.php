<?php

require_once('../../include.php');
$pdo = db_connect();

if (!isset($_GET['id'])) {
    return_json(["status" => "not_found"], 404);
}

$id = $_GET['id'];

try {
    $crud = new CRUD($pdo, Courses);

    $columns = ['id', 'title', 'difficulty', 'shortdesc', 'description'];

    $courses = $crud->read(
        id: $id,
        columns: $columns
    );

    return_json($courses);
} catch (Exception $e) {
    return_json(['error' => $e->getMessage()], 500);
}
