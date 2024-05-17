import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Notelist } from '../shared/notelist';
import { NotelistFactory } from '../shared/notelist-factory';
import { EvernotelistsService } from '../shared/evernotelists.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notelist-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './notelist-form.component.html',
  styles: ``
})
export class NotelistFormComponent {
  notelistForm: FormGroup;
  notelist: Notelist = NotelistFactory.empty();
  isUpdatingNotelist = false;
  images: FormArray;

  constructor(    
    private fb: FormBuilder,
    private app: EvernotelistsService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {
    this.notelistForm = this.fb.group({});
    this.images = this.fb.array([]);
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    if (params['id']) {
      this.isUpdatingNotelist = true;
      this.app.getSingle(params['id']).subscribe(notelist => {
        this.notelist = notelist;
        this.initNotelist();
      });
    }
    this.initNotelist();
  }

  initNotelist() {
    this.buildThumbnailsArray();
    this.notelistForm = this.fb.group({
      id: this.notelist.id,
      title: this.notelist.title,
      description: this.notelist.description,
      //user????
      images: this.images
    });
  }

  buildThumbnailsArray() {
    if (this.notelist.images) {
      this.images = this.fb.array([]);
      for (let image of this.notelist.images) {
        let fg = this.fb.group({
          id: new FormControl(image.id),
          url: new FormControl(image.url),
          title: new FormControl(image.title)
        });
        this.images.push(fg);
      }
    }
  }

  addThumbnailControl() {
    this.images.push(this.fb.group({ id: 0, url: null, title: null }));
  }

  submitForm() {
    //filter empty values
    this.notelistForm.value.images = this.notelistForm.value.images.filter((thumbnail: { url: string; }) => thumbnail.url);

    const notelist: Notelist = NotelistFactory.fromObject(this.notelistForm.value);

    if(this.isUpdatingNotelist){
      this.app.update(notelist).subscribe(res => {
        this.router.navigate(['../../notelist', notelist.id], { relativeTo: this.route });
        this.toastr.success('Notelist wurde bearbeitet!');
      });
    } else {
      //user hier zuweisen??? nach login dingsi halt
      notelist.users = [];
      this.app.create(notelist).subscribe(res => {
        this.notelist = NotelistFactory.empty();
        this.notelistForm.reset(NotelistFactory.empty());
        this.router.navigate(['../notelist'], { relativeTo: this.route });
        this.toastr.success('Notelist wurde erstellt!');
      });
    }
    
  }

}
