import { DatabaseService } from './database.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DatabaseTableName } from '../enum';
import { Challenge } from '../models/challenge.model';

@Injectable({
    providedIn: 'root'
})
export class ChallengeService {
    constructor(
        private databaseService: DatabaseService
    ) {}

    public save(challenge: Challenge): Observable<void> {
        return new Observable((observer) => {
            if (challenge.id) {
                this.databaseService.updateRow(DatabaseTableName.CHALLENGES, challenge, challenge.id).subscribe(() => {
                    observer.next()
                });
            } else {
                this.databaseService.insertRow(DatabaseTableName.CHALLENGES, challenge).subscribe(() => {
                    observer.next();
                });
            }
        });
    }

    public delete(challenge: Challenge): Observable<void> {
        return new Observable((observer) => {
            this.databaseService.deleteRow(DatabaseTableName.CHALLENGES, challenge.id).subscribe(() => {
                observer.next();
            });
        });
    }

    public getAll(): Observable<Challenge[]> {
        return new Observable((observer) => {
            this.databaseService.getRows(DatabaseTableName.CHALLENGES).subscribe((res: any) => {
                observer.next(Array.from(res).map(challenge => new Challenge(challenge)).sort((a, b) => a.title.localeCompare(b.title)));
            });
        });
    }
}