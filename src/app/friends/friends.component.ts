import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
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
    private alertController: AlertController,
    private friendsService: FriendsService,
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  private fetchData(): void {
    this.friendsService.getAll().subscribe((data) => {
      this.friends = data;
    });
  }

  public async promptDelete(friend: Friend) {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: `Are you sure you want to delete <strong>${friend.getFullName()}</strong>?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Delete',
          handler: () => {
            this.delete(friend);
          }
        }
      ]
    });

    await alert.present();
  }

  private delete(friend: Friend): void {
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
      this.onItemSaved();
    }
  }

  private onItemSaved(): void {
    this.fetchData();
  }
  
}
