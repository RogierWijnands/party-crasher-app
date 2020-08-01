import { NotificationType } from '../enum';

export interface GameOptions {
    minChallengesPerGame: number,
    maxChallengesPerGame: number,
    notificationOptions: NotificationOptions,
}

export interface NotificationData {
    notificationType: NotificationType,
}

export interface NotificationOptions {
    notificationMessage: string,
    notificationSound: string,
}