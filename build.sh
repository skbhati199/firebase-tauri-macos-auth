#!/bin/bash
echo "Building macOS Firebase Auth app..."

# Install dependencies
echo "Installing dependencies..."
bun install

# Build the Vite project
echo "Building frontend..."
bun run build

# Build the Tauri application
echo "Building Tauri application..."
bun run tauri build

echo "Build complete! Find your application in src-tauri/target/release/bundle/"
