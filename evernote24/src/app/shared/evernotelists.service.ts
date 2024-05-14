import { Injectable } from '@angular/core';
import { Note, Notelist, Todo, User, Image } from '../shared/notelist';

@Injectable({
  providedIn: 'root'
})
export class EvernotelistsService {
  notelists: Notelist[] = [];
  constructor() {
    this.notelists = [
      new Notelist(
        1, 
        'Notelist 1', 
        'Description 1', 
        [new Image(1, 'https://picsum.photos/500', 'Image 1')],
        [new User(1, 'User 1', 'password', 'user1@kwm.at')], 
        [new Note(1, 'Note 1', 'Description 1'), new Note(2, 'Note 2', 'Description 2')],
        [new Todo(1, 'Todo 1', 'Description 1', new Date(2020, 1, 1))]),
      new Notelist(
        2,
        'Notelist 2',
        'Description 2',
        [new Image(2, 'https://picsum.photos/500', 'Image 2')],
        [new User(2, 'User 2', 'password', 'user2@kwm.at')],
        [new Note(2, 'Note 2', 'Description 2')],
        [new Todo(2, 'Todo 2', 'Description 2', new Date(2020, 1, 1))],
      )
  ];
  }

  getAll(){
    return this.notelists;
  }
}
