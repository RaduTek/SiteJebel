<?php

/**
 * Sets the user data in the session.
 *
 * @param array $user An associative array containing user data.
 */
function set_user(array $user)
{
    $_SESSION['user'] = $user;
}

/**
 * Unsets the user data from the session.
 */
function unset_user()
{
    unset($_SESSION['user']);
}

/**
 * Retrieves the user data from the session if the user is authenticated.
 *
 * @return array|false An associative array containing user data, or false if the user is not authenticated.
 */
function get_user(): array|false
{
    if (is_authed())
        return $_SESSION['user'];
    return false;
}

/**
 * Starts the session for authentication purposes.
 */
function start_auth()
{
    session_start();
}

/**
 * Ends the session by unsetting user data and destroying the session.
 */
function end_auth()
{
    unset_user();
    session_destroy();
}

/**
 * Checks if the user is authenticated.
 *
 * @return bool True if the user is authenticated, false otherwise.
 */
function is_authed(): bool
{
    return isset($_SESSION['user']);
}

/**
 * Checks if the authenticated user has administrative privileges.
 *
 * @return bool True if the authenticated user is an admin, false otherwise.
 */
function is_admin(): bool
{
    if (is_authed())
        return get_user()['isAdmin'];
    return false;
}

/**
 * Collects authentication data, excluding the password, for the authenticated user.
 *
 * @return array An associative array containing authentication data and user information.
 */
function get_auth_data(): array
{
    $auth_data = [];
    $auth_data['isAuthed'] = is_authed();

    if (is_authed()) {
        $user_data = strip_keys(get_user(), User_sensitive_keys);
        $auth_data += $user_data;
    }

    return $auth_data;
}

/**
 * Sends a JSON response and exits if the user is not authenticated.
 */
function exit_if_unauthed()
{
    if (!is_authed()) {
        return_json(["error" => "Unauthorized to perform this action."]);
        exit(401);
    }
}

/**
 * Sends a JSON response and exits if the authenticated user is not an admin.
 */
function exit_if_not_admin()
{
    if (!is_admin()) {
        return_json(["error" => "Unauthorized to perform this action."]);
        exit(401);
    }
}
