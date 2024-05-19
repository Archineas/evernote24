import { Routes } from '@angular/router';
import { EvernotelistListComponent } from './evernotelist-list/evernotelist-list.component';
import { EvernotelistDetailComponent } from './evernotelist-detail/evernotelist-detail.component';
import { HomeComponent } from './home/home.component';
import { NotelistFormComponent } from './notelist-form/notelist-form.component';
import { NoteFormComponent } from './note-form/note-form.component';
import { LoginComponent } from './login/login.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoFormComponent } from './todo-form/todo-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'notelist', component: EvernotelistListComponent },
  { path: 'notelist/:id', component: EvernotelistDetailComponent },
  { path: 'todo', component: TodoListComponent },
  { path: 'admin/notelist', component: NotelistFormComponent },
  { path: 'admin/notelist/:id', component: NotelistFormComponent },
  { path: 'admin/note', component: NoteFormComponent },
  { path: 'admin/note/:id', component: NoteFormComponent },
  { path: 'admin/todo', component: TodoFormComponent },
  { path: 'admin/todo/:id', component: TodoFormComponent },
  { path: 'login', component: LoginComponent },
];
