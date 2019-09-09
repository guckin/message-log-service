export class Message {

    content: string;
    author: string;
    date: string;

    constructor(messageData: Message) {
        this.content = messageData.content;
        this.author = messageData.author;
        this.date = messageData.date;
    }

}
