# 🔐 Firebase-Tauri macOS Login App

This desktop application built with Tauri, React, and Firebase implements a macOS-style login screen with Firebase authentication.

## ✨ Features

- 🖥️ macOS-style login screen UI
- 🔑 Firebase authentication (Email/Password)
- 🌐 Google Sign-In with system browser integration
- 💾 Device-specific information using Tauri's Rust backend
- 🔄 Persistent login across app restarts
- 🖥️ Cross-platform desktop application (macOS, Windows, Linux)

## 🛠️ Technologies Used

- **Tauri**: Cross-platform desktop application framework
- **Rust**: Backend language for Tauri
- **React**: Frontend library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Frontend build tool
- **Firebase**: Authentication and backend services
- **Bun**: JavaScript runtime and package manager

## 🚀 Getting Started

### Prerequisites

- Node.js and Bun
- Rust and Cargo
- Tauri CLI

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   bun install
   ```

### Development

Run the development server:
```
bun run tauri dev
```

### Build

Build the application:
```
bun run tauri build
```

This will create binaries for your platform in the `src-tauri/target/release/bundle` directory.

## 📝 Firebase Configuration

This application uses Firebase for authentication. Update the Firebase configuration in `src/lib/firebase.ts` with your own Firebase project details.

## 📱 Screenshots

[Add screenshots here]

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
