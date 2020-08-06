import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChallengeService } from '../shared/services/challenge.service';
import { Challenge } from '../shared/models/challenge.model';
import { ChallengeMode, ChallengeContent, ProgressItemStatus, MediaState } from '../shared/enum';
import { Game } from '../shared/models/game.model';
import { GameService } from '../shared/services/game.service';
import { ProgressItem } from '../shared/models/progress-item.model';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { getNavigatorLanguage } from '../lib/util/get-language';
import { Friend } from '../shared/models/friend.model';
import { shuffleArray } from '../lib/util/shuffle-array';

@Component({
  selector: 'challenge-detail-component',
  templateUrl: 'challenge.detail.component.html'
})
export class ChallengeDetailComponent implements OnInit {
  public readonly ChallengeContent = ChallengeContent;
  public readonly ChallengeMode = ChallengeMode;
  public readonly MediaState = MediaState;
  
  public ttsState: MediaState = MediaState.STOP;

  @Input() public mode: ChallengeMode = ChallengeMode.EDIT;
  @Input() public game: Game;
  @Input() public activeProgressItem: ProgressItem;

  public tempChallenge: Challenge = new Challenge();
  @Input('challenge') set challenge(_challenge: Challenge) {
    this.tempChallenge = new Challenge(_challenge);
  }

  constructor(
      private modalController: ModalController,
      private challengeService: ChallengeService,
      private gameService: GameService,
      private tts: TextToSpeech,
  ) {}

  public ngOnInit(): void {
    if (this.mode === ChallengeMode.PLAY) {
      this.playChallenge();
    }
  }

  public closeModal(data?: {[key: string]: any}): void {
    this.tts.speak('');
    this.modalController.dismiss(data);
  }

  public save(): void {
    this.challengeService.save(this.tempChallenge).subscribe(() => {
      this.closeModal({ 'saved': true });
    });
  }

  private playChallenge(): void {
    if (
      this.mode !== ChallengeMode.PLAY || 
      !(this.game instanceof Game) || 
      !this.game.challenges || 
      !this.game.challenges.length ||
      !(
        (this.game.players && this.game.players.length) ||
        (this.game.playersPassed && this.game.playersPassed.length)
      )
    ) {
      this.closeModal();
      this.gameService.quitGame().subscribe();
    } else {
      // Pick random challenge
    this.tempChallenge = new Challenge(this.game.challenges[Math.floor(Math.random() * this.game.challenges.length)]);
    // Remove randomly picked challenge from game
    this.game.challenges = this.game.challenges.filter(_challenge => _challenge.id !== this.tempChallenge.id);

    // Replace challenge player references with actual players
    let splitChallengeDesc = this.tempChallenge.description.split(ChallengeContent.PLAYER_REF);
    let challengeDesc = '';
    if (splitChallengeDesc.length > 1) {
      splitChallengeDesc.forEach((descPart, i) => {
        if (i !== splitChallengeDesc.length - 1) {
          // Check if a player is available, otherwise return all passed players not in current challenge back to players list in random order
          if ((!this.game.players || !this.game.players.length) && this.game.playersPassed && this.game.playersPassed.length) {
            this.game.playersPassed = this.game.playersPassed.filter((_player) => {
              if (challengeDesc.includes(_player.getFullName())) {
                return true; 
              } else {
                this.game.players.push(_player);
                return false;
              }
            });
            this.game.players = shuffleArray(this.game.players).map(_player => new Friend(_player));
          }
          // Pick first player
          const pickPlayer = (this.game.players) ? this.game.players.shift() : undefined;
          if (pickPlayer instanceof Friend) {
            // Move picked player to players passed list
            if (!this.game.playersPassed) this.game.playersPassed = [];
            this.game.playersPassed.push(pickPlayer);
            // Add player name to challenge description part
            descPart += `<strong>${pickPlayer.getFullName()}</strong>`; 
          } else {
            descPart += `<strong>No player available</strong>`;
          }
        }
        challengeDesc += descPart;
      });
      this.tempChallenge.description = challengeDesc;
    }

    // Set progress item done
    if (this.activeProgressItem) {
      const progressItemRef = this.game.progress.find(_progressItem => _progressItem.dateTime === this.activeProgressItem.dateTime);
      if (progressItemRef) {
        progressItemRef.status = ProgressItemStatus.DONE;
      }
    }

    // Update game data
    this.gameService.saveGame(this.game).subscribe();
    }
  }

  public playTTS(value: string): void {
    // Strip out HTML tags
    const tempEl = document.createElement('div');
    tempEl.innerHTML = value;
    const toRead = tempEl.innerText;

    // Stop reading before reading new value
    this.tts.speak('');
    this.ttsState = MediaState.PLAY;
    this.tts.speak({text: toRead, locale: getNavigatorLanguage()}).then(() => this.ttsState = MediaState.STOP);
  }

  public stopTTS(): void {
    this.tts.speak('');
    this.ttsState = MediaState.STOP;
  }
}