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
    if (is_authed()) {
        $user = get_user();
        $crud = new CRUD($pdo, Course_Progress);

        $request = get_json();

        $answers = json_encode($request['answers']);

        $update_result = $crud->update(
            id: $id,
            data: [
                'quiz_answers' => $answers,
                'quiz_progress' => $request['progress'],
                'status' => 'inquiz'
            ]
        );
    }

    return_json($response);
} catch (Exception $e) {
    return_json(['error' => $e->getMessage()], 500);
}
