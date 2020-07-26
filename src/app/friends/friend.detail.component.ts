import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Friend } from '../shared/models/friend.model';
import { FriendsService } from '../shared/services/friends.service';

@Component({
  selector: 'add-friend-component',
  templateUrl: 'friend.detail.component.html'
})
export class FriendDetailComponent {
  @Input() public friend: Friend = new Friend();

  constructor(
      private modalController: ModalController,
      public friendService: FriendsService,
  ) {}

  public closeModal(data?: {[key: string]: any}): void {
      this.modalController.dismiss(data);
  }

  public save(): void {
    this.friendService.save(this.friend).subscribe(() => {
      this.closeModal({ 'saved': true });
    });
  }
}