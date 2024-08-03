<?php

require_once("../../include.php");
start_auth();

exit_if_not_admin();
exit_if_wrong_request_type();

$request = $_POST;

if (isset($_FILES['file'])) {
    $file = $_FILES['file'];
    $uploadDirectory = '../../../uploads/images/';
    $frontendDir = "/uploads/images/";

    if (!is_dir($uploadDirectory)) {
        mkdir($uploadDirectory, 0777, true);
    }

    $fileExt = pathinfo($file['name'], PATHINFO_EXTENSION);
    $fileName = new_guid() . '.webp';
    $filePath = $uploadDirectory . $fileName;
    $frontendPath = $frontendDir . $fileName;

    // Create an image resource from the uploaded file
    switch (strtolower($fileExt)) {
        case 'jpg':
        case 'jpeg':
            $sourceImage = imagecreatefromjpeg($file['tmp_name']);
            break;
        case 'png':
            $sourceImage = imagecreatefrompng($file['tmp_name']);
            break;
        case 'gif':
            $sourceImage = imagecreatefromgif($file['tmp_name']);
            break;
        default:
            return_json([
                'status' => 'error',
                'message' => 'Unsupported file type',
            ], 400);
            exit;
    }

    if (!$sourceImage) {
        return_json([
            'status' => 'error',
            'message' => 'Failed to create image resource',
        ], 500);
        exit;
    }

    // Get the original dimensions
    $originalWidth = imagesx($sourceImage);
    $originalHeight = imagesy($sourceImage);

    // Calculate new dimensions
    $maxWidth = 1024;
    $maxHeight = 768;
    $ratio = min($maxWidth / $originalWidth, $maxHeight / $originalHeight);
    $newWidth = round($originalWidth * $ratio);
    $newHeight = round($originalHeight * $ratio);

    // Create a new true color image with the calculated dimensions
    $resizedImage = imagecreatetruecolor($newWidth, $newHeight);

    // Copy and resize the original image into the new image
    imagecopyresampled($resizedImage, $sourceImage, 0, 0, 0, 0, $newWidth, $newHeight, $originalWidth, $originalHeight);

    // Save the image as WebP format
    if (imagewebp($resizedImage, $filePath, 80)) {
        imagedestroy($sourceImage);
        imagedestroy($resizedImage);

        // Ensure the file is no larger than 1MB
        if (filesize($filePath) > 1024 * 1024) {
            // Recompress to a lower quality
            imagewebp($resizedImage, $filePath, 70);
        }

        return_json([
            'status' => 'ok',
            'message' => 'File uploaded successfully',
            'url' => $frontendPath,
        ]);
    } else {
        imagedestroy($sourceImage);
        imagedestroy($resizedImage);

        return_json([
            'status' => 'error',
            'message' => 'Failed to save image',
        ], 500);
    }
} else {
    return_json([
        'status' => 'error',
        'message' => 'No file uploaded',
    ], 400);
}
