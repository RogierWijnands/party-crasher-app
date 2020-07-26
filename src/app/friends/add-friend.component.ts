import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Friend } from '../shared/models/friend.model';
import { FriendsService } from '../shared/services/friends.service';

@Component({
  selector: 'add-friend-component',
  templateUrl: 'add-friend.component.html'
})
export class AddFriendComponent {
  public friend: Friend = new Friend();

  constructor(
      private modalController: ModalController,
      public friendService: FriendsService,
  ) {}

  public closeModal(): void {
      this.modalController.dismiss();
  }
}