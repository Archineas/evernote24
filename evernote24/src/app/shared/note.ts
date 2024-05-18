import { Evernotetag } from "./evernotetag";
import { Notelist } from "./notelist";

export class Note {
    constructor(public id: number, public title: string, public description: string, public evernotetags: Evernotetag[], public notelists: Notelist[]){

    }
}