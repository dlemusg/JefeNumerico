import { GraficadorPage } from './../../graficador/graficador';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController }
  from 'ionic-angular';
import { HttpNonLinearProvider }
  from './../../../providers/http-non-linear/http-non-linear';

@IonicPage()
@Component({
  selector: 'page-newton',
  templateUrl: 'newton.html',
})
export class NewtonPage {
  private rows = [];
  private table;
  private apiUrl;
  private dataSubmit = {};
  private dataReceived = {};
  private graf = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public HttpNonLinearProvider:
      HttpNonLinearProvider) {
    this.dataSubmit['f'] = '';
    this.dataSubmit['x0'] = '';
    this.dataSubmit['tolerancia'] = '';
    this.dataSubmit['niteraciones'] = '';
    this.dataSubmit['tipoError'] = '';

    this.initializationDataRecived();
    this.apiUrl = 'https://tranquil-plateau-12350.herokuapp.com/newton';
    this.table = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewtonPage');
  }

  //Initialize the variables
  initializationDataRecived(){
    this.rows = [];
    this.rows = [...this.rows];
    this.dataReceived['n'] = [];
    this.dataReceived['x0'] = [];
    this.dataReceived['fx'] = [];
    this.dataReceived['dfx'] = [];
    this.dataReceived['error'] = [];
    this.dataReceived['raices'] = [];
  }

  /* check if the fields are empty and show a signal, if they are empty, call 
  the postServer function */
  submitForm() {
    this.graf = false;
    if (this.dataSubmit['f'] == '') {
      this.showAlert("ERROR:", "The field f(x) can not be empty");
    } else if (this.dataSubmit['x0'] == '') {
      this.showAlert("ERROR:", "The field x0 can not be empty");
    } else if (this.dataSubmit['tolerancia'] == '') {
      this.showAlert("ERROR:", "The tolerance field can not be empty");
    } else if (this.dataSubmit['niteraciones'] == '') {
      this.showAlert("ERROR:", "The field No. Iters can not be empty");
    } else if (this.dataSubmit['tipoError'] == '') {
      this.showAlert("ERROR:", "The Error Type field can not be empty");
    } else {
      this.postServer();
    }
  }

  // add the graphing page below the buttons and hide the table.
  graficador() {
    this.graf = true;
    var points = []
    var final = []

    for(var i = 0; i < this.dataReceived['x0'].length;i++){

      if(i == this.dataReceived['x0'].length - 1){
        final.push({
          "x": this.dataReceived['x0'][i],
          "y": this.dataReceived['fx'][i]
        });
      }
      points.push({
        "x": this.dataReceived['x0'][i],
        "y": this.dataReceived['fx'][i]
      }); 
    }
    var aux: number = <number><any>this.dataReceived['x0'][this.dataReceived['x0'].length-1];
    var send = {
      'f': this.dataSubmit['f'],
      'a': ""+(aux-0.5),
      'b': ""+(aux+0.3),
      'lpoints':["xm"],
      'lraices': ["xm final"],
      'points': points,
      'raices': final
    };
    this.navCtrl.push(GraficadorPage, send);
  }

  graph(){
    this.submitForm();
    this.graf = true;
  }

  // add the graphing page below the buttons and hide the table.
  help() {
    let alert = this.alertCtrl.create({
      title: 'Help!',
      message: `<ul>
                  falto implementarme
                  </ul>`,
      buttons: ['OK']
    });
    alert.present();
  }

  // shows an alert on the screen
  showAlert(error, subtitle) {
    let alert = this.alertCtrl.create({
      title: error,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }

  // complete the table with the values sent by the server
  tableComplete() {
    this.table = false;//people can see the table
    var i;
    for (i = 0; i < this.dataReceived['n'].length; i++) {
      var json = {
        "n": this.dataReceived['n'][i],
        "x0": this.dataReceived['x0'][i],
        "fx": this.dataReceived['fx'][i],
        "dfx": this.dataReceived['dfx'][i],
        "error": this.dataReceived['error'][i]

      };
      this.rows.push(json);
      this.rows = [...this.rows];
    }
  }

  /* communicates with the server sending the data, when it finishes it calls 
  the function tableComplete() */
  postServer() {
    this.HttpNonLinearProvider.post(this.dataSubmit, this.apiUrl)
      .then(result => {
        this.rows = [...this.rows];
        this.initializationDataRecived();
        if (typeof (result) == "string") {
          this.showAlert("ERROR", result)
        }else {
          this.dataReceived = result;
          if(this.graf) this.graficador();
          if(this.dataReceived['n'].length == 0 && this.dataReceived['raices'].length  == 1){
            this.showAlert("root: ",this.dataReceived["raices"][0]);
          }
          else{ 
            this.tableComplete();
            this.showAlert("Approximate root: ",this.dataReceived["raices"][0]);
          }
        }
      }, (err) => {
        console.log(err);
      });
  }

}