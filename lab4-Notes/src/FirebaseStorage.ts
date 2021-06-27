import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBrWKT50poOzdJRAe59C6PixLSYsqbQ1js",
    authDomain: "notes-9ae7a.firebaseapp.com",
    projectId: "notes-9ae7a",
    storageBucket: "notes-9ae7a.appspot.com",
    messagingSenderId: "745346893225",
    appId: "1:745346893225:web:f37070180f845670c230b8",
    measurementId: "G-52P9HKGR8L"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();

// const databaseRef = firebaseApp.database().ref();

// export const notesRef = databaseRef.child("notes")
export default firebase;