import { Component } from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { NotificationType, ChallengeMode } from './shared/enum';
import { ChallengeDetailComponent } from './challenges/challenge.detail.component';
import { ModalOptions } from '@ionic/core';
import { Badge } from '@ionic-native/badge/ngx';

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
    private modalController: ModalController,
    private badge: Badge,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(true);
      this.statusBar.styleLightContent();
      this.splashScreen.hide();

      // Handle open challenge on notification click
      this.localNotifications.on('click').subscribe(notification => {
        alert('test');
        this.badge.clear();
        if (notification.data && notification.data.notificationType === NotificationType.CHALLENGE) {
          this.openChallengeModal();
        }
      });
    });
  }

  private async openChallengeModal() {
    const options: ModalOptions = {
      component: ChallengeDetailComponent,
      swipeToClose: true,
      componentProps: {
        mode: ChallengeMode.PLAY,
      }
    };
    const modal = await this.modalController.create(options);
    await modal.present();
  }
}
