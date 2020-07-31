import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageName } from '../enum';
import { Game } from '../models/game.model';
import { GameOptions } from '../interfaces';
import { LoggerService } from './log.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import * as moment from 'moment';
import { Platform } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    private game: BehaviorSubject<Game|undefined> = new BehaviorSubject(undefined);
    private isGameInProgress: boolean = false;
    private checkGameStatusInterval: any;
    private gameOptions: GameOptions = {
        minChallengesPerGame: 5,
        maxChallengesPerGame: 20,
        notificationOptions: {
            notificationMessage: 'Oh oh, your party is being crashed! A new challenge awaits...😰',
            notificationSound: '',
        },
    }

    constructor(
        private platform: Platform,
        private logger: LoggerService,
        private localNotifications: LocalNotifications,
    ) {
        this.initActiveGame();
        this.checkGameStatus();
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
                this.setGameInProgressStatus();
            }
        }
    }

    private checkGameStatus(): void {
        this.game$.subscribe(game => {
            if (this.checkGameStatusInterval) {
                clearInterval(this.checkGameStatusInterval);
            }
            if (game) {
                this.checkGameStatusInterval = setInterval(() => {
                    if (moment(game.endDateTime).isBefore(moment())) {
                        // Quit game if end time is passed
                        this.quitGame().subscribe();
                    } else if (!this.isGameInProgress && moment(game.startDateTime).isSameOrBefore(moment())) {
                        // If game was previously not in progress but now is; push update to game so subscribers can update data based on start or end time compared to current time
                        this.saveGame(game).subscribe();
                    }
                }, 60000);
            }
        });
    }

    private setGameInProgressStatus(): void {
        const game = this.game.getValue();
        this.isGameInProgress = (game) ? moment(game.startDateTime).isSameOrBefore(moment()) : false;
    }

    public saveGame(game: Game): Observable<void> {
        return new Observable((observer) => {
            const _saveGame = () => {
                localStorage.setItem(LocalStorageName.GAME_IN_PROGRESS, JSON.stringify(game));
                this.game.next(game);
                this.setGameInProgressStatus();
                observer.next();
            }
            if (!this.isGameInProgress) {
                this.scheduleNotifications(game).subscribe(() => _saveGame());
            } else {
                _saveGame();
            }
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
            this.setGameInProgressStatus();
            this.platform.ready().then(() => {
                this.localNotifications.cancelAll();
            });
            observer.next();
        });
    }

    private scheduleNotifications(game: Game): Observable<void> {
        return new Observable((observer) => {
            this.platform.ready().then(() => {
                const minChallengesPerGame = this.gameOptions.minChallengesPerGame;
                const maxChallengesPerGame = Math.min(this.gameOptions.maxChallengesPerGame, game.challenges.length);
                const amountOfChallenges = Math.floor(Math.random() * maxChallengesPerGame) + minChallengesPerGame;
                const duration = moment.duration(moment(game.startDateTime).diff(moment(game.endDateTime))).asMilliseconds();
                const increment = duration / amountOfChallenges;
                let triggerAt = moment(game.startDateTime).add(increment/2, 'milliseconds');

                Array(amountOfChallenges).fill('').forEach(() => {
                    this.localNotifications.schedule({
                        text: this.gameOptions.notificationOptions.notificationMessage,
                        trigger: {at: triggerAt.toDate()},
                    });
                    triggerAt = triggerAt.add(increment, 'milliseconds');
                });

                observer.next();
            });
        });
    }
}