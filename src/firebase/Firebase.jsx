

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA-_5jU1Ki_SWDt0s99dTih2TzqFWQCYo4",
    authDomain: "mini-hackathon-f4c17.firebaseapp.com",
    projectId: "mini-hackathon-f4c17",
    storageBucket: "mini-hackathon-f4c17.appspot.com",
    messagingSenderId: "209652160745",
    appId: "1:209652160745:web:74142648e5af0e7c2bf878"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export { auth, db, storage }