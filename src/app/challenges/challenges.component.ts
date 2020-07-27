import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ChallengeDetailComponent } from './challenge.detail.component';
import { ChallengeService } from '../shared/services/challenge.service';
import { Challenge } from '../shared/models/challenge.model';
import { ModalOptions } from '@ionic/core';

@Component({
  selector: 'challenges-component',
  templateUrl: 'challenges.component.html'
})
export class ChallengesComponent implements OnInit {
  public challenges: Challenge[];

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private challengeService: ChallengeService,
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  private fetchData(): void {
    this.challengeService.getAll().subscribe((data) => {
      this.challenges = data;
    });
  }

  public async promptDelete(challenge: Challenge) {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: `Are you sure you want to delete <strong>${challenge.title}</strong>?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Delete',
          handler: () => {
            this.delete(challenge);
          }
        }
      ]
    });

    await alert.present();
  }

  private delete(challenge: Challenge): void {
    this.challengeService.delete(challenge).subscribe((data) => {
      this.fetchData();
    });
  }

  public async openModal(challenge?: Challenge) {
    const options: ModalOptions = {
      component: ChallengeDetailComponent,
      swipeToClose: true,
    };
    if (challenge) {
      options.componentProps = {challenge};
    }
    const modal = await this.modalController.create(options);
    await modal.present();

    const {data} = await modal.onWillDismiss();
    if (data?.saved) {
      this.onItemSaved();
    }
  }

  private onItemSaved(): void {
    this.fetchData();
  }

}
