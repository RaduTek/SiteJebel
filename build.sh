#!/bin/bash

# Function to clean the build/out folder
clean_build_folder() {
    echo "Cleaning build/out folder..."

    # Remove all contents in the build/out directory
    rm -rf build/out/*

    echo "build/out folder cleaned."
}

# Function to build the React project
build_react_project() {
    echo "Building React project..."

    cd frontend
    npm run build

    cd ..
    echo "React project built."
}

# Function to copy the React build to the build output directory
copy_react_build() {
    echo "Copying React build to /build/out..."

    mkdir -p build/out
    rsync -av --exclude-from=frontend/.gitignore frontend/build/ build/out/

    echo "React build copied."
}

# Function to copy the backend API to the build output directory, excluding files from .gitignore
copy_backend_api() {
    echo "Copying backend API to /build/out/api..."

    mkdir -p build/out/api
    rsync -av --exclude-from=backend/.gitignore backend/api/ build/out/api/

    echo "Backend API copied."
}

# Function to zip the build output directory
zip_build_output() {
    echo "Zipping build output..."

    DATETIME=$(date +%Y_%m_%d_%H_%M_%S)
    ZIP_FILE="build/${DATETIME}.zip"

    cd build/out
    zip -r "../${DATETIME}.zip" ./*
    cd ../..

    echo "Build output zipped to $ZIP_FILE."
}

# Main script execution
main() {
    clean_build_folder
    build_react_project
    copy_react_build
    copy_backend_api
    zip_build_output

    echo "Build process completed successfully."
}

# Execute the main function
main
