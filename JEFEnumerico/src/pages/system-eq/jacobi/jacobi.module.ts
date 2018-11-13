import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JacobiPage } from './jacobi';

@NgModule({
  declarations: [
    JacobiPage,
  ],
  imports: [
    IonicPageModule.forChild(JacobiPage),
  ],
})
export class JacobiPageModule {}
