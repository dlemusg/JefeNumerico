import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IncrementalSearchPage } from './incremental-search';

@NgModule({
  declarations: [
    IncrementalSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(IncrementalSearchPage),
  ],
})
export class IncrementalSearchPageModule {}
