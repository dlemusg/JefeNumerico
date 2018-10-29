import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FixedPointPage } from './fixed-point';

@NgModule({
  declarations: [
    FixedPointPage,
  ],
  imports: [
    IonicPageModule.forChild(FixedPointPage),
  ],
})
export class FixedPointPageModule {}
