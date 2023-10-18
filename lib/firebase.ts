// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDZYueGF_BKgK308ScIcIAOhky2Gf08bng",
    authDomain: "sklep-domow-dla-zwierzat.firebaseapp.com",
    projectId: "sklep-domow-dla-zwierzat",
    storageBucket: "sklep-domow-dla-zwierzat.appspot.com",
    messagingSenderId: "453479659456",
    appId: "1:453479659456:web:1dadbbe3861f4212183a25",
    measurementId: "G-TQLSNLBJE6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getFirestore(app)

