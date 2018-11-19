import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewtonDivPage } from './newton-div';

@NgModule({
  declarations: [
    NewtonDivPage,
  ],
  imports: [
    IonicPageModule.forChild(NewtonDivPage),
  ],
})
export class NewtonDivPageModule {}
