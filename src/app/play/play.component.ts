import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalOptions } from '@ionic/core';
import { PlayDetailComponent } from './play.detail.component';
import { GameMode } from '../shared/enum';
import { GameService } from '../shared/services/game.service';

@Component({
  selector: 'play-component',
  templateUrl: 'play.component.html',
})
export class PlayComponent {
  public readonly GameMode = GameMode;
  public title: string;

  constructor(
    private modalController: ModalController,
    public gameService: GameService,
  ) {}

  public async openModal() {
    const options: ModalOptions = {
      component: PlayDetailComponent,
      swipeToClose: true,
    };
    const modal = await this.modalController.create(options);
    await modal.present();
  }
}
