<?php

require_once('../../include.php');
$pdo = db_connect();
start_auth();

exit_if_unauthed();

if (!isset($_GET['id']) || !isset($_GET['p'])) {
    return_json(["status" => "bad_request"], 400);
}

$id = $_GET['id'];
$p = $_GET['p'];

try {
    $crud = new CRUD($pdo, Course_Progress);

    $progress = $crud->read(
        id: $id,
        columns: ['id', 'user_id', 'course_id']
    );

    if ($progress === null) {
        throw new Exception("Failed to get session ID!");
    }

    // Check if user is right
    $user = get_user();
    if ($progress['user_id'] !== $user['id']) {
        throw new Exception("Mismatch between user ID and session ID!");
    }

    // Get course data
    $crud2 = new CRUD($pdo, Courses);
    $course = $crud2->read(
        id: $progress['course_id'],
        columns: ['id', 'title', 'content']
    );

    if ($course === null) {
        throw new Exception("Failed to get course data!");
    }

    $content = json_decode($course['content'], true);

    $response = $content[$p];
    $response['courseTitle'] = $course['title'];
    if ($p > 0) {
        $response['prev_page'] = $content[$p - 1]['title'];
    }
    if ($p < count($content) - 1) {
        $response['next_page'] = $content[$p + 1]['title'];
    }

    // Save page progress
    $ok = $crud->update(
        id: $id,
        data: ['content_progress' => $p]
    );

    if (!$ok) {
        throw new Exception("Failed to save course page progress!");
    }

    return_json($response);
} catch (Exception $e) {
    return_json(['error' => $e->getMessage()], 500);
}
