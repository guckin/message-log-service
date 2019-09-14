import {Item} from './item';

export class Room implements Item {

    name: string;
    id: string = this.name;

    constructor(name: string) {
        this.name = name;
    }
}
