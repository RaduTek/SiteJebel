<?php

require_once("../include.php");
start_auth();

return_json(get_auth_data());
