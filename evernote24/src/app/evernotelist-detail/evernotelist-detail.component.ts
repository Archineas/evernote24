import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Notelist } from '../shared/notelist';
import { NoteDetailComponent } from '../note-detail/note-detail.component';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';

@Component({
  selector: 'app-evernotelist-detail',
  standalone: true,
  imports: [NoteDetailComponent, TodoDetailComponent],
  templateUrl: './evernotelist-detail.component.html',
  styles: ``
})
export class EvernotelistDetailComponent {
  @Input() notelist: Notelist | undefined;
  @Output() showListEvent = new EventEmitter<any>();

  showEvernoteList() {
    this.showListEvent.emit();
  }
}
