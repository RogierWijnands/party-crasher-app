import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { DatabaseService } from '../shared/services/database.service';
import { LoggerService } from '../shared/services/log.service';

@Component({
    selector: 'settings-component',
    templateUrl: 'settings.component.html'
})
export class SettingsComponent {
    private importFile: File;

    constructor(
        private modalController: ModalController,
        private alertController: AlertController,
        private databaseService: DatabaseService,
        private logger: LoggerService,
    ) {}

    public closeModal(): void {
        this.modalController.dismiss();
    }

    public exportBackup(): void {
        this.databaseService.exportDatabase().subscribe();
    }

    public setImportFile(event): void {
        this.importFile = event.target.files[0];
    }

    public async promptImportBackup() {
        const alert = await this.alertController.create({
          header: 'Confirm',
          message: `Importing a backup will wipe all current data. Are you sure?`,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
            }, {
              text: 'Import',
              handler: () => {
                this.importBackup();
              }
            }
          ]
        });
        await alert.present();
      }

    public importBackup(): void {
        if (!this.importFile) {
            this.logger.error('No import file selected');
            return;
        }

        if (this.importFile.type.toLowerCase() !== 'application/json') {
            this.logger.error('File type should be of type .json');
            return;
        }

        // Cordova FileReader polyfill workaround (onload otherwise won't work on mobile)
        let fr = new FileReader(); 
        let rfr = (fr as any)._realReader;
        FileReader = rfr.constructor;

        const reader = new FileReader();
        reader.onload = (event) => {
            this.databaseService.importDatabase(event.target.result).subscribe(() => {
                window.location.reload();
            });
        }
        reader.readAsText(this.importFile, 'UTF-8');
    }
}