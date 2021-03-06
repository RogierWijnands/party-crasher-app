import { Friend } from './friend.model';
import { Challenge } from './challenge.model';
import { ProgressItem } from './progress-item.model';

export class Game {
    public title: string;
    public startDateTime: Date|string;
    public endDateTime: Date|string;
    public players: Friend[];
    public playersPassed: Friend[];
    public minChallenges: number = 3;
    public maxChallenges: number = 15;
    public challenges: Challenge[];
    public progress: ProgressItem[];

    constructor(game: {[key: string]: any} = {}) {
        this.setTitle(game.title);
        this.setStartDateTime(game.startDateTime);
        this.setEndDateTime(game.endDateTime);
        this.setPlayers(game.players);
        this.setPlayersPassed(game.playersPassed);
        this.setChallenges(game.challenges);
        this.setMinChallenges(game.minChallenges);
        this.setMaxChallenges(game.maxChallenges);
        this.setProgress(game.progress);
    }

    public setTitle(title: string): void {
        if (typeof title === 'string') {
            this.title = title;
        }
    }

    public setStartDateTime(startDateTime: Date|string): void {
        if (startDateTime instanceof Date) {
            this.startDateTime = startDateTime;
        } else if (typeof startDateTime === 'string') {
            this.startDateTime = new Date(startDateTime);
        }
    }

    public setEndDateTime(endDateTime: Date|string): void {
        if (endDateTime instanceof Date) {
            this.endDateTime = endDateTime;
        } else if (typeof endDateTime === 'string') {
            this.endDateTime = new Date(endDateTime);
        }
    }

    public setPlayers(players: Friend[]): void {
        if (Array.isArray(players)) {
            this.players = players.map(player => new Friend(player));
        }
    }

    public setPlayersPassed(players: Friend[]): void {
        if (Array.isArray(players)) {
            this.playersPassed = players.map(player => new Friend(player));
        }
    }

    public setChallenges(challenges: Challenge[]): void {
        if (Array.isArray(challenges)) {
            this.challenges = challenges.map(challenge => new Challenge(challenge));
        }
    }

    public setMinChallenges(minChallenges: number): void {
        if (typeof minChallenges === 'number') {
            this.minChallenges = minChallenges;
        }
    }

    public setMaxChallenges(maxChallenges: number): void {
        if (typeof maxChallenges === 'number') {
            this.maxChallenges = maxChallenges;
        }
    }

    public setProgress(progress: ProgressItem[]): void {
        if (Array.isArray(progress)) {
            this.progress = progress.map(progress => new ProgressItem(progress));
        }
    }
}