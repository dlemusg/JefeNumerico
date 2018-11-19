import { GraficadorPage } from './../../graficador/graficador';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController }
  from 'ionic-angular';
import { HttpNonLinearProvider }
  from './../../../providers/http-non-linear/http-non-linear';

@IonicPage()
@Component({
  selector: 'page-incremental-search',
  templateUrl: 'incremental-search.html',
})
export class IncrementalSearchPage {
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
    this.dataSubmit['delta'] = '';
    this.dataSubmit['niteraciones'] = '';

    this.table = true;
    this.initializationDataRecived();
    this.apiUrl = 'https://stormy-depths-76714.herokuapp.com/incrementalSearch';
  }

  //Initialize the variables
  initializationDataRecived(){
    this.rows = [];
    this.rows = [...this.rows];
    this.dataReceived['iter'] = [];
    this.dataReceived['x1'] = [];
    this.dataReceived['fx1'] = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IncrementalSearchPage');
  }

  /* check if the fields are empty and show a signal, if they are empty, call 
  the postServer function */
  submitForm() {
    this.graf = false;
    if (this.dataSubmit['f'] == '') {
      this.showAlert("ERROR:", "The field f(x) can not be empty");
    } else if (this.dataSubmit['x0'] == '') {
      this.showAlert("ERROR:", "The field x0 can not be empty");
    } else if (this.dataSubmit['delta'] == '') {
      this.showAlert("ERROR:", "The delta field can not be empty");
    } else if (this.dataSubmit['niteraciones'] == '') {
      this.showAlert("ERROR:", "The field No.Iters can not be empty");
    } else {
      this.postServer();
    }
  }

  // add the graphing page below the buttons and hide the table.
  graficador() {
    this.graf = true;
    var a: string = this.dataSubmit['x0'] + "";
    var b: string = "";
    
    let size = this.dataReceived['x1'].length;
    a = this.dataReceived['x1'][0] + "";
    b = this.dataReceived['x1'][size - 1] + "";
    var aux: number = <number><any>this.dataReceived['x1'][size-1];
    var send = {
      'f': this.dataSubmit['f'],
      'a': a,
      'b': "" + (aux + 0.2),
      'lpoints':["Lparen"],
      'lraices': ["Rparen"],
      'points': [{
        'x': this.dataReceived['x1'][size - 2],
        'y': this.dataReceived['fx1'][size - 2],
      }],
      'raices': [{
        'x': this.dataReceived['x1'][size - 1],
        'y': this.dataReceived['fx1'][size - 1],
      }]

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
                  <li> <b>f(x):</b> must be a continuous function, x must be minuscule </li>
                  <li> <b>x0:</b> is an integer, it is the value by which the method 
                      starts looking for the interval </ li>
                  <li> <b>Delta:</b> is a number with or without decimals; is the change 
                      of x </ li>
                  <li> <b>Iters:</b> is a whole number; is the maximum number of iterations 
                      that the method will try to find the interval</li>
                  <li> for more information go to the 
                      <a href="https://sites.google.com/view/jefeanumerico/non-linear-equations/incremental-searches">
                      Page</a>
                  </li>
                </ ul> `,
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
    for (i = 0; i < this.dataReceived['iter'].length; i++) {
      var json = {
        "n": this.dataReceived['iter'][i],
        "x": this.dataReceived['x1'][i],
        "fx": this.dataReceived['fx1'][i]
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
        this.initializationDataRecived()
        if (typeof (result) == "string")
          this.showAlert("ERROR", result);
        else {
          
          this.dataReceived = result;
          var temp = this.dataReceived['x1'].length;
          this.showAlert("Interval where there is a root: ",
            "("+this.dataReceived['x1'][temp-2]+","+this.dataReceived['x1'][temp-1]+")");
          if(this.graf&&this.dataReceived) this.graficador();
          this.tableComplete();
        }
      }, (err) => {
        console.log(err);
      });
  }

}