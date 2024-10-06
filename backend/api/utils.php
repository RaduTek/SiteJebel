<?php

/**
 * Generates a new GUID (Globally Unique Identifier).
 *
 * @param string|null $data Optional binary data to generate the GUID.
 * @return string The generated GUID.
 */
function new_guid($data = null)
{
    $data = $data ?? random_bytes(16);
    assert(strlen($data) == 16);

    $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80);

    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}

/**
 * Redirects the browser to a new URL with the specified status code.
 *
 * @param string $new_url The URL to redirect to.
 * @param int $status_code The HTTP status code for the redirection. Default is 301.
 */
function redirect(string $new_url, int $status_code = 301)
{
    header("Location: " . $new_url, true, $status_code);
}

/**
 * Retrieves JSON data from the HTTP request body and decodes it into an associative array.
 *
 * @return array The decoded JSON data.
 */
function get_json(): array
{
    $json_data = file_get_contents('php://input');
    return json_decode($json_data, associative: true);
}

/**
 * Sends a JSON response with the specified data and status code.
 *
 * @param mixed $data The data to be encoded as JSON and returned.
 * @param int $status_code The HTTP status code for the response. Default is 200.
 * @param bool $exit True if function shall end the script or not. Default = true.
 */
function return_json(mixed $data, int $status_code = 200, bool $exit = true)
{
    header('Content-Type: application/json; charset=utf-8');
    http_response_code($status_code);
    echo (json_encode($data));
    if ($exit)
        exit();
}

/**
 * Checks if an associative array contains specified keys.
 *
 * @param array $keys The keys to check for in the array.
 * @param array $array The array to check.
 * @return bool True if all specified keys are present, false otherwise.
 */
function check_set_keys(array $keys, array $array)
{
    foreach ($keys as $key) {
        if (!isset($array[$key]))
            return false;
    }
    return true;
}

/**
 * Removes values from an array with specified keys.
 *
 * @param array $array Source associative array.
 * @param array $keys Array of keys to remove from the source array.
 * @return array New array with specified key/value pairs removed.
 */
function strip_keys(array $array, array $keys): array
{
    $newarray = $array;
    foreach ($keys as $key) {
        if (isset($newarray[$key]))
            unset($newarray[$key]);
    }

    return $newarray;
}

/**
 * Returns a new array with only the key/value pairs matching the keys given as a parameter.
 *
 * @param array $array Source associative array.
 * @param array $keys Array of keys to keep in the source array.
 * @return array New array with only the specified key/value pairs.
 */
function keep_keys(array $array, array $keys): array
{
    $newarray = [];
    foreach ($keys as $key) {
        if (isset($array[$key])) {
            $newarray[$key] = $array[$key];
        }
    }

    return $newarray;
}


function exit_if_wrong_request_type(string $request_type = "POST")
{
    if ($_SERVER['REQUEST_METHOD'] !== 'POST')
        return_json([
            'status' => 'error',
            'message' => 'Wrong request type!',
        ], 400);
}
