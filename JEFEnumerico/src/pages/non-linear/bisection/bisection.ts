import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpNonLinearProvider } from './../../../providers/http-non-linear/http-non-linear';


@IonicPage()
@Component({
  selector: 'page-bisection',
  templateUrl: 'bisection.html',
})
export class BisectionPage {
  private rows =[];
  private table;
  private apiUrl;
  private dataSubmit = {};
  private dataRecived = {}
  private temp = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public HttpNonLinearProvider: HttpNonLinearProvider) {
    this.dataSubmit['f'] = '';
    this.dataSubmit['xi'] = '';
    this.dataSubmit['xs'] = '';
    this.dataSubmit['tolerancia'] = '';
    this.dataSubmit['niteraciones'] = '';
    this.dataSubmit['tipoError'] = '';

    this.dataRecived['n'] = '';
    this.dataRecived['xi']= '';
    this.dataRecived['xs'] = '';
    this.dataRecived['xm']= '';
    this.dataRecived['f'] = '';
    this.dataRecived['error'] = '';

    this.apiUrl = 'http://dlemusg.pythonanywhere.com/bisection';
    this.table = true;
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
  graficator(){
    console.log("falta implementarme");
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

  tableComplete(){
    this.table = false;//people can see the table
    var i;
    console.log(this.dataRecived);
    for (i = 0; i < this.dataRecived.n.length; i++) {
      var json = {
        "n"     : this.dataRecived.n[i],
        "xi"    : this.dataRecived.xi[i],
        "xs"    : this.dataRecived.xs[i],
        "xm"    : this.dataRecived.xm[i],
        "fx"     : this.dataRecived.fxm[i],
        "error" : this.dataRecived.error[i],
      };
      this.rows.push(json);
      this.rows = [...this.rows];
    } 
    this.rows = [...this.rows];
    console.log(this.rows);
  }

  postServer() {
    this.HttpNonLinearProvider.post(this.dataSubmit, this.apiUrl)
      .then(result => {
        if(typeof(result)=="string"){
          this.showAlert("ERROR", result)
        }
        else{
          this.dataRecived = result;
          this.tableComplete();
        }
      }, (err) => {
        console.log(err);
      });
  }
  
}