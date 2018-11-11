import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GaussSimplePage } from './gauss-simple';

@NgModule({
  declarations: [
    GaussSimplePage,
  ],
  imports: [
    IonicPageModule.forChild(GaussSimplePage),
  ],
})
export class GaussSimplePageModule {}
