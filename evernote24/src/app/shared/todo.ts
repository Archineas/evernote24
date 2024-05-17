import { Evernotetag } from "./evernotetag";

export class Todo {
    constructor(public id: number, public title: string, public description: string, public deadline:Date, public evernotetags: Evernotetag[]){

    }
}
