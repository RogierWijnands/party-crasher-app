import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'add-challenge-component',
  templateUrl: 'add-challenge.component.html'
})
export class AddChallengeComponent {

  constructor(
      private modalController: ModalController,
  ) {}

  public closeModal(): void {
      this.modalController.dismiss();
  }

}