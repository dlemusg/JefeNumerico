import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BisectionPage } from './bisection';

@NgModule({
  declarations: [
    BisectionPage,
  ],
  imports: [
    IonicPageModule.forChild(BisectionPage),
  ],
})
export class BisectionPageModule {}
