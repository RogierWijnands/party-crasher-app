import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'add-friend-component',
  templateUrl: 'add-friend.component.html'
})
export class AddFriendComponent {

  constructor(
      private modalController: ModalController,
  ) {}

  public closeModal(): void {
      this.modalController.dismiss();
  }

}