import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChallengeService } from '../shared/services/challenge.service';
import { Challenge } from '../shared/models/challenge.model';

@Component({
  selector: 'challenge-detail-component',
  templateUrl: 'challenge.detail.component.html'
})
export class ChallengeDetailComponent {
  @Input() public challenge: Challenge = new Challenge();

  constructor(
      private modalController: ModalController,
      private challengeService: ChallengeService,
  ) {}

  public closeModal(data?: {[key: string]: any}): void {
      this.modalController.dismiss(data);
  }

  public save(): void {
    this.challengeService.save(this.challenge).subscribe(() => {
      this.closeModal({ 'saved': true });
    });
  }

}