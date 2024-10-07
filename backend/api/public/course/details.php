<?php

require_once('../../include.php');
$pdo = db_connect();
start_auth();

if (!isset($_GET['id'])) {
    return_json(["status" => "not_found"], 404);
}

$id = $_GET['id'];

try {
    $crud1 = new CRUD($pdo, Courses);
    $crud2 = new CRUD($pdo, Course_Progress);

    $columns = ['id', 'title', 'difficulty', 'shortdesc', 'description'];


    $course = $crud1->read(
        id: $id,
        columns: $columns
    );

    $result = $course;

    if (is_authed()) {
        $user = get_user();

        $filters = ['user_id' => $user['id']];

        $progress = $crud2->list($filters, order_by: 'start_date', order_direction: 'DESC', limit: 1);

        if (count($progress) > 0) {
            $progress = $progress[0];
            $result['continuePageId'] = $progress['content_progress'];
        } else {
            $result['continuePageId'] = 0;
        }
    }

    return_json($result);
} catch (Exception $e) {
    return_json(['error' => $e->getMessage()], 500);
}
