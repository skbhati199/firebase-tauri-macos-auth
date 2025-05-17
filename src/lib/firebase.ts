// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, browserLocalPersistence, setPersistence } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxOiPxyaAw7jHqaWRqdZYamEwI7BHB64U",
  authDomain: "rust-project-932ae.firebaseapp.com",
  databaseURL: "https://rust-project-932ae-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "rust-project-932ae",
  storageBucket: "rust-project-932ae.firebasestorage.app",
  messagingSenderId: "703424336334",
  appId: "1:703424336334:web:2623f4158574873d711b9f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Add scopes for Google authentication
googleProvider.addScope('profile');
googleProvider.addScope('email');

// Set the auth persistence to LOCAL to persist the session
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

export { app, auth, googleProvider };
