<?php

// Database settings ======================================

// Database type (mysql, pgsql or sqlite)
$ENV['DB_TYPE'] = 'mysql';

// Database host name or IP address (for mysql and pgsql)
$ENV['DB_HOST'] = '';

// Database name (for mysql and pgsql)
$ENV['DB_NAME'] = '';

// Connection user name (for mysql and pgsql)
$ENV['DB_USER'] = '';

// Connection password (for mysql and pgsql)
$ENV['DB_PASS'] = '';

// SQlite database file (for sqlite only)
$ENV['DB_FILE'] = '';

// Database generate script credentials (/api/database_generate.php)
// Used only to limit access to the script
$ENV['DBGEN_USER'] = 'change-me';
$ENV['DBGEN_PASS'] = 'change-me';


// Other settings =========================================

// Enable or disable debug
$ENV['DEBUG'] = false;
