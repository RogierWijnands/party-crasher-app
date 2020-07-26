import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FriendDetailComponent } from './friend.detail.component';
import { FriendsService } from '../shared/services/friends.service';
import { Friend } from '../shared/models/friend.model';
import { ModalOptions } from '@ionic/core';

@Component({
  selector: 'friends-component',
  templateUrl: 'friends.component.html'
})
export class FriendsComponent implements OnInit {
  public friends: Friend[];

  constructor(
    private modalController: ModalController,
    public friendsService: FriendsService,
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  private fetchData(): void {
    this.friendsService.getAll().subscribe((data) => {
      this.friends = data;
    });
  }

  public delete(friend: Friend): void {
    this.friendsService.delete(friend).subscribe((data) => {
      this.fetchData();
    });
  }

  public async openModal(friend?: Friend) {
    const options: ModalOptions = {
      component: FriendDetailComponent,
      swipeToClose: true,
    };
    if (friend) {
      options.componentProps = {friend};
    }
    const modal = await this.modalController.create(options);
    await modal.present();

    const {data} = await modal.onWillDismiss();
    if (data?.saved) {
      this.onModalClose();
    }
  }

  private onModalClose(): void {
    this.fetchData();
  }
  
}
