<?php

require_once("../include.php");
start_auth();

$data = [
    'isAuthed' => is_authed(),
    ...$_SESSION
];

return_json($data);

?>