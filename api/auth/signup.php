<?php

require_once("../include.php");
start_auth();

$request = get_json();

if (!check_set_keys(['name', 'email', 'password'], $request)) {
    return_json(["message" => "Invalid form data or method."]);
    exit(400);
}

$pdo = db_connect();


// Check if the user already exists with the provided email
$stmt = $pdo->prepare("SELECT COUNT(*) as count FROM users WHERE email = :email");
$stmt -> bindParam(":email", $request['email']);
$stmt -> execute();
$row = $stmt->fetch(PDO::FETCH_ASSOC);

if ($row['count'] > 0) {
    return_json(["message" => "User with this email already exists."]);
    http_response_code(400);
    exit;
}

$password_hash = password_hash($request['password'], PASSWORD_DEFAULT);
$user_id = new_guid();
$stmt = $pdo->prepare("INSERT INTO users (id, name, email, password) VALUES (:id, :name, :email, :password)");
$stmt->bindParam(":id", $user_id);
$stmt->bindParam(":name", $request['name']);
$stmt->bindParam(":email", $request['email']);
$stmt->bindParam(":password", $password_hash);
$stmt->execute();


$session_data['userId'] = $user_id;
$session_data['name'] = $request['name'];
$session_data['email'] = $request['email'];
$session_data['isAdmin'] = false;

set_session($session_data);

return_json(["message" => "User created successfully!", "authData" => $session_data]);
exit(201);

?>