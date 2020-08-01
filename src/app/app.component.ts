import { Component } from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import * as moment from 'moment';
import { NotificationData } from './shared/interfaces';
import { NotificationType, ChallengeMode } from './shared/enum';
import { GameService } from './shared/services/game.service';
import { Game } from './shared/models/game.model';
import { ModalOptions } from '@ionic/core';
import { ChallengeDetailComponent } from './challenges/challenge.detail.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private localNotifications: LocalNotifications,
    private gameService: GameService,
    private modalController: ModalController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(true);
      this.statusBar.styleLightContent();
      this.splashScreen.hide();

      // Handle open challenge on notification click
      this.localNotifications.on('click').subscribe(async notification => {
        if (notification.data && notification.data.notificationType === NotificationType.CHALLENGE && notification.data.game) {
          const options: ModalOptions = {
            component: ChallengeDetailComponent,
            swipeToClose: true,
            componentProps: {
              game: new Game(notification.data.game),
              mode: ChallengeMode.PLAY,
            }
          };
          const modal = await this.modalController.create(options);
          await modal.present();
        }
      });
    });
  }
}
