import { GaussSimplePage } from './gauss-simple/gauss-simple';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the SystemEqPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
