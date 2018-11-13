import { LagrangePage } from './lagrange/lagrange';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-interpolation',
  templateUrl: 'interpolation.html',
})
export class InterpolationPage {

  constructor(public navCtrl: NavController,public alertCtrl: AlertController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InterpolationPage');
  }
  goLagrange(){
    this.navCtrl.push(LagrangePage);
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
