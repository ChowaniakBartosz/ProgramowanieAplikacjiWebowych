import INote from './INote'
import IAppStorage from './IAppStorage'

class AppStorage implements IAppStorage {
    constructor() { }

    render = () : void => {
        const container: HTMLDivElement = document.getElementById('container') as HTMLDivElement;

        const data = this.getData();

        // Renders notes
        if (container != null) {
            container.innerHTML = null;

            data.forEach(item => {
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
        data.push(note);
        localStorage.setItem('notes', JSON.stringify(data));
        this.render();
    }

    getData = () : Array<INote> => {
        const data = localStorage.getItem('notes');
        return data ? JSON.parse(data) : null;
    }
}

export default AppStorage;