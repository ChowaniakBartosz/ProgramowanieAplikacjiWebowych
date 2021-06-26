import LocalNote from './LocalNote'
import AppStorage from './AppStorage';
import FirebaseStorage from './FirebaseStorage';

class Application {
    noteBgColor: string = 'orange';
    notes: AppStorage = new AppStorage();
    firebaseStorage : FirebaseStorage = new FirebaseStorage();

    constructor() {
        this.notes.render();

        // Get add note button and add event listener
        const addNoteButton: HTMLButtonElement | null = document.querySelector('button[role="button"]');
        addNoteButton != null ? addNoteButton.addEventListener('click', this.handleAddNoteButton) : false;

        // Get all color picker buttons and add event listners to them
        const pickColorButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('button[class^="colorPicker"]');
        pickColorButtons.forEach(button => {
            button.addEventListener('click', () => {
                const bgcolor: string = button.dataset.color;
                if (bgcolor != undefined) {
                    this.noteBgColor = bgcolor;
                }
            });
        });

        // Get data from firebase
        this.firebaseStorage.getData();
    }

    public handleAddNoteButton = () : void => {
        let noteTitle: HTMLInputElement | null = document.querySelector('input[name="caption"]');
        let noteContent: HTMLTextAreaElement | null = document.querySelector('textarea[name="content"]');

        if (noteTitle.value.length > 0 && noteContent.value.length > 0) {
                const newNote: LocalNote = new LocalNote(noteTitle.value, noteContent.value, this.noteBgColor);
                this.notes.addNote(newNote);

                noteTitle.value = null;
                noteContent.value = null;
                this.noteBgColor = 'orange';
        }
        else {
            alert('You left empty fields!');
            return;
        }
    }
};

export default Application;