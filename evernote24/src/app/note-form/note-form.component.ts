import { Component, OnInit } from '@angular/core';
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
  styles: ``,
})
export class NoteFormComponent implements OnInit {
  noteForm: FormGroup;
  note = NoteFactory.empty();
  isUpdatingNote = false;
  notelistId: string | null = null;

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
      description: [''],
      notelists: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.notelistId = params['notelistId'];
    });
    if (this.notelistId !== null) {
      this.noteForm.patchValue({ notelistId: this.notelistId });
      this.initNote();
    }

    const params = this.route.snapshot.params;
    if (params['id']) {
      this.noteForm.patchValue({ notelistId: params['id'] });
      this.isUpdatingNote = true;
      this.app.getSingle(params['id']).subscribe((note) => {
        this.note = note;
        this.initNote();
      });
    }
  }

  initNote() {
    const notelists = { id: Number(this.notelistId) };
    this.noteForm = this.fb.group({
      notelistId: this.notelistId,
      id: this.note.id,
      title: this.note.title,
      description: this.note.description,
      notelists: notelists,
    });
  }

  submitForm() {
    const note: Note = NoteFactory.fromObject({
      ...this.noteForm.getRawValue(),
      notelists: [this.noteForm.get('notelists')?.value],
    });
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
