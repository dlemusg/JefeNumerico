import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LuPartialPage } from './lu-partial';

@NgModule({
  declarations: [
    LuPartialPage,
  ],
  imports: [
    IonicPageModule.forChild(LuPartialPage),
  ],
})
export class LuPartialPageModule {}
