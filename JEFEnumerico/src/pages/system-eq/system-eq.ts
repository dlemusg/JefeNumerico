import { JacobiPage } from './jacobi/jacobi';
import { CholeskyPage } from './cholesky/cholesky';
import { CroutPage } from './crout/crout';
import { DoolittlePage } from './doolittle/doolittle';
import { LuSimplePage } from './lu-simple/lu-simple';
import { PartialPivotingPage } from './partial-pivoting/partial-pivoting';
import { GaussSimplePage } from './gauss-simple/gauss-simple';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TotalPivotingPage } from './total-pivoting/total-pivoting';
import { LuPartialPage } from './lu-partial/lu-partial';

@IonicPage()
@Component({
  selector: 'page-system-eq',
  templateUrl: 'system-eq.html',
})
export class SystemEqPage {

  constructor(public navCtrl: NavController,public alertCtrl: AlertController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SystemEqPage');
  }

  goGaussSimple(){
    this.navCtrl.push(GaussSimplePage);
  }

  goPartialPivoting(){
    this.navCtrl.push(PartialPivotingPage);
  }

  goTotalPivoting(){
    this.navCtrl.push(TotalPivotingPage);
  }

  goLuSimple(){
    this.navCtrl.push(LuSimplePage);
  }

  goLuPartial(){
    this.navCtrl.push(LuPartialPage);
  }

  goDoolittle(){
    this.navCtrl.push(DoolittlePage);
  }

  goCrout(){
    this.navCtrl.push(CroutPage);
  }

  goCholesky(){
    this.navCtrl.push(CholeskyPage);
  }

  goJacobi(){
    this.navCtrl.push(JacobiPage);
  }


  showAlert(error, subtitle) {
    let alert = this.alertCtrl.create({
      title: error,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }

  noDefined(){
    this.showAlert("ERROR: ", "No defined")
  }


}
