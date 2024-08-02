<?php

require_once("../include.php");

// Get request data
$request = get_json();

// Check if request is valid
if (!check_set_keys(['name', 'email', 'phone', 'password'], $request)) {
    return_json(["error" => "Invalid form data or method."], 400);
    exit;
}

try {
    // Connect to database
    $pdo = db_connect();

    // Create CRUD object
    $crud = new CRUD($pdo, Users);

    // Check if the user already exists with the provided email
    $existing_user = $crud->read($request['email'], 'email');
    if ($existing_user !== null) {
        return_json(["error" => "Un utilizator este deja înregistrat cu această adresă de mail."], 409);
        exit;
    }

    // Hash the password
    $password_hash = password_hash($request['password'], PASSWORD_DEFAULT);
    $user_id = new_guid();

    // Prepare user data
    $user_data = [
        'id' => $user_id,
        'name' => $request['name'],
        'email' => $request['email'],
        'phone' => $request['phone'],
        'password' => $password_hash,
        'isAdmin' => false
    ];

    // Create the user
    if ($crud->create($user_data)) {
        // Start session and set user
        start_auth();
        set_user($user_data);

        // Return success response
        return_json(["message" => "User created successfully!", "authData" => get_auth_data()], 201);
    } else {
        throw new Exception("Failed to create user.");
    }
} catch (Exception $e) {
    // Return error response
    return_json(["error" => $e->getMessage()], 500);
}
