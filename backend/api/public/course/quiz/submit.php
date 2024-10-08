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
    $crud2 = new CRUD($pdo, Courses);

    $progress = $crud->read($id);
    $course = $crud2->read(
        id: $progress['course_id'],
        columns: ['quiz']
    );

    // Get questions and answers
    $quiz = json_decode($course['quiz'], true);
    $questions = $quiz['items'];
    $answers = json_decode($progress['quiz_answers'], true);

    if (count($questions) !== count($answers)) {
        throw new Exception("Questions and answers don't have the same length");
    }

    $correct = [];
    $score = $quiz['initialScore'];
    $passingScore = $quiz['passingScore'];

    // Check if answers are correct
    for ($i = 0; $i < count($questions); $i++) {
        $q = $questions[$i];
        $qc = $q['correct'];
        $a = $answers[$i];

        $c = false;
        if (is_array($qc) && is_array($a)) {
            // Check multichoice question
            $c = arrays_are_equal($qc, $a);
        } else {
            // Check other type of question
            $c = $q['correct'] == $a;
        }

        $correct[] = $c;

        if ($c) {
            $score += $q['points'];
        }
    }

    $new_status = $score >= $passingScore ? "passed" : "failed";

    $current_date = date('Y-m-d H:i:s');

    // Save check data into database
    $u_ok = $crud->update($id, [
        'quiz_score' => $score,
        'quiz_correct' => json_encode($correct),
        'status' => $new_status,
        'end_date' => $current_date,
    ]);

    if (!$u_ok) {
        throw new Exception("Failed to save quiz verification result!");
    }

    return_json([
        'progress_id' => $id,
        'correct' => $correct,
        'score' => $score
    ]);
} catch (Exception $e) {
    return_json(['error' => $e->getMessage()], 500);
}
