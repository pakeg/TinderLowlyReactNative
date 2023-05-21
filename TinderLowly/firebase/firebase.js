import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPZVBQKzzSCjAg8oUPw2Jpuo8_ansZcZU",
  authDomain: "tinderlowly.firebaseapp.com",
  projectId: "tinderlowly",
  storageBucket: "tinderlowly.appspot.com",
  messagingSenderId: "708272944114",
  appId: "1:708272944114:web:b9bf91165b0a1228e3716b",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
