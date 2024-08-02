#!/bin/bash

# Function to clean the .build/out folder
clean_build_folder() {
    echo "Cleaning .build/out folder..."

    # Remove all contents in the .build/out directory
    rm -rf .build/out/*
}

# Function to build the React project
build_react_project() {
    echo "Building React project..."

    cd frontend
    npm run build

    cd ..
}

# Function to copy the React build to the build output directory
copy_react_build() {
    echo "Copying React build to /.build/out..."

    mkdir -p .build/out
    rsync -avq --exclude-from=frontend/.gitignore frontend/build/ .build/out/
}

# Function to copy the backend API to the build output directory, excluding files from .gitignore
copy_backend_api() {
    echo "Copying backend API to /.build/out/api..."

    mkdir -p .build/out/api
    rsync -avq --exclude-from=backend/.gitignore backend/api/ .build/out/api/
}

# Function to copy the env.php file to the build output directory
copy_env_file() {
    echo "Copying env.php to /.build/out/api/env.php..."

    cp .secrets/env.php .build/out/api/env.php
}

# Function to create the version file
create_version_file() {
    echo "Creating version file at /.build/out/version..."

    mkdir -p .build/out
    BUILD_DATETIME=$(date '+%Y-%m-%d %H:%M:%S')
    COMPUTER_NAME=$(hostname)

    echo "Build Date and Time: $BUILD_DATETIME" > .build/out/version
    echo "Computer Name: $COMPUTER_NAME" >> .build/out/version

    echo "Version file created."
}

# Function to zip the build output directory
zip_build_output() {
    echo "Zipping build output..."

    DATETIME=$(date +%Y_%m_%d_%H_%M_%S)
    ZIP_FILE="${DATETIME}.zip"

    cd .build/out
    zip -qr "../${ZIP_FILE}" ./*
    cd ../..

    echo "Build output zipped to $ZIP_FILE."
}

# Main script execution
main() {
    clean_build_folder
    build_react_project
    copy_react_build
    copy_backend_api
    copy_env_file
    create_version_file
    zip_build_output

    echo "Build process completed successfully."
}

# Execute the main function
main
