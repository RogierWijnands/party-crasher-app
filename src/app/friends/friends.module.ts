import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FriendsComponent } from './friends.component';
import { AddFriendComponent } from './add-friend.component';

import { FriendsRoutingModule } from './friends-routing.module'
import { HeaderModule } from "../header/header.module";

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: FriendsComponent}]),
        FriendsRoutingModule,
        HeaderModule,
    ],
  declarations: [
    FriendsComponent,
    AddFriendComponent,
  ]
})
export class FriendsModule {}
