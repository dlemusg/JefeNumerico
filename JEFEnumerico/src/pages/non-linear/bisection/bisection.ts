import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-bisection',
  templateUrl: 'bisection.html',
})
export class BisectionPage {

  private dataSubmit = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.dataSubmit['fx'] = '';
    this.dataSubmit['xa'] = '';
    this.dataSubmit['xb'] = '';
    this.dataSubmit['nIters'] = '';
    this.dataSubmit['tole'] = '';
    this.dataSubmit['tipo_error'] = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BisectionPage');
  }

  submitForm() {
    console.log(this.dataSubmit);
    //Verificar si son campos vacios
    if (this.dataSubmit['fx'] == '') {
      this.showAlert("ERROR:", "The field f(x) can not be empty");
    } else if (this.dataSubmit['xa'] == '') {
      this.showAlert("ERROR:", "The field xa can not be empty");
    } else if (this.dataSubmit['xb'] == '') {
      this.showAlert("ERROR:", "The field xa can not be empty.");
    } else if (this.dataSubmit['tole'] == '') {
      this.showAlert("ERROR:", "The xb field can not be empty");
    } else if (this.dataSubmit['nIters'] == '') {
      this.showAlert("ERROR:", "The field No. Iters can not be empty");
    } else if (this.dataSubmit['tipo_error'] == '') {
      this.showAlert("ERROR:", "The Error Type field can not be empty");
    } else {
      //this.contentTable = [];
      //this.postServer();
    }
  }

  ayuda() {
    let alert = this.alertCtrl.create({
      title: 'Consejos!',
      subTitle: ` <ul>
                    <li> f (x) must be a continuous function </ li>
                    <br> <br>
                    <li> To find an adequate interval [a, b] help yourself with incremental searches </ li>
                    <br> <br>
                    <li> There is a single root if it is true that f is continuous in [a, b], f (a) * f (b) <0, f is differentiable in (a, b) and f '(x) does not change sign for all x that belongs [a, b] </ li>
                    <br> <br>
                    <li> The elevation for the absolute error in each stage is En = (In - 1) / 2 </ li>
                    <br> <br>
                  </ ul> `
      buttons: ['OK']
    });
    alert.present();
  }

  showAlert(error, subtitle) {
    let alert = this.alertCtrl.create({
      title: error,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }

}