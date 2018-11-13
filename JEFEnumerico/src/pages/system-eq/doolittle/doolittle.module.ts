import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoolittlePage } from './doolittle';

@NgModule({
  declarations: [
    DoolittlePage,
  ],
  imports: [
    IonicPageModule.forChild(DoolittlePage),
  ],
})
export class DoolittlePageModule {}
