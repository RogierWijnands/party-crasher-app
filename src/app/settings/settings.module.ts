import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { HeaderModule } from '../header/header.module';
import { SettingsComponentRoutingModule } from './settings-routing.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        SettingsComponentRoutingModule,
        HeaderModule,
    ],
    declarations: [
        SettingsComponent,
    ]
})
export class SettingsModule {}
