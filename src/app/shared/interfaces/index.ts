export interface GameOptions {
    minChallengesPerGame: number,
    maxChallengesPerGame: number,
    notificationOptions: NotificationOptions,
}

export interface NotificationOptions {
    notificationMessage: string,
    notificationSound: string,
}