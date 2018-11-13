import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LagrangePage } from './lagrange';

@NgModule({
  declarations: [
    LagrangePage,
  ],
  imports: [
    IonicPageModule.forChild(LagrangePage),
  ],
})
export class LagrangePageModule {}
