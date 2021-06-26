import INote from './INote'

interface IAppStorage {
    addNote: (note: INote )=>void;
    getData: () => Array<INote>;
}

export default IAppStorage;