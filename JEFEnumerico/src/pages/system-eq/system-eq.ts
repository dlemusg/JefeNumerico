import { LuSimplePage } from './lu-simple/lu-simple';
import { PartialPivotingPage } from './partial-pivoting/partial-pivoting';
import { GaussSimplePage } from './gauss-simple/gauss-simple';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TotalPivotingPage } from './total-pivoting/total-pivoting';

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
