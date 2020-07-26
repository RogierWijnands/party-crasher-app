import { DatabaseService } from './database.service';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { DatabaseTableName } from '../enum';
import { Challenge } from '../models/challenge.model';

@Injectable({
    providedIn: 'root'
})
export class ChallengeService {
    public challenges$: BehaviorSubject<Challenge[]> = new BehaviorSubject([]);

    constructor(
        private databaseService: DatabaseService
    ) {}

    public save(challenge: Challenge): void {
        console.log(challenge);
        if (challenge.id) {
            this.databaseService.updateRow(DatabaseTableName.CHALLENGES, challenge, challenge.id).subscribe(() => this.getAll());
        } else {
            this.databaseService.insertRow(DatabaseTableName.CHALLENGES, challenge).subscribe(() => this.getAll());
        }
    }

    public delete(challenge: Challenge): void {
        this.databaseService.deleteRow(DatabaseTableName.CHALLENGES, challenge.id).subscribe(() => this.getAll());
    }

    public getAll(): void {
        this.databaseService.getRows(DatabaseTableName.CHALLENGES).subscribe((res: any) => {
            this.challenges$.next(Array.from(res.rows).map(challenge => new Challenge(challenge)).sort((a, b) => a.title.localeCompare(b.title)));
        });
    }
}