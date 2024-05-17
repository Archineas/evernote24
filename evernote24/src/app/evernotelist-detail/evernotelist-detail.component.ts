import { Component, OnInit } from '@angular/core';
import { Notelist } from '../shared/notelist';
import { NoteDetailComponent } from '../note-detail/note-detail.component';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';
import { ActivatedRoute, RouterLink, Router} from '@angular/router';
import { EvernotelistsService } from '../shared/evernotelists.service';
import { NotelistFactory } from '../shared/notelist-factory';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-evernotelist-detail',
  standalone: true,
  imports: [NoteDetailComponent, TodoDetailComponent, RouterLink],
  templateUrl: './evernotelist-detail.component.html',
  styles: ``
})
export class EvernotelistDetailComponent implements OnInit {

  notelist: Notelist = NotelistFactory.empty();

  constructor(
    private app: EvernotelistsService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ){}

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.app.getSingle(params['id']).subscribe((n:Notelist) => {
      this.notelist = n;
      console.log(this.notelist);
    });

  }

  removeNotelist(){
    if(confirm('Willst du diese Notelist wirklich löschen?!')){
      this.app.remove(this.notelist.id+'')
      .subscribe((res:any) => this.router.navigate(['../'], {relativeTo: this.route}));
      this.toastr.success('Notelist wurde gelöscht!');
    }
  }

}
