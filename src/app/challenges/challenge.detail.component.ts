import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChallengeService } from '../shared/services/challenge.service';
import { Challenge } from '../shared/models/challenge.model';
import { ChallengeMode, ChallengeContent } from '../shared/enum';
import { Game } from '../shared/models/game.model';
import { GameService } from '../shared/services/game.service';

@Component({
  selector: 'challenge-detail-component',
  templateUrl: 'challenge.detail.component.html'
})
export class ChallengeDetailComponent implements OnInit {
  public readonly ChallengeContent = ChallengeContent;
  public readonly ChallengeMode = ChallengeMode;

  @Input() public mode: ChallengeMode = ChallengeMode.EDIT;

  public tempChallenge: Challenge = new Challenge();
  @Input('challenge') set challenge(_challenge: Challenge) {
    this.tempChallenge = new Challenge(_challenge);
  }

  constructor(
      private modalController: ModalController,
      private challengeService: ChallengeService,
      private gameService: GameService,
  ) {}

  public ngOnInit(): void {
    if (this.mode === ChallengeMode.PLAY) {
      this.playChallenge();
    }
  }

  public closeModal(data?: {[key: string]: any}): void {
      this.modalController.dismiss(data);
  }

  public save(): void {
    this.challengeService.save(this.tempChallenge).subscribe(() => {
      this.closeModal({ 'saved': true });
    });
  }

  private playChallenge(): void {
    this.gameService.game$.subscribe((game: Game) => {
      if (
        this.mode !== ChallengeMode.PLAY || 
        !(game instanceof Game) || 
        !game.challenges || 
        !game.challenges.length ||
        !game.players ||
        !game.players.length
        ) {
        this.closeModal();
        return;
      }
  
      // Pick random challenge
      this.tempChallenge = new Challenge(game.challenges[Math.floor(Math.random() * game.challenges.length)]);
      // Remove randomly picked challenge from game
      game.challenges = game.challenges.filter(_challenge => _challenge.id !== this.tempChallenge.id);
  
      // Replace challenge player references with actual players
      let splitChallengeDesc = this.tempChallenge.description.split(ChallengeContent.PLAYER_REF);
      let challengeDesc = '';
      if (splitChallengeDesc.length > 1) {
        splitChallengeDesc.forEach((descPart, i) => {
          if (i !== splitChallengeDesc.length - 1) {
           // Pick first player
          const pickPlayer = game.players.shift();
          // Move picked player to end of players list
          game.players.push(pickPlayer);
          // Add player name to challenge description part
          descPart += `<strong>${pickPlayer.getFullName()}</strong>`; 
          }
          challengeDesc += descPart;
        });
        this.tempChallenge.description = challengeDesc;
      }
  
      // Update game data
      this.gameService.saveGame(game).subscribe();
    });
  }
}