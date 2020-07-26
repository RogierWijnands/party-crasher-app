import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChallengeService } from '../shared/services/challenge.service';
import { Challenge } from '../shared/models/challenge.model';

@Component({
  selector: 'challenge-detail-component',
  templateUrl: 'challenge.detail.component.html'
})
export class ChallengeDetailComponent {
  public tempChallenge: Challenge = new Challenge();
  @Input('challenge') set challenge(_challenge: Challenge) {
    this.tempChallenge = new Challenge(_challenge);
  }

  constructor(
      private modalController: ModalController,
      private challengeService: ChallengeService,
  ) {}

  public closeModal(data?: {[key: string]: any}): void {
      this.modalController.dismiss(data);
  }

  public save(): void {
    this.challengeService.save(this.tempChallenge).subscribe(() => {
      this.closeModal({ 'saved': true });
    });
  }

}