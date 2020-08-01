import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Badge } from '@ionic-native/badge/ngx';
import { GameService } from './shared/services/game.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  private isInBackground: boolean = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private badge: Badge,
    private gameService: GameService,
    private localNotifications: LocalNotifications,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(true);
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      
      // Clear badges on app open
      this.badge.clear();
      // Check for active challenge on app open
      this.gameService.checkForActiveChallenge();

      this.localNotifications.on('trigger').subscribe(() => {
        if (!this.isInBackground) {
          // Clear badges on notification trigger
          this.badge.clear();
          // Check for active challenge on notification trigger
          this.gameService.checkForActiveChallenge();
        }
      });

      this.platform.resume.subscribe(() => {
        this.isInBackground = false;
        
        // Clear badges on app resume
        this.badge.clear()
        // Check for active challenge on app resume
        this.gameService.checkForActiveChallenge();
      });

      this.platform.pause.subscribe(() => {
        this.isInBackground = true;
      });
    });
  }
}
