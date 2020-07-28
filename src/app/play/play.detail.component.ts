import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Game } from '../shared/models/game.model';
import { Friend } from '../shared/models/friend.model';
import { Challenge } from '../shared/models/challenge.model';
import { FriendsService } from '../shared/services/friends.service';
import { ChallengeService } from '../shared/services/challenge.service';
import { GameService } from '../shared/services/game.service';

@Component({
  selector: 'play-detail-component',
  templateUrl: 'play.detail.component.html'
})
export class PlayDetailComponent implements OnInit {
  public tempGame: Game = new Game();
  @Input('game') set game(_game: Game) {
    this.tempGame = new Game(_game);
  }
  public friends: Friend[] = [];
  public challenges: Challenge[] = [];

  constructor(
      private modalController: ModalController,
      private friendsService: FriendsService,
      private challengeService: ChallengeService,
      private gameService: GameService,
  ) {}

  public ngOnInit(): void {
    this.friendsService.getAll().subscribe(friends => this.friends = friends);

    this.challengeService.getAll().subscribe(challenges => {
      (this.challenges = challenges).forEach(challenge => {
        if (!this.tempGame.challenges) this.tempGame.challenges = [];
        // Select all by default
        this.tempGame.challenges.push(challenge);
      });
    });
  }

  public closeModal(): void {
      this.modalController.dismiss();
  }

  public save(): void {
    this.gameService.startGame(this.tempGame).subscribe(() => this.closeModal());
  }
}