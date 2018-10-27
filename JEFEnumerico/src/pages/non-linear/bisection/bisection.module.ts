import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BisectionPage } from './bisection';
import { NgxDatatableModule } from '@swimlane/ngx-datatable'

@NgModule({
  declarations: [
    BisectionPage,
  ],
  imports: [
    IonicPageModule.forChild(BisectionPage),
    NgxDatatableModule
  ],
})
export class BisectionPageModule {}
