import { NotificationType } from '../enum';
import { Game } from '../models/game.model';

export interface GameOptions {
    minChallengesPerGame: number,
    maxChallengesPerGame: number,
    notificationOptions: NotificationOptions,
}

export interface NotificationData {
    game: Game,
    notificationType: NotificationType,
}

export interface NotificationOptions {
    notificationMessage: string,
    notificationSound: string,
}