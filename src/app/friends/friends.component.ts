import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddFriendComponent } from './add-friend.component';
import { FriendsService } from '../shared/services/friends.service';
import { Friend } from '../shared/models/friend.model';
import { ModalOptions } from '@ionic/core';

@Component({
  selector: 'friends-component',
  templateUrl: 'friends.component.html'
})
export class FriendsComponent implements OnInit {
  constructor(
    private modalController: ModalController,
    public friendsService: FriendsService,
  ) {}

  ngOnInit() {
    this.friendsService.getAll();
  }

  public async openModal(friend?: Friend) {
    const options: ModalOptions = {
      component: AddFriendComponent,
      swipeToClose: true,
    };
    if (friend) {
      options.componentProps = {friend};
    }
    const modal = await this.modalController.create(options);
    return await modal.present();
  }

  
}
