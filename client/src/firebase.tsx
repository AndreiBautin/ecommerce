// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVA74vzdWYfeSB1RWdRPpCWJOszTKHeDY",
  authDomain: "office-supplies-shop-demo.firebaseapp.com",
  projectId: "office-supplies-shop-demo",
  storageBucket: "office-supplies-shop-demo.appspot.com",
  messagingSenderId: "972839211807",
  appId: "1:972839211807:web:879530de5249454d5d562a",
  measurementId: "G-4HDF097ND5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
