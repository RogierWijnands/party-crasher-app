import { DatabaseService } from './database.service';
import { Observable } from 'rxjs';
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

    public addFriend(friend: Friend): void {
        this.databaseService.insertRow(DatabaseTableName.FRIENDS, friend).subscribe();
    }
}