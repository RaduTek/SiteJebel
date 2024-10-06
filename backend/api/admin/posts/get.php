<?php

require_once("../../include.php");
start_auth();
exit_if_not_admin();


if (!isset($_GET['id'])) {
    return_json(["status" => "not_found"], 404);
}

$id = $_GET['id'];

try {
    $pdo = db_connect();

    $crud = new CRUD($pdo, Blog_Posts);

    $event = $crud->read($id);

    if ($event == null) {
        return_json(["status" => "not_found"], 404);
    }

    return_json($event);
} catch (Exception $e) {
    // Return error response
    return_json(["status" => "error", "error" => $e->getMessage()], 500);
}
