import { Evernotetag } from "./evernotetag";

export class Note {
    constructor(public id: number, public title: string, public description: string, public evernotetags: Evernotetag[]){

    }
}