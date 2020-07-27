import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GameMode, LocalStorageName } from '../enum';
import { Game } from '../models/game.model';
import { LoggerService } from './log.service';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    private mode: BehaviorSubject<GameMode> = new BehaviorSubject(GameMode.NOT_IN_PROGRESS);

    constructor(
        private logger: LoggerService,
    ) {
        if (localStorage.getItem(LocalStorageName.GAME_IN_PROGRESS)) {
            this.mode.next(GameMode.IN_PROGRESS);
        }
    }

    public get mode$(): Observable<GameMode> {
        return this.mode.asObservable();
    }

    public startGame(game: Game): Observable<void> {
        return new Observable((observer) => {
            if (this.mode.getValue() === GameMode.IN_PROGRESS) {
                this.logger.error('Game is already in progress!');
                observer.next();
            }
            localStorage.setItem(LocalStorageName.GAME_IN_PROGRESS, JSON.stringify(game));
            this.mode.next(GameMode.IN_PROGRESS);
            observer.next();
        });
    }

    public getGame(): Observable<Game> {
        return new Observable((observer) => {
            if (this.mode.getValue() !== GameMode.IN_PROGRESS) {
                this.logger.error('There is no game in progress!');
                observer.next();
            }

            const game = localStorage.getItem(LocalStorageName.GAME_IN_PROGRESS);
            if (!game) {
                this.logger.error('No game in progress found!');
                observer.next();
            }

            observer.next(new Game(JSON.parse(game)));
        });
    }
}