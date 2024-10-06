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

    $status = $crud->delete($id);

    if ($status) {
        return_json(["status" => "success"]);
    } else {
        return_json(["status" => "error", "error" => "Failed to delete event with id: {$id}."], 404);
    }
} catch (Exception $e) {
    // Return error response
    return_json(["status" => "error", "error" => $e->getMessage()], 500);
}
