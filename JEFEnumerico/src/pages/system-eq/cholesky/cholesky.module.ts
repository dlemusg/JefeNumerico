import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CholeskyPage } from './cholesky';

@NgModule({
  declarations: [
    CholeskyPage,
  ],
  imports: [
    IonicPageModule.forChild(CholeskyPage),
  ],
})
export class CholeskyPageModule {}
