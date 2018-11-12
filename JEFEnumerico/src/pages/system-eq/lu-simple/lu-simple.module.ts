import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LuSimplePage } from './lu-simple';

@NgModule({
  declarations: [
    LuSimplePage,
  ],
  imports: [
    IonicPageModule.forChild(LuSimplePage),
  ],
})
export class LuSimplePageModule {}
