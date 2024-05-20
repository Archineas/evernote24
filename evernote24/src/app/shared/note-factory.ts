import { Note } from "./note";

export class NoteFactory {
    static empty() {
        return new Note(0, '', '', [], []);
    }

    static fromObject(rawNote: any): Note {
        return new Note(
            rawNote.id,
            rawNote.title,
            rawNote.description,
            rawNote.evernotetags,
            rawNote.notelists
        );
    }
    
}
