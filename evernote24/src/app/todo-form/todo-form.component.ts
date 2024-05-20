import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TodoFactory } from '../shared/todo-factory';
import { TodosService } from '../shared/todos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../shared/todo';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form.component.html',
  styles: ``,
})
export class TodoFormComponent implements OnInit {
  todoForm: FormGroup;
  todo = TodoFactory.empty();
  isUpdatingTodo = false;
  isInList = true;
  notelistId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private app: TodosService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.todoForm = this.fb.group({
      notelistId: [''],
      id: [''],
      title: [''],
      description: [''],
      deadline: [''],
      notelists: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.notelistId = params['notelistId'];
    });
    if (this.notelistId !== null) {
      this.todoForm.patchValue({ notelistId: this.notelistId });
      this.initNote();
    }

    const params = this.route.snapshot.params;
    if (params['id']) {
      this.todoForm.patchValue({ notelistId: params['id'] });
      this.isUpdatingTodo = true;
      this.app.getSingle(params['id']).subscribe((todo) => {
        this.todo = todo;
        this.initNote();
      });
    } else {
      this.isInList = false;
      this.initNote();
    }
  }

  initNote() {
    let notelists;
    this.isInList
      ? (notelists = { id: Number(this.notelistId) })
      : (notelists = {});
    this.todoForm = this.fb.group({
      notelistId: this.notelistId,
      id: this.todo.id,
      title: this.todo.title,
      description: this.todo.description,
      deadline: this.todo.deadline,
      notelists: notelists,
    });
  }

  submitForm() {
    const todo: Todo = TodoFactory.fromObject({
      ...this.todoForm.getRawValue(),
      notelists: this.isInList ? [this.todoForm.get('notelists')?.value] : [],
    });
    if (this.isUpdatingTodo) {
      this.app.update(todo).subscribe(() => {
        this.router.navigate(['/todo']);
        this.toastr.success('Todo wurde bearbeitet!');
      });
    } else {
      this.app.create(todo).subscribe(() => {
        this.router.navigate(['/todo']);
        this.toastr.success('Todo wurde erstellt!');
      });
    }
  }
}
