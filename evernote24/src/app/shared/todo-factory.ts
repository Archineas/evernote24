import { Todo } from './todo';
export class TodoFactory {
  static empty(): Todo {
    return new Todo(0, '', '', new Date(), [], []);
  }

  static fromObject(rawTodo: any): Todo {
    return new Todo(
      rawTodo.id,
      rawTodo.title,
      rawTodo.description,
      typeof rawTodo.deadline === 'string'
        ? new Date(rawTodo.deadline)
        : rawTodo.deadline,
      rawTodo.evernotetags,
      rawTodo.notelists
    );
  }
}
