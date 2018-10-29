import { FixedPointPage } from './../pages/non-linear/fixed-point/fixed-point';
import { IncrementalSearchPage } from './../pages/non-linear/incremental-search/incremental-search';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SystemEqPage } from '../pages/system-eq/system-eq';
import { InterpolationPage } from '../pages/interpolation/interpolation';
import { NonLinearPage } from '../pages/non-linear/non-linear';
import { BisectionPage } from './../pages/non-linear/bisection/bisection';
import { FalsePositionPage } from './../pages/non-linear/false-position/false-position';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpNonLinearProvider } from '../providers/http-non-linear/http-non-linear';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SystemEqPage,
    InterpolationPage,
    NonLinearPage,
    BisectionPage,
    FalsePositionPage,
    IncrementalSearchPage,
    FixedPointPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    NgxDatatableModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SystemEqPage,
    InterpolationPage,
    NonLinearPage,
    BisectionPage,
    FalsePositionPage,
    IncrementalSearchPage,
    FixedPointPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpNonLinearProvider
  ]
})
export class AppModule {}
