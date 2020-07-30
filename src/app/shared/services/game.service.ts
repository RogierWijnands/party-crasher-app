import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageName } from '../enum';
import { Game } from '../models/game.model';
import { LoggerService } from './log.service';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    private game: BehaviorSubject<Game|undefined> = new BehaviorSubject(undefined);

    constructor(
        private logger: LoggerService,
    ) {
        if (localStorage.getItem(LocalStorageName.GAME_IN_PROGRESS)) {
            this.game.next(new Game(JSON.parse(localStorage.getItem(LocalStorageName.GAME_IN_PROGRESS))));
        }
    }

    public get game$(): Observable<Game> {
        return this.game.asObservable();
    }

    public startGame(game: Game): Observable<void> {
        return new Observable((observer) => {
            if (this.game.getValue()) {
                this.logger.error('Game is already in progress!');
                observer.next();
            }
            localStorage.setItem(LocalStorageName.GAME_IN_PROGRESS, JSON.stringify(game));
            this.game.next(game);
            observer.next();
        });
    }
}