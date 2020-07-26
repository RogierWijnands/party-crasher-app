export class Friend {
    public id: string | number;
    public firstName: string;
    public middleName: string;
    public lastName: string;

    constructor(friend: {[key: string]: any} = {}) {
        this.setId(friend.id);
        this.setFirstName(friend.firstName);
        this.setMiddleName(friend.middleName);
        this.setLastName(friend.lastName);
    }

    public setId(id: string | number): void {
        if (typeof id === 'string' || typeof id === 'number') {
            this.id = id;
        }
    }

    public setFirstName(firstName: string): void {
        if (typeof firstName === 'string') {
            this.firstName = firstName;
        }
    }

    public setMiddleName(middleName: string): void {
        if (typeof middleName === 'string') {
            this.middleName = middleName;
        }
    }

    public setLastName(lastName: string): void {
        if (typeof lastName === 'string') {
            this.lastName = lastName;
        }
    }

    public getFullName(): string {
        let fullName = '';

        if (this.firstName) {
            fullName += this.firstName;
        }

        if (this.middleName) {
            fullName += (fullName.length) ? ` ${this.middleName}` : this.middleName;
        }

        if (this.lastName) {
            fullName += (fullName.length) ? ` ${this.lastName}` : this.lastName;
        }

        return fullName;
    }

}