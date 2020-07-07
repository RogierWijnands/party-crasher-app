import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlayComponent } from './play.component';

import { PlayComponentRoutingModule } from './play-routing.module';
import { HeaderModule } from "../header/header.module";

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        PlayComponentRoutingModule,
        HeaderModule
    ],
  declarations: [PlayComponent]
})
export class PlayModule {}
