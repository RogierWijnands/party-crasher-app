import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayComponent } from './play.component';

const routes: Routes = [
  {
    path: '',
    component: PlayComponent,
    data: {
      title: 'Party Time!',
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayComponentRoutingModule {}
