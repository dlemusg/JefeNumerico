import { CubicPage } from './../pages/interpolation/cubic/cubic';
import { QuadraticPage } from './../pages/interpolation/quadratic/quadratic';
import { LinearPage } from './../pages/interpolation/linear/linear';
import { JacobiPage } from './../pages/system-eq/jacobi/jacobi';
import { CholeskyPage } from './../pages/system-eq/cholesky/cholesky';
import { CroutPage } from './../pages/system-eq/crout/crout';
import { DoolittlePage } from './../pages/system-eq/doolittle/doolittle';
import { GraficadorPage } from './../pages/graficador/graficador';
import { LuSimplePage } from './../pages/system-eq/lu-simple/lu-simple';
import { PartialPivotingPage } from './../pages/system-eq/partial-pivoting/partial-pivoting';
import { MultipleRootsPage } from './../pages/non-linear/multiple-roots/multiple-roots';
import { SecantPage } from './../pages/non-linear/secant/secant';
import { NewtonPage } from './../pages/non-linear/newton/newton';
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
import { GaussSimplePage } from '../pages/system-eq/gauss-simple/gauss-simple';
import { TotalPivotingPage } from '../pages/system-eq/total-pivoting/total-pivoting';
import { LuPartialPage } from '../pages/system-eq/lu-partial/lu-partial';
import { LagrangePage } from '../pages/interpolation/lagrange/lagrange';


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
    FixedPointPage,
    NewtonPage,
    SecantPage,
    MultipleRootsPage,
    GaussSimplePage,
    PartialPivotingPage,
    TotalPivotingPage,
    LuSimplePage,
    GraficadorPage,
    LuPartialPage,
    DoolittlePage,
    CroutPage,
    CholeskyPage,
    JacobiPage,
    LagrangePage,
    LinearPage,
    QuadraticPage,
    CubicPage
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
    FixedPointPage,
    NewtonPage,
    SecantPage,
    MultipleRootsPage,
    GaussSimplePage,
    PartialPivotingPage,
    TotalPivotingPage,
    LuSimplePage,
    GraficadorPage,
    LuPartialPage,
    DoolittlePage,
    CroutPage,
    CholeskyPage,
    JacobiPage,
    LagrangePage,
    LinearPage,
    QuadraticPage,
    CubicPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpNonLinearProvider
  ]
})
export class AppModule {}
