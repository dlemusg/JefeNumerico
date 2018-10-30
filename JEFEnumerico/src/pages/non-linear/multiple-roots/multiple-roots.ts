import { GraficadorPage } from './../../graficador/graficador';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController }
  from 'ionic-angular';
import { HttpNonLinearProvider }
  from './../../../providers/http-non-linear/http-non-linear';

@IonicPage()
@Component({
  selector: 'page-multiple-roots',
  templateUrl: 'multiple-roots.html',
})
export class MultipleRootsPage {
  private rows = [];
  private table;
  private apiUrl;
  private dataSubmit = {};
  private dataReceived = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public HttpNonLinearProvider:
      HttpNonLinearProvider) {
    this.dataSubmit['f'] = '';
    this.dataSubmit['x0'] = '';
    this.dataSubmit['tolerancia'] = '';
    this.dataSubmit['niteraciones'] = '';
    this.dataSubmit['tipoError'] = '';

    this.initializationDataRecived();
    this.apiUrl = 'https://tranquil-plateau-12350.herokuapp.com/multipleroots';
    this.table = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MultipleRootsPage');
  }

  //Initialize the variables
  initializationDataRecived(){
    this.rows = [];
    this.rows = [...this.rows];
    this.dataReceived['n'] = [];
    this.dataReceived['x0'] = [];
    this.dataReceived['fx'] = [];
    this.dataReceived['dfx'] = [];
    this.dataReceived['d2fx'] = [];
    this.dataReceived['error'] = [];
    this.dataReceived['raices'] = [];
  }

  /* check if the fields are empty and show a signal, if they are empty, call 
  the postServer function */
  submitForm() {
    if (this.dataSubmit['f'] == '') {
      this.showAlert("ERROR:", "The field f(x) can not be empty");
    } else if (this.dataSubmit['x0'] == '') {
      this.showAlert("ERROR:", "The field x0 can not be empty");
    }else if (this.dataSubmit['tolerancia'] == '') {
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
    this.showAlert("ERROR","It has not been implemented");
    console.log("falta implementarme");
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
        "x": this.dataReceived['x0'][i],
        "fx": this.dataReceived['fx'][i],
        "dfx": this.dataReceived['dfx'][i],
        "d2fx": this.dataReceived['d2fx'][i],
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
