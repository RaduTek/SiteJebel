<?php

require_once('../../include.php');
$pdo = db_connect();
start_auth();

try {
    $crud = new CRUD($pdo, Courses);
    $crud2 = new CRUD($pdo, Course_Progress);

    $columns = ['id', 'title', 'difficulty', 'shortdesc'];

    $courses = $crud->list(
        columns: $columns
    );

    if (is_authed()) {
        $user = get_user();
        $crud2 = new CRUD($pdo, Course_Progress);

        $filters = ['user_id' => $user['id']];

        $progress = $crud2->list(
            $filters,
            columns: ['user_id', 'course_id', 'status', 'content_progress'],
            order_by: 'course_id'
        );

        $course_status = [];

        foreach ($progress as $row) {
            $course_status[$row['course_id']] = [
                'status' => $row['status'],
                'content_progress' => $row['content_progress']
            ];
        }

        for ($i = 0; $i < count($courses); $i++) {
            $course_id = $courses[$i]['id'];

            if (isset($course_status[$course_id])) {
                $courses[$i] = array_merge($courses[$i], $course_status[$course_id]);
            } else {
                $courses[$i]['status'] = 'notstarted';
                $courses[$i]['content_progress'] = 0;
            }
        }
    }

    return_json($courses);
} catch (Exception $e) {
    return_json(['error' => $e->getMessage()], 500);
}
