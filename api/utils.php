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

function redirect($new_url, $code = 301) {
    header("Location: " . $new_url, true, $code);
}

?>