import { Note, Notelist, Todo, User, Image } from '../shared/notelist';

export class NotelistFactory {
  static empty(): Notelist {
    return new Notelist(0, '', '', [new Image(0, '', '')], [], [], []);
  }

  static fromObject(rawNotelist: any): Notelist {
    return new Notelist(
      rawNotelist.id,
      rawNotelist.title,
      rawNotelist.description,
      rawNotelist.images,
      rawNotelist.users,
      rawNotelist.notes,
      rawNotelist.todos
    );
  }
}
