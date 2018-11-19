import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GaussPage } from './gauss';

@NgModule({
  declarations: [
    GaussPage,
  ],
  imports: [
    IonicPageModule.forChild(GaussPage),
  ],
})
export class GaussPageModule {}
