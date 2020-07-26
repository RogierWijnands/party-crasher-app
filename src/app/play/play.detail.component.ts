import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'play-detail-component',
  templateUrl: 'play.detail.component.html'
})
export class PlayDetailComponent {
  constructor(
      private modalController: ModalController,
  ) {}

  public closeModal(data?: {[key: string]: any}): void {
      this.modalController.dismiss(data);
  }
}