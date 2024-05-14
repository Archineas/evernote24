import { Component, Input } from '@angular/core';
import { Note } from '../shared/note';

@Component({
  selector: 'div.app-note-detail',
  standalone: true,
  imports: [],
  templateUrl: './note-detail.component.html',
  styles: ``
})
export class NoteDetailComponent {
@Input() note: Note | undefined;
}
