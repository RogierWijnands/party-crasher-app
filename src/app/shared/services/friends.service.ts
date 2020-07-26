import { DatabaseService } from './database.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DatabaseTableName } from '../enum';
import { Friend } from '../models/friend.model';

@Injectable({
    providedIn: 'root'
})
export class FriendsService {
    constructor(
        private databaseService: DatabaseService
    ) {}

    public save(friend: Friend): Observable<void> {
        return new Observable((observer) => {
            if (friend.id) {
                this.databaseService.updateRow(DatabaseTableName.FRIENDS, friend, friend.id).subscribe(() => {
                    observer.next()
                });
            } else {
                this.databaseService.insertRow(DatabaseTableName.FRIENDS, friend).subscribe(() => {
                    observer.next();
                });
            }
        });
    }

    public delete(friend: Friend): Observable<void> {
        return new Observable((observer) => {
            this.databaseService.deleteRow(DatabaseTableName.FRIENDS, friend.id).subscribe(() => {
                observer.next();
            });
        });
    }

    public getAll(): Observable<Friend[]> {
        return new Observable((observer) => {
            this.databaseService.getRows(DatabaseTableName.FRIENDS).subscribe((res: any) => {
                observer.next(Array.from(res.rows).map(friend => new Friend(friend)).sort((a, b) => a.firstName.localeCompare(b.firstName)));
            });
        });
    }
}