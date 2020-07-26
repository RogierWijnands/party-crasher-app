import { Component, OnInit } from '@angular/core';
import { Friend } from '../shared/models/friend.model';
import { ModalController } from '@ionic/angular';
import { AddFriendComponent } from './add-friend.component';

@Component({
  selector: 'friends-component',
  templateUrl: 'friends.component.html'
})
export class FriendsComponent implements OnInit {
  public friends: Friend[];

  constructor(
    private modalController: ModalController
  ) {}

  ngOnInit() {
    
  }

  public async openModal() {
    const modal = await this.modalController.create({
      component: AddFriendComponent,
      swipeToClose: true,
    });
    return await modal.present();
  }

  
}
