import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './info.component';
import { HeaderModule } from '../header/header.module';
import { InfoComponentRoutingModule } from './info-routing.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        InfoComponentRoutingModule,
        HeaderModule,
    ],
    declarations: [
        InfoComponent,
    ]
})
export class InfoModule {}
