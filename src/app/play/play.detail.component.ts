import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Game } from '../shared/models/game.model';
import { Friend } from '../shared/models/friend.model';
import { Challenge } from '../shared/models/challenge.model';
import { FriendsService } from '../shared/services/friends.service';
import { ChallengeService } from '../shared/services/challenge.service';
import { GameService } from '../shared/services/game.service';
import * as moment from 'moment';

@Component({
  selector: 'play-detail-component',
  templateUrl: 'play.detail.component.html'
})
export class PlayDetailComponent implements OnInit {
  public readonly moment = moment;
  public friends: Friend[] = [];
  public challenges: Challenge[] = [];
  public gameInProgress: boolean = false;

  public tempGame: Game = new Game();
  @Input('game') set game(_game: Game) {
    this.tempGame = new Game(_game);
    if (this.tempGame.startDateTime instanceof Date) this.tempGame.startDateTime = this.tempGame.startDateTime.toISOString();
    if (this.tempGame.endDateTime instanceof Date) this.tempGame.endDateTime = this.tempGame.endDateTime.toISOString();
    this.gameInProgress = true;
  }

  constructor(
      private modalController: ModalController,
      private friendsService: FriendsService,
      private challengeService: ChallengeService,
      public gameService: GameService,
  ) {}

  public ngOnInit(): void {
    this.initPlayers();
    this.initChallenges();
  }

  public closeModal(): void {
      this.modalController.dismiss();
  }

  public save(): void {
    this.gameService.saveGame(this.tempGame).subscribe(() => this.closeModal());
  }

  private initPlayers(): void {
    this.friendsService.getAll().subscribe(friends => {
      this.friends = friends;
      // Link friends to tempNode selected players
      if (this.tempGame.players && this.tempGame.players.length) {
        this.tempGame.players = this.tempGame.players
        .filter(tempGamePlayer => friends.some(_friend => _friend.id === tempGamePlayer.id))
        .map(tempGamePlayer => friends.find(_friend => _friend.id === tempGamePlayer.id))
      }
    });
  }

  private initChallenges(): void {
    this.challengeService.getAll().subscribe(challenges => {
      this.challenges = challenges
      // Link challenges to tempNode selected challenges
      if (this.tempGame.challenges) {
        this.tempGame.challenges = this.tempGame.challenges
        .filter(tempGameChallenge => challenges.some(_challenge => _challenge.id === tempGameChallenge.id))
        .map(tempGameChallenge => challenges.find(_challenge => _challenge.id === tempGameChallenge.id))
      }
      // Select all by default if none were selected previously
      if (!this.tempGame.challenges) {
        this.tempGame.challenges = [...this.challenges];
      }
    });
  }
}