import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalOptions } from '@ionic/core';
import { PlayDetailComponent } from './play.detail.component';

@Component({
  selector: 'play-component',
  templateUrl: 'play.component.html',
})
export class PlayComponent {
  public title: string;

  constructor(
    private modalController: ModalController,
  ) {}

  public async openModal() {
    const options: ModalOptions = {
      component: PlayDetailComponent,
      swipeToClose: true,
    };
    const modal = await this.modalController.create(options);
    await modal.present();

    const {data} = await modal.onWillDismiss();
    if (data?.saved) {
      this.onModalClose();
    }
  }

  private onModalClose(): void {
  }
}
