import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController }
  from 'ionic-angular';
import { HttpNonLinearProvider }
  from './../../../providers/http-non-linear/http-non-linear';
import { Chart } from 'chart.js';

@IonicPage()
@Component({
  selector: 'page-lagrange',
  templateUrl: 'lagrange.html',
})
export class LagrangePage {
  @ViewChild('line') line;
  private lineChart: any;

  private apiUrl = 'https://stormy-depths-76714.herokuapp.com/lagrange';

  private showResult = false;

  private datasubmit = { x: [], y: [] ,v: ""};
  private v = "";
  private p = "";

  private dataReceived = {};

  private matrix: Array<string> = [];
  private n: any;
  private input: string;
  private L = [];
  private eval: any;
  private funcion: string;
  private showmatriz = false;
  private points = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController,
    public HttpNonLinearProvider: HttpNonLinearProvider) {
    this.n = '';
  }

  ionViewDidLoad() {
    this.drawFunction({});
  }
  createMatrix() {
    this.showmatriz = true;
    this.showResult = false;
    this.matrix = [];
    this.datasubmit = {
      x: [],
      y: [],
      v: ""
    };

    this.matrix = [];
    this.input = "<ion-input class='cell'></ion-input>";
    for (let i = 0; i < this.n; i++) {
      this.matrix.push(String(i));
    }
  }

  showAlert(error, subtitle) {
    let alert = this.alertCtrl.create({
      title: error,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }

  submitForm(){
    if (this.datasubmit.x.length != this.n)
      this.showAlert("ERROR:", "X's are not complete");
    else if (this.datasubmit.y.length != this.n)
      this.showAlert("ERROR:", "Y's are not complete");
    else this.postServer();
  }

  private help() {
    let alert = this.alertCtrl.create({
      title: '¿Qué debo hacer?',
      subTitle: `<ul>
                    <li> <b> Number of Points: </ b> Number of points to be interpolated </ li>
                    <li> <b> The point to evaluate in the function must be in the interval </b> </li>
                  </ul> `,
      buttons: ['OK']
    });
    alert.present();
  }

  private results() {
    if (this.dataReceived['error'] == null) {
      this.funcion = this.dataReceived['P'];
      this.L = this.dataReceived['L'];
      this.eval = this.dataReceived['V'];
      this.p = "P(" + this.datasubmit['v'] + ")";
      this.points = [];
      for(var i = 0; i < this.datasubmit['x'].length ; i++)
        this.points.push({
          "x": this.datasubmit['x'][i], 
          "y": this.datasubmit['y'][i] 
        });
      this.drawFunction(this.dataReceived['data']);
    } else {
      this.showAlert("ERROR:", this.dataReceived['error']);
    }
  }

  public postServer() {
    console.log("ENVIARE");
    console.log(this.datasubmit)
    this.HttpNonLinearProvider.post(this.datasubmit, this.apiUrl)
      .then(result => {
        console.log("RECIVI");
        console.log(this.dataReceived);
        this.dataReceived = result;
        this.showResult = true;
        this.results();
      }, (err) => {
        this.showAlert("ERORR:", "verify parameters entered");
        console.log(err);
      });
  }

  drawFunction(points) {
    this.lineChart = new Chart(this.line.nativeElement, {
      type: 'line',
      data: {
        datasets: [{
          label: ["P(x)"],
          data: points,
          type: 'line',
          fill: false,
          borderColor: [
            '#001f51',
          ],
          borderWidth: 0.5
        }, {
          label: ["Points"],
          type: 'bubble',
          backgroundColor: "rgba(255,0,0,0.2)",
          borderColor: "rgba(255,0,0,1)",
          radius: '3',
          data: this.points
        }, {
          label: this.p,
          type: 'bubble',
          backgroundColor: "rgba(0,255,0,0.2)",
          borderColor: "rgba(0,255,0,1)",
          radius: '4',
          data: [{"x": this.datasubmit['v'], "y": this.dataReceived['V']}]
        }],
      },
      options: {
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom'
          }]
        },
        elements: {
          point: {
            radius: 0
          }
        }
      }
    });
  }
}
