<?php

require_once("../../include.php");
start_auth();
exit_if_not_admin();


if (!isset($_GET['id'])) {
    return_json(["status" => "not_found"], 404);
}

$id = $_GET['id'];

// Get request data
$request = get_json();

try {
    // Connect to database
    $pdo = db_connect();

    // Create CRUD object
    $crud = new CRUD($pdo, Events);

    // Check if request is valid
    if (!check_set_keys($crud->get_columns(true), $request)) {
        return_json(["error" => "Invalid form data or method."], 400);
    }

    $event = $request;

    // Create the event
    if ($crud->update($id, $event)) {
        // Return success response
        return_json(["status" => "created"], 201);
    } else {
        throw new Exception("Failed to create event.");
    }
} catch (Exception $e) {
    // Return error response
    return_json(["status" => "error", "error" => $e->getMessage()], 500);
}
