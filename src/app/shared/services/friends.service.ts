import { DatabaseService } from './database.service';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { DatabaseTableName } from '../enum';
import { Friend } from '../models/friend.model';

@Injectable({
    providedIn: 'root'
})
export class FriendsService {
    public friends$: BehaviorSubject<Friend[]> = new BehaviorSubject([]);

    constructor(
        private databaseService: DatabaseService
    ) {}

    public save(friend: Friend): void {
        if (friend.id) {
            this.databaseService.updateRow(DatabaseTableName.FRIENDS, friend, friend.id).subscribe(() => this.getAll());
        } else {
            this.databaseService.insertRow(DatabaseTableName.FRIENDS, friend).subscribe(() => this.getAll());
        }
    }

    public delete(friend: Friend): void {
        this.databaseService.deleteRow(DatabaseTableName.FRIENDS, friend.id).subscribe(() => this.getAll());
    }

    public getAll(): void {
        this.databaseService.getRows(DatabaseTableName.FRIENDS).subscribe((res: any) => {
            this.friends$.next(Array.from(res.rows).map(friend => new Friend(friend)).sort((a, b) => a.firstName.localeCompare(b.firstName)));
        });
    }
}