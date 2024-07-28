<?php

require_once("../include.php");

try {
    // Start session
    start_auth();

    // Get request data
    $request = get_json();

    // Check if request is good
    if (!check_set_keys(['email', 'password'], $request)) {
        return_json(["status" => "Invalid form data or method."], 400);
    }

    // Connect to database
    $pdo = db_connect();

    // Create CRUD object
    $crud = new CRUD($pdo, Table_Users);

    // Read user with specified email
    $user = $crud->read($request['email'], 'email');

    // Check if user exists
    if ($user !== null) {
        if (password_verify($request['password'], $user['password'])) {
            // Password good
            // Set user into session
            set_user($user);

            // Return OK and session data
            return_json([
                "status" => "auth_ok",
                "authData" => get_auth_data()
            ]);
        } else {
            // Email and password pair bad
            return_json(["status" => "wrong_email_or_pass"], 401);
        }
    } else {
        // Unknown email - user does not exist
        return_json(["status" => "unknown_email"], 401);
    }
} catch (Exception $e) {
    // Handle any exceptions
    return_json(["status" => "error", "message" => $e->getMessage()], 500);
}
