import { Component } from '@angular/core';
import { TodosService } from '../shared/todos.service';
import { Todo } from '../shared/todo';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoDetailComponent],
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
  todos: Todo[] = [];

  constructor(private app: TodosService) {}

  ngOnInit() {
    this.app.getAll().subscribe((res) => (this.todos = res));
  }
}
