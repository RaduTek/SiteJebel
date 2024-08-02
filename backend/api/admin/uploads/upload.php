<?php

require_once("../../include.php");
start_auth();

exit_if_not_admin();
exit_if_wrong_request_type();

$request = $_POST;

if (isset($_FILES['file'])) {
    $file = $_FILES['file'];
    $uploadDirectory = '../../../uploads/';
    $frontendDir = "/uploads/";

    if (!is_dir($uploadDirectory)) {
        mkdir($uploadDirectory, 0777, true);
    }

    $fileExt = pathinfo($file['name'], PATHINFO_EXTENSION);
    $fileName = new_guid() . '.' . $fileExt;
    $filePath = $uploadDirectory . $fileName;
    $frontendPath = $frontendDir . $fileName;

    if (move_uploaded_file($file['tmp_name'], $filePath)) {
        return_json([
            'status' => 'ok',
            'message' => 'File uploaded successfully',
            'url' => $filePath,
        ]);
    } else {
        return_json([
            'status' => 'error',
            'message' => 'File not created',
        ], 500);
    }
} else {
    return_json([
        'status' => 'error',
        'message' => 'No file uploaded',
    ], 400);
}
