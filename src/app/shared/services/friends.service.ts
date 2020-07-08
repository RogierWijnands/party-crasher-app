import { DatabaseService } from './database.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DatabaseTableName } from '../enum';

@Injectable({
    providedIn: 'root'
})
export class FriendsService {
    constructor(
        private databaseService: DatabaseService
    ) {}

    public addFriend(): void {
        
    }
}