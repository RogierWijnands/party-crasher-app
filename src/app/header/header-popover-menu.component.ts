import { Component } from '@angular/core';
import { InfoComponent } from '../info/info.component';
import { ModalController } from '@ionic/angular';
import { ModalOptions } from '@ionic/core';
import { SettingsComponent } from '../settings/settings.component';

@Component({
    selector: 'header-popover-menu-component',
    templateUrl: 'header-popover-menu.component.html'
})
export class HeaderPopoverMenuComponent {
    constructor(
        private modalController: ModalController,
    ) {}

    public async openInfoModal() {
        const options: ModalOptions = {
          component: InfoComponent,
          swipeToClose: true,
        };
        const modal = await this.modalController.create(options);
        await modal.present();
      }
      
    public async openSettingsModal() {
      const options: ModalOptions = {
        component: SettingsComponent,
        swipeToClose: true,
      };
      const modal = await this.modalController.create(options);
      await modal.present();
    }  
}