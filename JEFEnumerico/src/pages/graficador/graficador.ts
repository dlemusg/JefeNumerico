import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { HttpNonLinearProvider }
  from './../../providers/http-non-linear/http-non-linear';
import { stringify } from '@angular/core/src/render3/util';

import { Chart } from 'chart.js';

@IonicPage()
@Component({
  selector: 'page-graficador',
  templateUrl: 'graficador.html',
})

export class GraficadorPage {
  @ViewChild('lineCanvas') lineCanvas;
  private graphData = {};
  private lineChart: any;


  private apiUrl = "https://tranquil-plateau-12350.herokuapp.com/grafica";


  private dataSubmit = {};
  private dataReceivedPost = {};
  private final;
  private aprox;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public HttpNonLinearProvider: HttpNonLinearProvider) {
    this.dataSubmit['f'] = navParams.data['f'];
    this.dataSubmit['xa'] = navParams.data['a'];
    this.dataSubmit['xb'] = navParams.data['b'];
    this.aprox = navParams.data['points'];
    this.final = navParams.data['raices'];
    this.dataSubmit['delta'] = "0.1";

    console.log("me envian");
    console.log(navParams.data);

    console.log("aprox y final")
    console.log(this.aprox);
    console.log(this.final);
  }


  help() {
    let alert = this.alertCtrl.create({
      title: 'Help!',
      subTitle: `<p> Enter the following information: </ p>
                <ul>
                  <li> <b> fx: </ b> Function to be evaluated </ li>
                  <li> <b> xa, xb: </ b> Initial interval </ li>
                  <li> <b> Tolerance: </ b> Response quality </ li>
                  <li> <b> Num. Iters: </ b> Times executed </ b> </ li>
                  <li> <b> Absolute: </ b> Absolute Error </ b> </ li>
                  <li> <b> Relative: </ b> Relative Error </ b> </ li>
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


  submitForm() {
    //Verificar si son campos vacios
    if (this.dataSubmit['f'] == '') {
      this.showAlert("Error", "The field f (x) can not be empty");

    } else if (this.dataSubmit['xa'] == '') {
      this.showAlert("Error", "Field a can not be empty.");

    } else if (this.dataSubmit['xb'] == '') {
      this.showAlert("Error", "Field b can not be empty");

    } else if (this.dataSubmit['delta'] == '') {
      this.showAlert("Error", "The delta field can not be empty");

    } else {
      this.postServer();
    }
  }
  
    drawFunctionA(points) {
      this.lineChart = new Chart(this.lineCanvas.nativeElement, {
  
        type: 'line',
        data: {
          datasets: [{
            label:["f"],
            data: points,
            type: 'line',
            fill: false,
            borderColor: [
              '#001f51',
            ],
            borderWidth: 0.5
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

  drawFunction(points) {
    if(this.aprox != undefined && this.final != undefined){
      this.lineChart = new Chart(this.lineCanvas.nativeElement, {
        type: 'line',
        data: {
          datasets: [{
            label: ["f"],
            data: points,
            type: 'line',
            fill: false,
            borderColor: [
              '#001f51',
            ],
            borderWidth: 0.5
          }, {
            label: ["xm"],
            type: 'bubble',
            backgroundColor: "rgba(255,0,0,0.2)",
            borderColor: "rgba(255,0,0,1)",
            radius: '3',
            data: this.aprox
          },{
            label: ["found"],
            type: 'bubble',
            backgroundColor: "rgba(0,255,0,0.2)",
            borderColor: "rgba(0,255,0,1)",
            radius: '4',
            data: this.final
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
    else{
      this.drawFunctionA(points);
    }
  }

  ionViewDidLoad() {
    console.log(this.dataSubmit);
    if ((this.dataSubmit['f'] != "") && (this.dataSubmit['f'] != undefined) &&
      (this.dataSubmit['xa'] != "") && (this.dataSubmit['xa'] != undefined) &&
      (this.dataSubmit['xb'] != '') && (this.dataSubmit['xb'] != undefined) &&
      (this.dataSubmit['delta'] != "") && (this.dataSubmit['delta'] != undefined)){
      this.postServer();
      this.verificarPost();
    } else {
      this.drawFunction({});
    }
  }

  verificarPost() {
    if (this.dataReceivedPost['error'] != null) {
      this.showAlert("Error", this.dataReceivedPost['error']);
    } else {
      this.drawFunction(this.dataReceivedPost['data']);
    }
  }


  //Zona de get y post
  public postServer() {
    console.log(this.dataSubmit);
    this.HttpNonLinearProvider.post(this.dataSubmit, this.apiUrl)
      .then(result => {
        this.dataReceivedPost = result;
        this.verificarPost();
        console.log("Me llega");
        console.log(result);
      }, (err) => {
        console.log(err);
      });
  }
}
