import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SecantPage } from './secant';

@NgModule({
  declarations: [
    SecantPage,
  ],
  imports: [
    IonicPageModule.forChild(SecantPage),
  ],
})
export class SecantPageModule {}
