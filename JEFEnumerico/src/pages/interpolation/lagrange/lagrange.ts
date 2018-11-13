import { GraficadorPage } from './../../graficador/graficador';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController }
  from 'ionic-angular';
import { HttpNonLinearProvider }
  from './../../../providers/http-non-linear/http-non-linear';

@IonicPage()
@Component({
  selector: 'page-lagrange',
  templateUrl: 'lagrange.html',
})
export class LagrangePage {

  private apiUrl  = 'https://stormy-depths-76714.herokuapp.com/lagrange';
  
  showResult = false;
  //Estructura que se enviará al servidor
  datasubmit = {
    x : {},
    y : {}
  };

  //Datos recibidos por el servidor
  private dataReceived = {};

  //Variables que nos ayudan a crear las entradas de usuario
  matrix: Array<string> = [];
  n: any;
  input: string;
  L = []
  eval:any;
  funcion:string;
  showmatriz = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public alertCtrl : AlertController, 
    public HttpNonLinearProvider: HttpNonLinearProvider) {
    this.n = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GaussSimplePage');
  }
  createMatrix() {
    this.showmatriz =true;
    this.showResult = false;
    this.matrix = [];
    this.datasubmit = {
      x : {},
      y : {}
    };

    this.matrix = [];
    this.input = "<ion-input class='cell'></ion-input>";
    for (let i = 0; i < this.n; i++) {
      this.matrix.push(String(i));
    }
    console.log(this.matrix);
    console.log(this.matrix.length);
  }
  getN() {
    console.log(this.n);
    return this.n;
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
    console.log(this.datasubmit);
    this.postServer();
  }

  private help () {
    let alert = this.alertCtrl.create({
      title: '¿Qué debo hacer?',
      subTitle: `<ul>
                    <li> <b> Number of Points: </ b> Number of points to be interpolated </ li>
                    <li> <b> The point to evaluate in the function must be in the interval! </b> </li>
                  </ul> `,
      buttons: ['OK']
    });
    alert.present();
  }
  //Zona de Get y Post

  private results(){
    if(this.dataReceived['error'] == null ){
      this.funcion = this.dataReceived['funcion'];
      this.eval = this.dataReceived['y_eval'];

    }else{
        this.showAlert("OJO!",this.dataReceived['error']);
        this.funcion = this.dataReceived['funcion'];
      }
  }

  public postServer() {
    this.HttpNonLinearProvider.post(this.datasubmit, this.apiUrl)
    .then(result => {
      this.dataReceived = result;
      this.showResult = true;
      this.results();
      console.log("RECIVI");
      console.log(this.dataReceived);
      this.eval = this.dataReceived['P'];
      this.L =this.dataReceived['L'];
    }, (err) => {
      this.showAlert("ERORR:", "verify parameters entered");
      console.log(err);
    });
  }

}
