<?php

function start_auth() {
    session_start();
}

function set_session($data) {
    foreach (array_keys($data) as $key) {
        $_SESSION[$key] = $data[$key];
    }
}

function is_authed() {
    return isset($_SESSION['userId']);
}

function exit_if_unauthed() {
    if (!is_authed()) {
        return_json(["message" => "Unauthorized to perform this action."]);
        exit(401);
    }
}


?>