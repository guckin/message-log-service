import {Item} from './item';

export class Message implements     Item {

    content: string;
    author: string;
    date: string;
    id: number;

    constructor(messageData: Message) {
        this.content = messageData.content;
        this.author = messageData.author;
        this.date = messageData.date;
        this.id = messageData.id;
    }
}
