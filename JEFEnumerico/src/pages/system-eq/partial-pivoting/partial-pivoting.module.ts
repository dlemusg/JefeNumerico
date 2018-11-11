import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PartialPivotingPage } from './partial-pivoting';

@NgModule({
  declarations: [
    PartialPivotingPage,
  ],
  imports: [
    IonicPageModule.forChild(PartialPivotingPage),
  ],
})
export class PartialPivotingPageModule {}
