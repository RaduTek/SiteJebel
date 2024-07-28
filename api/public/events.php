<?php

require_once('../include.php');
$pdo = db_connect();

try {
    $crud = new CRUD($pdo, Table_Events);

    $filters = ['visible' => 1];
    $order_by = 'date';
    $order_direction = isset($_GET['past']) ? 'DESC' : 'ASC';
    $filters['date'] = isset($_GET['past']) ? ['<', 'NOW()'] : ['>=', 'NOW()'];

    $events = $crud->list(
        filters: $filters,
        order_by: $order_by,
        order_direction: $order_direction
    );

    return_json($events);
} catch (Exception $e) {
    return_json(['error' => $e->getMessage()], 500);
}
