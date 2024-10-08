<?php

require_once('../../include.php');
$pdo = db_connect();
start_auth();

exit_if_unauthed();

if (!isset($_GET['id'])) {
    return_json(["status" => "bad_request"], 400);
}

$id = $_GET['id'];

try {
    $crud = new CRUD($pdo, Course_Progress);

    $user = get_user();

    // Check if user has already started course
    $existing = $crud->list(
        filters: [
            'user_id' => $user['id'],
            'course_id' => $id
        ],
        columns: ['id', 'status', 'content_progress'],
        limit: 1
    );

    if (count($existing) > 0) {
        // Return existing progress ID
        return_json([
            'progress_id' => $existing[0]['id'],
            'status' => $existing[0]['status'],
            'content_progress' => $existing[0]['content_progress'],
        ]);
    } else {
        // Start new course progress session
        $progress_id = new_guid();
        $current_date = date('Y-m-d H:i:s');

        $create_ok = $crud->create([
            'id' => $progress_id,
            'user_id' => $user['id'],
            'course_id' => $id,
            'start_date' => $current_date,
            'end_date' => null,
            'quiz_answers' => '[]',
            'quiz_score' => 0,
            'quiz_progress' => 0,
            'content_progress' => 0,
            'status' => 'inprogress',
        ]);

        if ($create_ok) {
            return_json([
                'progress_id' => $progress_id,
                'status' => 'inprogress',
                'content_progress' => 0,
            ]);
        } else {
            throw new Exception("Error creating new course progress session!");
        }
    }

    return_json($response);
} catch (Exception $e) {
    return_json(['error' => $e->getMessage()], 500);
}
