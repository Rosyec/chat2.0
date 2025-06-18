// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDzwpNbp1R-iAQUQ1jBJhP1uc6JaYupzEM",
    authDomain: "proyectochat-e1ac6.firebaseapp.com",
    databaseURL: "https://proyectochat-e1ac6-default-rtdb.firebaseio.com",
    projectId: "proyectochat-e1ac6",
    storageBucket: "proyectochat-e1ac6.firebasestorage.app",
    messagingSenderId: "153045970609",
    appId: "1:153045970609:web:08277749317d9f3679bc90",
    measurementId: "G-6L2CVJT5GZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);