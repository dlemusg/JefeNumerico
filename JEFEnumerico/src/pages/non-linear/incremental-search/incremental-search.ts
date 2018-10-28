import { GraficadorPage } from './../../graficador/graficador';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController }
  from 'ionic-angular';
import { HttpNonLinearProvider }
  from './../../../providers/http-non-linear/http-non-linear';

/**
 * Generated class for the IncrementalSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public HttpNonLinearProvider:
      HttpNonLinearProvider) {
    this.dataSubmit['f'] = '';
    this.dataSubmit['x0'] = '';
    this.dataSubmit['delta'] = '';
    this.dataSubmit['niteraciones'] = '';

    this.dataReceived['iter'] = [];
    this.dataReceived['x1'] = [];
    this.dataReceived['fx1'] = [];
    this.apiUrl = 'http://dlemusg.pythonanywhere.com/incrementalSearch';
    this.table = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IncrementalSearchPage');
  }

  submitForm() {
    if (this.dataSubmit['f'] == '') {
      this.showAlert("ERROR:", "The field f(x) can not be empty");
    } else if (this.dataSubmit['x0'] == '') {
      this.showAlert("ERROR:", "The field x can not be empty");
    } else if (this.dataSubmit['delta'] == '') {
      this.showAlert("ERROR:", "The delta field can not be empty");
    } else if (this.dataSubmit['niteraciones'] == '') {
      this.showAlert("ERROR:", "The field No. Iters can not be empty");
    } else {
      this.postServer();
    }
  }

  // add the graphing page below the buttons and hide the table.
  graficador() {
    console.log("falta implementarme");
  }

  // add the graphing page below the buttons and hide the table.
  help() {
    let alert = this.alertCtrl.create({
      title: 'Help!',
      message: `<ul>
                  <li> f(x) must be a continuous function </li>
                  <br><br>
                  <li> If f(x) is defined in [a,b] and it follows that: 
                  f(a) * f(b) < 0, then there is some Xm in [a,b] that is root </li>
                  <br> <br>
                  <li> There is a single root if it is true that f is continuous
                      in [a, b], f (a) * f (b) <0, f is differentiable in (a, b)
                      and f '(x) does not change sign for all x that belongs [a,b] 
                  </li>
                </ul> `,
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
        if (typeof (result) == "string") {
          this.showAlert("ERROR", result)
        }
        else {
          this.dataReceived = result;
          this.tableComplete();
        }
      }, (err) => {
        console.log(err);
      });
  }

}