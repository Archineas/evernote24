import { Component, Input } from '@angular/core';
import { Note } from '../shared/note';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NotesService } from '../shared/notes.service';
import { NoteFactory } from '../shared/note-factory';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'div.app-note-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './note-detail.component.html',
  styles: ``
})
export class NoteDetailComponent {
  @Input() note : Note = NoteFactory.empty();

  constructor(
    private app: NotesService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
  }

  removeNote() {
    if (confirm('Willst du diese Notiz wirklich löschen?!')) {
       this.app.remove(this.note.id + '')
       .subscribe((res: any) => this.router.navigate(['../'], { relativeTo: this.route }));
       this.toastr.success('Notiz wurde gelöscht!');
    }
  }
}
