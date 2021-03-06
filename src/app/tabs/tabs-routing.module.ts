import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsComponent } from './tabs.component';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsComponent,
    children: [
      {
        path: 'play',
        loadChildren: () => import('../play/play.module').then(m => m.PlayModule),
      },
      {
        path: 'challenges',
        loadChildren: () => import('../challenges/challenges.module').then(m => m.ChallengesModule)
      },
      {
        path: 'friends',
        loadChildren: () => import('../friends/friends.module').then(m => m.FriendsModule)
      },
      {
        path: '',
        redirectTo: '/tabs/play',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/play',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsComponentRoutingModule {}
