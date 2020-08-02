import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ModalOptions } from '@ionic/core';
import { PlayDetailComponent } from './play.detail.component';
import { GameService } from '../shared/services/game.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Game } from '../shared/models/game.model';
import * as moment from 'moment';

@Component({
  selector: 'play-component',
  templateUrl: 'play.component.html',
})
export class PlayComponent {
  public readonly moment = moment;
  public title: string;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    public domSanitize: DomSanitizer,
    public gameService: GameService,
  ) {}

  public async openModal(game?: Game) {
    const options: ModalOptions = {
      component: PlayDetailComponent,
      swipeToClose: true,
    };
    if (game) {
      options.componentProps = {game};
    }
    const modal = await this.modalController.create(options);
    await modal.present();
  }

  public async quitParty(game: Game) {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: moment(game.startDateTime).isAfter(moment()) 
      ? `Are you sure you want to cancel <strong>${game.title}</strong>? It hasn't even started yet...`
      : `Are you sure you want to quit <strong>${game.title}</strong>? It's still early...`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Quit',
          handler: () => {
            this.gameService.quitGame().subscribe();
          }
        }
      ]
    });

    await alert.present();
  }
}
