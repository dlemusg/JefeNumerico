import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GraficadorPage } from './graficador';

@NgModule({
  declarations: [
    GraficadorPage,
  ],
  imports: [
    IonicPageModule.forChild(GraficadorPage),
  ],
})
export class GraficadorPageModule {}
