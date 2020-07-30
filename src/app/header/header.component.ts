import { Component } from "@angular/core";
import { HeaderBaseComponent } from "./header-base.component";
import { ActivatedRoute, Router } from "@angular/router";
import { PopoverController } from '@ionic/angular';
import { HeaderPopoverMenuComponent } from './header-popover-menu.component';

@Component({
    selector: 'header-component',
    templateUrl: 'header.component.html'
})

export class HeaderComponent extends HeaderBaseComponent {
    constructor(
        router: Router,
        activatedRoute: ActivatedRoute,
        private popoverController: PopoverController,
    ) {
        super(router, activatedRoute);
    }

    async showPopoverMenu(ev: any) {
        const popover = await this.popoverController.create({
          component: HeaderPopoverMenuComponent,
          event: ev,
          cssClass: 'primary-popover',
        });
        return await popover.present();
      }
}