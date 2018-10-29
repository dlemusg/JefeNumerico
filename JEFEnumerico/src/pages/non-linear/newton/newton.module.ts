import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewtonPage } from './newton';

@NgModule({
  declarations: [
    NewtonPage,
  ],
  imports: [
    IonicPageModule.forChild(NewtonPage),
  ],
})
export class NewtonPageModule {}
