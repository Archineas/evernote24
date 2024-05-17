import { Note } from "./note";

export class NoteFactory {
    static empty() {
        return new Note(0, '', '', []);
    }
}
