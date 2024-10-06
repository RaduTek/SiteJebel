<?php

require_once("../../include.php");
start_auth();
exit_if_not_admin();


try {
    // Default values for limit and page
    $limit = 25;
    $page = 1;

    if (isset($_GET['limit'])) {
        $limit = intval($_GET['limit']);
        if ($limit <= 0) {
            throw new InvalidArgumentException("Limit must be a positive integer.");
        }
    }

    if (isset($_GET['page'])) {
        $page = intval($_GET['page']);
        if ($page <= 0) {
            throw new InvalidArgumentException("Page must be a positive integer.");
        }
    }

    // Calculate offset
    $offset = ($page - 1) * $limit;

    $pdo = db_connect();
    $crud = new CRUD($pdo, Blog_Posts);

    $response = [];

    // Get total count and calculate number of pages
    $count = $crud->count();
    $response['count_total'] = $count;
    $response['pages'] = ceil($count / $limit);

    // Get current page of posts
    $posts = $crud->list(
        columns: ['id', 'title', 'date', 'visible'],
        order_by: 'date',
        order_direction: 'DESC',
        limit: $limit,
        offset: $offset
    );

    // Add posts and count on page to response
    $response['posts'] = $posts;
    $response['count_page'] = count($posts);

    // Return response
    return_json($response);
} catch (InvalidArgumentException $e) {
    // Return error response for invalid arguments
    return_json(["status" => "error", "error" => $e->getMessage()], 400);
} catch (Exception $e) {
    // Return general error response
    return_json(["status" => "error", "error" => $e->getMessage()], 500);
}
