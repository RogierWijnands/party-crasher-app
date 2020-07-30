import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'info-component',
    templateUrl: 'info.component.html'
})
export class InfoComponent {
    constructor(
        private modalController: ModalController,
    ) {}

    public closeModal(): void {
        this.modalController.dismiss();
    }
}