import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBADHMg9kNfXwkpu7U1ayzTo7-GiCdpu7M",
  authDomain: "mystock111-ae384.firebaseapp.com",
  projectId: "mystock111-ae384",
  storageBucket: "mystock111-ae384.firebasestorage.app",
  messagingSenderId: "576728210701",
  appId: "1:576728210701:web:54bd62fd7772554c1fe444",
  measurementId: "G-LW4854S66R"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
