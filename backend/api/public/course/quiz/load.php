<?php

require_once('../../../include.php');
$pdo = db_connect();
start_auth();

exit_if_unauthed();

if (!isset($_GET['id'])) {
    return_json(["status" => "not_found"], 404);
}

$id = $_GET['id'];

try {
    $crud = new CRUD($pdo, Course_Progress);

    $progress = $crud->read(
        id: $id,
        columns: ['id', 'user_id', 'course_id', 'quiz_answers', 'quiz_progress']
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
        columns: ['id', 'title', 'content', 'quiz']
    );

    if ($course === null) {
        throw new Exception("Failed to get course data!");
    }

    // Get quiz data
    $quiz = json_decode($course['quiz'], true);

    // Remove answers from quiz data
    foreach ($quiz['items'] as &$item) {
        unset($item['correct']);
    }

    $quiz_answers = json_decode($progress['quiz_answers'], true);

    $response = [
        'progress_id' => $id,
        'course_id' => $course['id'],
        'course_title' => $course['title'],
        'quiz' => $quiz,
        'answers' => $quiz_answers,
        'progress' => $progress['quiz_progress'],
    ];

    return_json($response);
} catch (Exception $e) {
    return_json(['error' => $e->getMessage()], 500);
}
