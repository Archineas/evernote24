import { Component, Input } from '@angular/core';
import { Todo } from '../shared/todo';
import { TodoFactory } from '../shared/todo-factory';
import { TodosService } from '../shared/todos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'div.app-todo-detail',
  standalone: true,
  imports: [],
  templateUrl: './todo-detail.component.html',
  styles: ``
})
export class TodoDetailComponent {
@Input() todo: Todo = TodoFactory.empty();
  
    constructor(
      private app: TodosService,
      private route: ActivatedRoute,
      private router: Router,
      private toastr: ToastrService
    ) {}
  
    ngOnInit() {
    }

    //leitet immer auf die Startseite um, wie bei Notiz löschen
    removeTodo() {
      if (confirm('Willst du dieses Todo wirklich löschen?!')) {
         this.app.remove(this.todo.id + '')
         .subscribe((res: any) => this.router.navigate(['../'], { relativeTo: this.route }));
         this.toastr.success('Todo wurde gelöscht!');
      }
    }
}
