import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDzrVZRhncMBYml9lXj-oVu6FHOn7-_Hk",
  authDomain: "atividadesomativa2-69b54.firebaseapp.com",
  projectId: "atividadesomativa2-69b54",
  storageBucket: "atividadesomativa2-69b54.firebasestorage.app",
  messagingSenderId: "928708717205",
  appId: "1:928708717205:web:55867f5ef11e4ba03fc99c"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };