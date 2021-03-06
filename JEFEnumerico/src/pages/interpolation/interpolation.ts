import { NewtonDivPage } from './newton-div/newton-div';
import { CubicPage } from './cubic/cubic';
import { QuadraticPage } from './quadratic/quadratic';
import { LinearPage } from './linear/linear';
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
  goLinear(){
    this.navCtrl.push(LinearPage);
  }

  goQuadratic(){
    this.navCtrl.push(QuadraticPage);
  }

  goCubic(){
    this.navCtrl.push(CubicPage);
  }

  goNewton(){
    this.navCtrl.push(NewtonDivPage);
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
