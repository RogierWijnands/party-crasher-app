import { ProgressItemStatus } from '../enum';

export class ProgressItem {
    public status: ProgressItemStatus;
    public dateTime: Date|string;

    constructor(progressItem: {[key: string]: any} = {}) {
        this.setStatus(progressItem.status);
        this.setDateTime(progressItem.dateTime);
    }

    public setStatus(status: ProgressItemStatus): void {
        if (Object.values(ProgressItemStatus).includes(status)) {
            this.status = status;
        }
    }

    public setDateTime(dateTime: Date|string): void {
        if (dateTime instanceof Date) {
            this.dateTime = dateTime;
        } else if (typeof dateTime === 'string') {
            this.dateTime = new Date(dateTime);
        }
    }
}