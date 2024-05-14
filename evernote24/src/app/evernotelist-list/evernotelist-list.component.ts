import { Component, EventEmitter, Output } from '@angular/core';
import { Note, Notelist, Todo, User, Image } from '../shared/notelist';
import { EvernotelistComponent } from '../evernotelist/evernotelist.component';
import { EvernotelistsService } from '../shared/evernotelists.service';

@Component({
  selector: 'app-evernotelist-list',
  standalone: true,
  imports: [EvernotelistComponent],
  templateUrl: './evernotelist-list.component.html',
  styles: ``
})
export class EvernotelistListComponent {
notelists: Notelist[] = [];
@Output() showDetailsEvent = new EventEmitter<Notelist>();

constructor(private app: EvernotelistsService) {}

showDetail(notelist: Notelist) {
  this.showDetailsEvent.emit(notelist);
}

ngOnInit() {
  this.notelists = this.app.getAll();  
}
}
