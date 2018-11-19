import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GaussSorPage } from './gauss-sor';

@NgModule({
  declarations: [
    GaussSorPage,
  ],
  imports: [
    IonicPageModule.forChild(GaussSorPage),
  ],
})
export class GaussSorPageModule {}
