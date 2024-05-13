import { Image } from "./image";
import { Note } from "./note";
import { Todo } from "./todo";
import { User } from "./user";

export { Image } from "./image";
export { Note } from "./note";
export { Todo } from "./todo";
export { User } from "./user";

export class Notelist {
    constructor(
        public id: number, 
        public title: string, 
        public description?: string, 
        public images?: Image[],
        public users?: User[],
        public notes?: Note[],
        public todos?: Todo[]
    ){
    }
}
