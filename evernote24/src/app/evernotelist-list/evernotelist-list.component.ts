import { Component, EventEmitter, Output } from '@angular/core';
import { Note, Notelist, Todo, User, Image } from '../shared/notelist';
import { EvernotelistComponent } from '../evernotelist/evernotelist.component';
import { EvernotelistsService } from '../shared/evernotelists.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-evernotelist-list',
  standalone: true,
  imports: [EvernotelistComponent, RouterLink],
  templateUrl: './evernotelist-list.component.html',
  styles: ``
})
export class EvernotelistListComponent {
notelists: Notelist[] = [];

constructor(private app: EvernotelistsService) {}

ngOnInit() { 
  this.app.getAll().subscribe(res => this.notelists = res);
}
}
