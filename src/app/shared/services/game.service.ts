import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageName } from '../enum';
import { Game } from '../models/game.model';
import { LoggerService } from './log.service';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    private game: BehaviorSubject<Game|undefined> = new BehaviorSubject(undefined);

    constructor(
        private logger: LoggerService,
    ) {
        this.initActiveGame();
    }

    public get game$(): Observable<Game> {
        return this.game.asObservable();
    }

    private initActiveGame(): void {
        let activeGame: Game|string = localStorage.getItem(LocalStorageName.GAME_IN_PROGRESS);
        if (activeGame) {
            activeGame = new Game(JSON.parse(activeGame));
            if (moment(activeGame.endDateTime).isBefore(moment())) {
                this.quitGame().subscribe();
            } else {
                this.game.next(activeGame);
            }
        }
    }

    public saveGame(game: Game): Observable<void> {
        return new Observable((observer) => {
            localStorage.setItem(LocalStorageName.GAME_IN_PROGRESS, JSON.stringify(game));
            this.game.next(game);
            observer.next();
        });
    }

    public quitGame(): Observable<void> {
        return new Observable((observer) => {
            if (!this.game.getValue()) {
                this.logger.error('No game in progress!');
                observer.next();
                return;
            }
            localStorage.removeItem(LocalStorageName.GAME_IN_PROGRESS);
            this.game.next(undefined);
            observer.next();
        });
    }
}