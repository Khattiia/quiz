// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfoqCfk9gvGU7K306FWe-9VEm10NdQYbM",
  authDomain: "quiz-46ee0.firebaseapp.com",
  projectId: "quiz-46ee0",
  storageBucket: "quiz-46ee0.appspot.com",
  messagingSenderId: "644041442822",
  appId: "1:644041442822:web:fb006b582433d836fb6587",
  measurementId: "G-Q8XT3NEY8N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
