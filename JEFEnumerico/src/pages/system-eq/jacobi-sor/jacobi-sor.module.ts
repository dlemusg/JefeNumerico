import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JacobiSorPage } from './jacobi-sor';

@NgModule({
  declarations: [
    JacobiSorPage,
  ],
  imports: [
    IonicPageModule.forChild(JacobiSorPage),
  ],
})
export class JacobiSorPageModule {}
