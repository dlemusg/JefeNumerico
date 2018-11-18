import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuadraticPage } from './quadratic';

@NgModule({
  declarations: [
    QuadraticPage,
  ],
  imports: [
    IonicPageModule.forChild(QuadraticPage),
  ],
})
export class QuadraticPageModule {}
