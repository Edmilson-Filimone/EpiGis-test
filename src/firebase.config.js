// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "epi-gis.firebaseapp.com",
  projectId: "epi-gis",
  storageBucket: "epi-gis.appspot.com",
  messagingSenderId: "519341044935",
  appId: "1:519341044935:web:6a5be3fa9153c4dc127ae2",
  measurementId: "G-8WWETGBX9Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//exporting
const firestore = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth(app)

export {firestore, storage, auth}
