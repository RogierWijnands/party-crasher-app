import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddChallengeComponent } from './add-challenge.component';

@Component({
  selector: 'challenges-component',
  templateUrl: 'challenges.component.html'
})
export class ChallengesComponent {
  public challenges: any[];

  constructor(
    private modalController: ModalController,
  ) {}

  public async openModal() {
    const modal = await this.modalController.create({
      component: AddChallengeComponent,
      swipeToClose: true,
    });
    return await modal.present();
  }

}
