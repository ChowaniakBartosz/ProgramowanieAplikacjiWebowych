import INote from './INote'
import IAppStorage from './IAppStorage'
import {Config} from './config'
// import {db} from './FirebaseStorage';
import firebase from 'firebase';
// import firebase from 'firebase/app';
import 'firebase/database';

//
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
const db = firebaseApp.firestore();

async function addNoteToFirebase (note: INote) {
    const noteToObject = Object.assign({}, note);
    await db.collection("notes").add(noteToObject);
}
//

class AppStorage implements IAppStorage {
    constructor() {
        console.log(Config.UseFirebase);
    }

    public render = () : void => {
        const container: HTMLDivElement | null = document.querySelector('#container');
        const notes = this.getData();

        // Renders notes
        if(notes != null) {
            if (container != null) container.innerHTML = '';
            notes.forEach(item => {
                const note: HTMLDivElement = document.createElement('div');
                note.classList.add(item.bgcolor);
                note.classList.add('note');

                const noteTitle: HTMLElement = document.createElement('h2');
                noteTitle.innerHTML = item.title;
                
                const noteContent: HTMLParagraphElement = document.createElement('p');
                noteContent.innerHTML = item.content;
                
                note.appendChild(noteTitle);
                note.appendChild(noteContent);
                container.appendChild(note);
            });
        }
    }

    // Pushes note at the end of the array (data)
    addNote = (note: INote) : void => {
        const data: Array<INote> = this.getData();

        if(Config.UseFirebase === true)
        {
            addNoteToFirebase(note);
        }
        else if(Config.UseFirebase === false)
        {
            data.push(note);
            localStorage.setItem('notes', JSON.stringify(data));
        }

        this.render();
    }

    getData = () : Array<INote> => {
        

        if(Config.UseFirebase === true)
        {
            const res = db.collection("notes").get().then(res => ({size: res.size, docs: res.docs}));
        }
        else if(Config.UseFirebase === false)
        {
            const data = localStorage.getItem('notes');
            return data ? JSON.parse(data) : [];
        }
        
    }
}

export default AppStorage;