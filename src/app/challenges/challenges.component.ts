import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddChallengeComponent } from './add-challenge.component';
import { ChallengeService } from '../shared/services/challenge.service';
import { Challenge } from '../shared/models/challenge.model';
import { ModalOptions } from '@ionic/core';

@Component({
  selector: 'challenges-component',
  templateUrl: 'challenges.component.html'
})
export class ChallengesComponent {
  public challenges: any[];

  constructor(
    private modalController: ModalController,
    public challengeService: ChallengeService,
  ) {}

  public async openModal(challenge?: Challenge) {
    const options: ModalOptions = {
      component: AddChallengeComponent,
      swipeToClose: true,
    };
    if (challenge) {
      options.componentProps = {challenge};
    }
    const modal = await this.modalController.create(options);
    return await modal.present();
  }

}
