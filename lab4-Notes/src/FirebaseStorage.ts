import IAppStorage from "./IAppStorage";
import INote from "./INote";
import firebase from "firebase";

class FirebaseStorage implements IAppStorage {
    database: firebase.firestore.Firestore;

    constructor() {
        const firebaseConfig = {
            apiKey: "AIzaSyBrWKT50poOzdJRAe59C6PixLSYsqbQ1js",
            authDomain: "notes-9ae7a.firebaseapp.com",
            projectId: "notes-9ae7a",
            storageBucket: "notes-9ae7a.appspot.com",
            messagingSenderId: "745346893225",
            appId: "1:745346893225:web:f37070180f845670c230b8",
            measurementId: "G-52P9HKGR8L"
        };

        firebase.initializeApp(firebaseConfig);
        this.database = firebase.firestore();
    }

    addNote = async (note: INote): Promise<void> => {
        await this.database.collection('notes').add(note);
    }

    getData = () : Array<INote> => {
        console.log(this.getDataFromFirebase());
        return [];
    }

    getDataFromFirebase = () : Promise<any> => {
        return this.database.collection('notes')
            .get()
            .then(res => console.log(res.docs));
    }
}

export default FirebaseStorage;