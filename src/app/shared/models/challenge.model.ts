export class Challenge {
    public id: string | number;
    public title: string;
    public description: string;

    constructor(challenge: {[key: string]: any} = {}) {
        this.setId(challenge.id);
        this.setTitle(challenge.title);
        this.setDescription(challenge.description);
    }

    public setId(id: string | number): void {
        if (typeof id === 'string' || typeof id === 'number') {
            this.id = id;
        }
    }

    public setTitle(title: string): void {
        if (typeof title === 'string') {
            this.title = title;
        }
    }

    public setDescription(description: string): void {
        if (typeof description === 'string') {
            this.description = description;
        }
    }
}