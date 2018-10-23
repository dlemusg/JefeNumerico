import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpNonLinearProvider } from './../../../providers/http-non-linear/http-non-linear';


@IonicPage()
@Component({
  selector: 'page-bisection',
  templateUrl: 'bisection.html',
})
export class BisectionPage {

  private apiUrl = 'http://dlemusg.pythonanywhere.com/bisection';

  private dataSubmit = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public HttpNonLinearProvider: HttpNonLinearProvider) {
    this.dataSubmit['f'] = '';
    this.dataSubmit['xi'] = '';
    this.dataSubmit['xs'] = '';
    this.dataSubmit['tolerancia'] = '';
    this.dataSubmit['niteraciones'] = '';
    this.dataSubmit['tipoError'] = '';
    this.dataSubmit['tipoError'] = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BisectionPage');
  }

  submitForm() {
    //Verificar si son campos vacios
    if (this.dataSubmit['f'] == '') {
      this.showAlert("ERROR:", "The field f(x) can not be empty");
    } else if (this.dataSubmit['xi'] == '') {
      this.showAlert("ERROR:", "The field xa can not be empty");
    } else if (this.dataSubmit['xs'] == '') {
      this.showAlert("ERROR:", "The field xa can not be empty.");
    } else if (this.dataSubmit['tolerancia'] == '') {
      this.showAlert("ERROR:", "The xb field can not be empty");
    } else if (this.dataSubmit['niteraciones'] == '') {
      this.showAlert("ERROR:", "The field No. Iters can not be empty");
    } else if (this.dataSubmit['tipoError'] == '') {
      this.showAlert("ERROR:", "The Error Type field can not be empty");
    } else {
      this.postServer();
    }
  }

  ayuda() {
    let alert = this.alertCtrl.create({
      title: 'Help!',
      subTitle: ` <ul>
                    <li> f (x) must be a continuous function </ li>
                    <br> <br>
                    <li> To find an adequate interval [a, b] help yourself with incremental searches </ li>
                    <br> <br>
                    <li> There is a single root if it is true that f is continuous in [a, b], f (a) * f (b) <0, f is differentiable in (a, b) and f '(x) does not change sign for all x that belongs [a, b] </ li>
                    <br> <br>
                    <li> The elevation for the absolute error in each stage is En = (In - 1) / 2 </ li>
                    <br> <br>
                  </ ul> `,
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

  postServer() {
    console.log(this.dataSubmit);
    this.HttpNonLinearProvider.post(this.dataSubmit, this.apiUrl)
      .then(result => {
        this.dataReceivedPost = result;
      }, (err) => {
        console.log(err);
      });
  }

  getServer() {
    console.log("entre al log");
    this.HttpNonLinearProvider.get(this.apiUrl)
      .then(data => {
        this.dataReceivedPost = data;
        console.log(data);
      }, (err) => {
        console.log(err);
      });
  }

}