<?php

require_once('../../include.php');
$pdo = db_connect();

if (!isset($_GET['id']) || !isset($_GET['p'])) {
    return_json(["status" => "not_found"], 404);
}

$id = $_GET['id'];
$p = $_GET['p'];

try {
    $crud = new CRUD($pdo, Courses);

    $columns = ['id', 'title', 'content'];

    $course = $crud->read(
        id: $id,
        columns: $columns
    );

    $content = json_decode($course['content'], true);

    $response = $content[$p];
    $response['courseTitle'] = $course['title'];
    if ($p > 0) {
        $response['prevPage'] = $content[$p - 1]['title'];
    }
    if ($p < count($content) - 1) {
        $response['nextPage'] = $content[$p + 1]['title'];
    }

    return_json($response);
} catch (Exception $e) {
    return_json(['error' => $e->getMessage()], 500);
}
