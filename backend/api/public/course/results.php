<?php

require_once('../../include.php');
$pdo = db_connect();
start_auth();

if (!isset($_GET['id'])) {
    return_json(["status" => "not_found"], 404);
}

$id = $_GET['id'];

try {
    $crud = new CRUD($pdo, Course_Progress);
    $crud2 = new CRUD($pdo, Courses);

    $progress = $crud->read($id);

    if ($progress === null) {
        return_json(["status" => "not_found"], 404);
    }

    if ($progress['status'] !== "passed" && $progress['status'] !== "failed") {
        return_json(["error" => "Cannot retrieve results for in progress course!"], 403);
    }

    $course = $crud2->read(
        id: $progress['course_id'],
        columns: ['quiz', 'title']
    );

    // Get questions and answers
    $quiz = json_decode($course['quiz'], true);
    $answers = json_decode($progress['quiz_answers'], true);
    $correct = json_decode($progress['quiz_correct'], true);

    $items = $quiz['items'];
    for ($i = 0; $i < count($items); $i++) {
        $items[$i]['answer'] = $answers[$i];
        $items[$i]['solved'] = $correct[$i];
    }
    $quiz['items'] = $items;

    $quiz['score'] = $progress['quiz_score'];

    $response = [
        'course_id' => $progress['course_id'],
        'course_title' => $course['title'],
        'quiz' => $quiz,
        'status' => $progress['status'],
        'start_date' => $progress['start_date'],
        'end_date' => $progress['end_date']
    ];

    return_json($response);
} catch (Exception $e) {
    return_json(['error' => $e->getMessage()], 500);
}
