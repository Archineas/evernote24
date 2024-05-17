import { Todo } from "./todo";
export class TodoFactory {
    static empty(): Todo {
        return new Todo(0, '', '', new Date(), []);
    }
}
