import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CubicPage } from './cubic';

@NgModule({
  declarations: [
    CubicPage,
  ],
  imports: [
    IonicPageModule.forChild(CubicPage),
  ],
})
export class CubicPageModule {}
