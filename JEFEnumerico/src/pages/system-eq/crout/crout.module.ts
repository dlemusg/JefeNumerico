import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CroutPage } from './crout';

@NgModule({
  declarations: [
    CroutPage,
  ],
  imports: [
    IonicPageModule.forChild(CroutPage),
  ],
})
export class CroutPageModule {}
