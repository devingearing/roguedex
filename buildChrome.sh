#!/bin/bash

# Set the project directory
PROJECT_DIR="$(pwd)"

# Move to the project directory
cd "$PROJECT_DIR" || exit

# Remove the 'dist' folder if it exists
rm -rf "$PROJECT_DIR/dist"

# Create the 'dist' folder
mkdir "$PROJECT_DIR/dist"

# Copy manifest.json to dist and rename it to manifest_chrome.json
cp manifest.json "$PROJECT_DIR/dist/manifest_chrome.json"

# Run Webpack to build the project
npx webpack --config webpack.config.js

# Check if Webpack build succeeded
if [ $? -ne 0 ]; then
    echo "Webpack build failed. Exiting."
    exit 1
fi

# Copy necessary files to the 'dist' folder
# Copy all .js, .css, .html files and the manifest.json
find . -maxdepth 1 -name "*.js" -exec cp {} "$PROJECT_DIR/dist/" \;
find . -maxdepth 1 -name "*.css" -exec cp {} "$PROJECT_DIR/dist/" \;
find . -maxdepth 1 -name "*.html" -exec cp {} "$PROJECT_DIR/dist/" \;
cp -r libs "$PROJECT_DIR/dist/libs"
cp styles.css "$PROJECT_DIR/dist/"

# Rename the manifest file in dist
mv "$PROJECT_DIR/dist/manifest_chrome.json" "$PROJECT_DIR/dist/manifest.json"

# Create the ZIP file with the folder structure preserved
cd "$PROJECT_DIR/dist"
zip -r "roguedex.zip" ./*

echo "Build Chrome extension completed successfully!"
echo "The ZIP file is located at: $PROJECT_DIR/dist/roguedex.zip"
