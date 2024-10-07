<?php

require_once('../../include.php');
$pdo = db_connect();
start_auth();

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
        $response['prev_page'] = $content[$p - 1]['title'];
    }
    if ($p < count($content) - 1) {
        $response['next_page'] = $content[$p + 1]['title'];
    }


    if (is_authed()) {
        $user = get_user();
        $crud2 = new CRUD($pdo, Course_Progress);

        $currentDate = date('Y-m-d H:i:s');

        $exists = $crud2->read(
            id: $user['id'],
            id_column: 'user_id',
            columns: ['user_id']
        ) !== null;

        if ($exists) {
            $update_result = $crud2->update(
                id: $user['id'],
                id_column: 'user_id',
                data: ['content_progress' => $p]
            );
        } else {
            $create_result = $crud2->create([
                'user_id' => $user['id'],
                'course_id' => $id,
                'start_date' => $currentDate,
                'end_date' => null,
                'quiz_answers' => '[]',
                'quiz_score' => 0,
                'content_progress' => $p,
                'status' => 'inprogress'
            ]);
        }
    }

    return_json($response);
} catch (Exception $e) {
    return_json(['error' => $e->getMessage()], 500);
}
