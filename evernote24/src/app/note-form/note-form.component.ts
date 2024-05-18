import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NoteFactory } from '../shared/note-factory';
import { NotesService } from '../shared/notes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from '../shared/note';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './note-form.component.html',
  styles: ``
})
export class NoteFormComponent {
  noteForm: FormGroup;
  note = NoteFactory.empty();
  isUpdatingNote = false;

  constructor(
    private fb: FormBuilder,
    private app: NotesService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { 
    this.noteForm = this.fb.group({
      notelistId: [''],
      id: [''],
      title: [''],
      description: ['']
    });
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    if (params['id']) {
      this.isUpdatingNote = true;
      this.app.getSingle(params['id']).subscribe(note => {
        this.note = note;
        this.initNote();
      });
    }
  }

  //TODO: notelist id ausm formular irgendwie in die Note reinstopfen
  initNote() {
    this.noteForm = this.fb.group({
      notelistId: this.note.notelists[0].id,
      id: this.note.id,
      title: this.note.title,
      description: this.note.description
    });
  }

  submitForm() {
    const note: Note = NoteFactory.fromObject(this.noteForm.value);
    if (this.isUpdatingNote) {
      this.app.update(note).subscribe(() => {
        this.router.navigate(['/notelist']);
        this.toastr.success('Note wurde bearbeitet!');
        console.log(note);
      });
    } else {
      this.app.create(note).subscribe(() => {
        this.router.navigate(['/notelist']);
        this.toastr.success('Note wurde erstellt!');
      });
    }
  }
}
