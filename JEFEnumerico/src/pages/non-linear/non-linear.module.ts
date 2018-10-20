import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NonLinearPage } from './non-linear';

@NgModule({
  declarations: [
    NonLinearPage,
  ],
  imports: [
    IonicPageModule.forChild(NonLinearPage),
  ],
})
export class NonLinearPageModule {}
