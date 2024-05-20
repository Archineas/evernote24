import { Evernotetag } from './evernotetag';
import { Notelist } from './notelist';

export class Todo {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public deadline: Date,
    public evernotetags: Evernotetag[],
    public notelists: Notelist[]
  ) {}
}
