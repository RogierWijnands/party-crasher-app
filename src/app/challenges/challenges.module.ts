import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChallengesComponent } from './challenges.component';
import { ChallengesRoutingModule } from './challenges-routing.module';
import { HeaderModule } from "../header/header.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ChallengesRoutingModule,
    HeaderModule
  ],
  declarations: [ChallengesComponent]
})
export class ChallengesModule {}
