import INote from './INote'

class LocalNote implements INote {
    title: string;
    content: string;
    bgcolor: string;

    constructor(title: string, content: string, bgcolor: string)
    {
        this.title = title;
        this.content = content;
        this.bgcolor = bgcolor;
    }
}

export default LocalNote;