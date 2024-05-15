import { Component, OnInit } from '@angular/core';
import { Notelist } from '../shared/notelist';
import { NoteDetailComponent } from '../note-detail/note-detail.component';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';
import { ActivatedRoute } from '@angular/router';
import { EvernotelistsService } from '../shared/evernotelists.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-evernotelist-detail',
  standalone: true,
  imports: [NoteDetailComponent, TodoDetailComponent, RouterLink],
  templateUrl: './evernotelist-detail.component.html',
  styles: ``
})
export class EvernotelistDetailComponent implements OnInit {

  notelist: Notelist | undefined;

  constructor(
    private app: EvernotelistsService,
    private route: ActivatedRoute
  ){}

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.notelist = this.app.getSingle(params['id']);
    console.log(this.notelist); //ist undefined
  }

}
