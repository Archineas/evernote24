import { Component, Input } from '@angular/core';
import { Todo } from '../shared/todo';

@Component({
  selector: 'div.app-todo-detail',
  standalone: true,
  imports: [],
  templateUrl: './todo-detail.component.html',
  styles: ``
})
export class TodoDetailComponent {
@Input() todo: Todo | undefined;
}
