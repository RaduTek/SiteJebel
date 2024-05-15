<?php

function start_auth() {
    session_start();
}

function is_authed() {
    return isset($_SESSION['user_id']);
}

function exit_if_unauthed() {
    if (!is_authed()) {
        return_json(["message" => "Unauthorized to perform this action."]);
        exit(401);
    }
}


?>