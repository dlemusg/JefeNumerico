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

  private dataReceivedPost = {};

  private sentData = {}

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public HttpNonLinearProvider: HttpNonLinearProvider) {
    this.dataSubmit['f'] = '';
    this.dataSubmit['xi'] = '';
    this.dataSubmit['xs'] = '';
    this.dataSubmit['tolerancia'] = '';
    this.dataSubmit['niteraciones'] = '';
    this.dataSubmit['tipoError'] = '';
    this.dataSubmit['"tipoError"'] = '';
    this.dataSubmit["tipoError"] = '';
    this.sentData = {}
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
    this.sentData = { "f"           : this.dataSubmit['f'],
                      "xi"          : this.dataSubmit['xi'],
                      "xs"          : this.dataSubmit['xs'],
                      "tolerancia"  : this.dataSubmit['tolerancia'],
                      "niteraciones": this.dataSubmit['niteraciones'],
                      "tipoError"   : this.dataSubmit['tipoError'] 
                    };
    
    console.log(this.sentData);
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
    this.HttpNonLinearProvider.post(this.sentData, this.apiUrl)
      .then(result => {
        this.dataReceivedPost = result;
        console.log(this.dataReceivedPost);
      }, (err) => {
        console.log(err);
      });
  }

}