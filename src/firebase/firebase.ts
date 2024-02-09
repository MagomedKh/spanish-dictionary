import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyCuA8uDhRUdRG_bFHNf0Hw5kHSFqFUiZFY",
   authDomain: "spanish-dictionary-58853.firebaseapp.com",
   projectId: "spanish-dictionary-58853",
   storageBucket: "spanish-dictionary-58853.appspot.com",
   messagingSenderId: "583961992644",
   appId: "1:583961992644:web:2c1c4ff362ab4b091d9891",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const dictionariesCollection = collection(db, "dictionaries");
