import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageName, NotificationType, ProgressItemStatus, ChallengeMode } from '../enum';
import { Game } from '../models/game.model';
import { GameOptions, NotificationData } from '../interfaces';
import { LocalNotifications, ILocalNotification } from '@ionic-native/local-notifications/ngx';
import { Platform, ModalController, AlertController } from '@ionic/angular';
import { ProgressItem } from '../models/progress-item.model';
import { ModalOptions } from '@ionic/core';
import { ChallengeDetailComponent } from 'src/app/challenges/challenge.detail.component';
import * as moment from 'moment';
import { shuffleArray } from 'src/app/lib/util/shuffle-array';

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
        private localNotifications: LocalNotifications,
        private modalController: ModalController,
        private alertController: AlertController,
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
            if (moment(activeGame.endDateTime).isBefore(moment(), 'seconds')) {
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
                    if (moment(game.endDateTime).isBefore(moment(), 'seconds')) {
                        // Quit game if end time is passed
                        this.quitGame().subscribe();
                    } else if (!this.isGameInProgress && moment(game.startDateTime).isSameOrBefore(moment(), 'seconds')) {
                        // If game was previously not in progress but now is; push update to game so subscribers can update data based on start or end time compared to current time
                        this.isGameInProgress = true;
                        this.saveGame(game).subscribe();
                    }
                }, 1000);
            }
        });
    }

    private setGameInProgressStatus(): void {
        const game = this.game.getValue();
        this.isGameInProgress = (game) ? moment(game.startDateTime).isSameOrBefore(moment(), 'seconds') : false;
    }

    public saveGame(game: Game): Observable<void> {
        return new Observable((observer) => {
            const _saveGame = (_game: Game) => {
                localStorage.setItem(LocalStorageName.GAME_IN_PROGRESS, JSON.stringify(game));
                this.game.next(new Game(game));
                this.setGameInProgressStatus();
                observer.next();
            }
            // If is new game
            if (!this.isGameInProgress) {
                // Parse start and end date times before scheduling game
                game.startDateTime = moment(game.startDateTime).startOf('minute').toDate();
                game.endDateTime = moment(game.endDateTime).endOf('minute').toDate();

                // If set start date is before now, force start date to now
                if (moment(game.startDateTime).isBefore(moment(), 'minutes')) {
                    game.startDateTime = moment().startOf('minute').toDate();
                }

                // If end date is before start date, set end date to 1 minute after start date time
                if (moment(game.endDateTime).isSameOrBefore(moment(game.startDateTime), 'seconds')) {
                    game.endDateTime = moment(game.startDateTime).add(1, 'minutes').endOf('minute').toDate();
                }

                // Randomize player order
                game.players = shuffleArray(game.players);

                // Schedule notifications
                this.scheduleNotifications(game).subscribe((_game) => _saveGame(_game));
            } else {
                _saveGame(game);
            }
        });
    }

    public quitGame(): Observable<void> {
        return new Observable((observer) => {
            if (!this.game.getValue()) {
                observer.next();
                return;
            }
            this.displayGameFinishedAlert();
            localStorage.removeItem(LocalStorageName.GAME_IN_PROGRESS);
            this.game.next(undefined);
            this.setGameInProgressStatus();
            this.platform.ready().then(() => {
                this.localNotifications.cancelAll();
            });
            observer.next();
        });
    }

    private async displayGameFinishedAlert(): Promise<void> {
        const game = this.game.getValue();
        if (!game) {
            return;
        }
        const alert = await this.alertController.create({
            header: 'Done!',
            message: `There are no more challenges left. Game <strong>${game.title}</strong> is now over.`,
            buttons: [ 
                {
                    text: 'Okay',
                }
            ]
        });
        await alert.present();
    }

    private scheduleNotifications(game: Game): Observable<Game> {
        return new Observable((observer) => {
            this.platform.ready().then(() => {
                // Calculate notifications schedule
                const minChallengesPerGame = Math.min(this.gameOptions.minChallengesPerGame, game.challenges.length);
                const maxChallengesPerGame = Math.min(this.gameOptions.maxChallengesPerGame, game.challenges.length);
                let amountOfChallenges = (maxChallengesPerGame === minChallengesPerGame) ? maxChallengesPerGame : Math.floor(Math.random() * maxChallengesPerGame) + minChallengesPerGame;
                if (amountOfChallenges > this.gameOptions.maxChallengesPerGame) {
                    amountOfChallenges = this.gameOptions.maxChallengesPerGame;
                }
                const duration = moment.duration(moment(game.endDateTime).diff(moment(game.startDateTime))).asSeconds();
                const increment = duration / amountOfChallenges;
                let triggerAt = moment(game.startDateTime).add(increment/2, 'seconds');
                const notifications: ILocalNotification[] = [];
                game.progress = [];

                // Set notifications for each challenge
                Array(amountOfChallenges).fill('').forEach((_amountOfChallenges, challengeIndex) => {
                    notifications.push({
                        id: challengeIndex + 1,
                        text: this.gameOptions.notificationOptions.notificationMessage,
                        trigger: {at: triggerAt.toDate()},
                        foreground: true,
                        vibrate: true,
                        badge: 1,
                        priority: 2,
                        wakeup: true,
                        sound: this.platform.is('ios') ? 'res://public/assets/sound/alarm.caf' : 'res://public/assets/sound/alarm.mp3',
                        data: <NotificationData> {
                            notificationType: NotificationType.CHALLENGE,
                        }
                    });

                    // Set game progress items for each notification created
                    game.progress.push(new ProgressItem({ status: ProgressItemStatus.TO_DO, dateTime: triggerAt.toDate() }))

                    // Increment the trigger time for the next notification
                    triggerAt = triggerAt.add(increment, 'seconds');
                });

                // First cancel all other notifications
                this.localNotifications.cancelAll().then(() => {
                    // Schedule notifications
                    this.localNotifications.schedule(notifications);
                    observer.next(game);
                });
            });
        });
    }

    public checkForActiveChallenge(): void {
        const game = this.game.getValue();
        if (!this.isGameInProgress || !game) {
            return;
        }

        // Quit game if no challenges availabe
        if (
            !(game instanceof Game) || 
            !game.challenges || 
            !game.challenges.length ||
            !game.players ||
            !game.players.length
        ) {
            this.quitGame().subscribe();
        } else {
            // Get date times of each set challenge
            // Check for latest with date time that has passed with a to do status
            // If found, activate challenge
            let latestChallenge: ProgressItem;
            game.progress.forEach(progressItem => {
                if (moment(progressItem.dateTime).isSameOrBefore(moment(), 'seconds')) {
                    latestChallenge = progressItem;
                }
            });
            if (latestChallenge.status === ProgressItemStatus.TO_DO) {
                this.openChallengeModal(game, latestChallenge);
            }
        }
    }

    private async openChallengeModal(game: Game, progressItem: ProgressItem) {
        const options: ModalOptions = {
          component: ChallengeDetailComponent,
          swipeToClose: true,
          componentProps: {
            game,
            activeProgressItem: progressItem,
            mode: ChallengeMode.PLAY,
          }
        };
        const modal = await this.modalController.create(options);
        await modal.present();
      }
}