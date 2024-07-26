<?php

function include_page($page_name, $root_path) {
    $page_file = $root_path . $page_name;
    if (file_exists($page_file . '.html')) {
        include_once($page_file . '.html');
    } else if (file_exists($page_file . '.php')) {
        include_once($page_file . '.php');
    } else {
        echo 'Page not found.';
    }
}

function new_guid($data = null) {
    $data = $data ?? random_bytes(16);
    assert(strlen($data) == 16);

    $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80);

    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}

function redirect($new_url, $code = 301) {
    header("Location: " . $new_url, true, $code);
}

function get_json() {
    $json_data = file_get_contents('php://input');
    return json_decode($json_data, true);
}

function return_json($data) {
    header('Content-Type: application/json');
    echo(json_encode($data));
}

function check_set_keys($keys, $array) {
    foreach ($keys as $key) {
        if (!isset($array[$key]))
            return false;
    }
    return true;
}

?>