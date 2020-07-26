import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Friend } from '../shared/models/friend.model';
import { FriendsService } from '../shared/services/friends.service';

@Component({
  selector: 'add-friend-component',
  templateUrl: 'friend.detail.component.html'
})
export class FriendDetailComponent {
  public tempFriend: Friend = new Friend();
  @Input('friend') set friend(_friend: Friend) {
    this.tempFriend = new Friend(_friend);
  }

  constructor(
      private modalController: ModalController,
      public friendService: FriendsService,
  ) {}

  public closeModal(data?: {[key: string]: any}): void {
      this.modalController.dismiss(data);
  }

  public save(): void {
    this.friendService.save(this.tempFriend).subscribe(() => {
      this.closeModal({ 'saved': true });
    });
  }
}