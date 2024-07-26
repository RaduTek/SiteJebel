<?php

require_once("../include.php");
start_auth();

$request = get_json();

if (!check_set_keys(['email', 'password'], $request)) {
    return_json(["message" => "Invalid form data or method."]);
    exit(400);
}

$pdo = db_connect();

$stmt = $pdo->prepare("SELECT id, name, email, password, isAdmin FROM users WHERE email = :email");
$stmt -> bindParam(":email", $request['email']);
$stmt -> execute();

$row = $stmt -> fetch(PDO::FETCH_ASSOC);

$result = [];
$code = 200;

if ($row) {
    if (password_verify($request['password'], $row['password'])) {
        // Auth OK
        $session_data['userId'] = $row['id'];
        $session_data['name'] = $row['name'];
        $session_data['email'] = $row['email'];
        $session_data['isAdmin'] = boolval($row['isAdmin']);
        
        set_session($session_data);
        $result['message'] = "Authenticated succesfully!";
        $result['authData'] = $session_data;
    } else {
        $result['message'] = "Wrong email or password!";
        $code = 401;
    }
} else {
    $result['message'] = "Unknown email address!";
    $code = 401;
}

return_json($result);
exit($code);

?>