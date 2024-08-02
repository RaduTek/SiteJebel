#!/bin/bash

# Run PHP backend
echo "Starting PHP built-in server..."
cd backend
php -S localhost:8000 &

# Save the PID of the PHP server process
PHP_PID=$!

# Run React frontend
echo "Starting React development server..."
cd ../frontend
npm run start &

# Save the PID of the React server process
REACT_PID=$!

# Function to handle script termination
function terminate() {
    echo "Terminating servers..."

    # Terminate the PHP server
    kill $PHP_PID
    echo "PHP server stopped."

    # Terminate the React server
    kill $REACT_PID
    echo "React server stopped."
}

# Trap the SIGINT and SIGTERM signals to terminate both servers when the script is stopped
trap terminate SIGINT SIGTERM

# Wait for both background processes to finish
wait $PHP_PID
wait $REACT_PID
