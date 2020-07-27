import { Friend } from './friend.model';
import { Challenge } from './challenge.model';

export class Game {
    public title: string;
    public startDateTime: Date;
    public endDateTime: Date;
    public players: Friend[];
    public challenges: Challenge[];

    constructor(game: {[key: string]: any} = {}) {
        this.setTitle(game.title);
        this.setStartDateTime(game.startDateTime);
        this.setEndDateTime(game.endDateTime);
        this.setPlayers(game.players);
        this.setChallenges(game.challenges);
    }

    public setTitle(title: string): void {
        if (typeof title === 'string') {
            this.title = title;
        }
    }

    public setStartDateTime(startDateTime: Date): void {
        if (startDateTime instanceof Date) {
            this.startDateTime = startDateTime;
        }
    }

    public setEndDateTime(endDateTime: Date): void {
        if (endDateTime instanceof Date) {
            this.endDateTime = endDateTime;
        }
    }

    public setPlayers(players: Friend[]): void {
        if (Array.isArray(players)) {
            this.players = players.map(player => new Friend(player));
        }
    }

    public setChallenges(challenges: Challenge[]): void {
        if (Array.isArray(challenges)) {
            this.challenges = challenges.map(challenge => new Challenge(challenge));
        }
    }
}