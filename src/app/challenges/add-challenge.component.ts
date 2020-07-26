import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChallengeService } from '../shared/services/challenge.service';
import { Challenge } from '../shared/models/challenge.model';

@Component({
  selector: 'add-challenge-component',
  templateUrl: 'add-challenge.component.html'
})
export class AddChallengeComponent {
  @Input() public challenge: Challenge = new Challenge();

  constructor(
      private modalController: ModalController,
      public challengeService: ChallengeService,
  ) {}

  public closeModal(): void {
      this.modalController.dismiss();
  }

}