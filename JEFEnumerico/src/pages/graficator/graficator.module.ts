import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GraficatorPage } from './graficator';

@NgModule({
  declarations: [
    GraficatorPage,
  ],
  imports: [
    IonicPageModule.forChild(GraficatorPage),
  ],
})
export class GraficatorPageModule {}
