import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } 
  from 'ionic-angular';
import { HttpNonLinearProvider }
  from './../../../providers/http-non-linear/http-non-linear';
import { stringify } from '@angular/core/src/render3/util';

@IonicPage()
@Component({
  selector: 'page-gauss-simple',
  templateUrl: 'gauss-simple.html',
})
export class GaussSimplePage {
  private apiUrl  = 'https://tranquil-plateau-12350.herokuapp.com/gausssimple';
  
  showResult = false;

  datasubmit = {
    A : {},
    b : {},
  };

  xs = [];
  escalonada : any;

  private dataReceived = {};
  matrix: Array<string> = [];
  n: any;
  input: string;
  private buttonClicked; 
  private showStep;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, 
    public navParams: NavParams, public HttpNonLinearProvider:
    HttpNonLinearProvider) {
      this.buttonClicked = false;
      this.n = "";
      this.showStep = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GaussSimplePage');
  }


  //open the button help
  private help () {
    let alert = this.alertCtrl.create({
      title: 'Help!',
      subTitle: ` <p> Remember: </ p>
                    <ul>
                      <li> Matrix A must be invertible </li>
                      <li> Avoid putting zeros in the diagonal </li>
                    </ul>`,
      buttons: ['OK']
    });
    alert.present();
  }

  //create matrix with lengh n
  createMatrix() {
    this.showResult = false;
    this.showStep = false;
    this.matrix = [];
    this.datasubmit = {
      A : {},
      b : [],
    };
    this.input = "<ion-input class='cell'></ion-input>";
    if(this.n == "" || this.n == " "){
      this.showAlert("ERROR:", "Field dimension cant be empy")
      this.buttonClicked = false;
    }else{
      this.buttonClicked = true;
      for (let i = 0; i < this.n; i++) {
        this.matrix.push(String(i));
      }
    }
  }

  //recibe data and verify if vector b is correct
  submitForm(){
    console.log(this.datasubmit)
    if(Object.keys(this.datasubmit.b).length != this.n){
      this.showAlert("ERROR:", "Vector b is not complete");
    }else{
      this.postServer();
    }
  }

  //verify if there are some error and put the results
  private results(){
    this.showStep = false;
    if(this.dataReceived['error'] == null ){
      this.xs = this.dataReceived['X'];
      this.escalonada = this.dataReceived[(this.n-1).toString()];
      console.log(this.escalonada);
    }else{
      this.showAlert("ERORR:",this.dataReceived['error']);
    }
  }


  //show alerts
  showAlert(error, subtitle) {
    let alert = this.alertCtrl.create({
      title: error,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }

  //show steps and hide view the normal result
  steps(){
    this.showResult = false;
    this.showStep = true;
  }

  //conect with server end send data
  public postServer() {
    this.HttpNonLinearProvider.post(this.datasubmit, this.apiUrl)
    .then(result => {
      this.dataReceived = result;
      this.showResult = true;
      console.log("ME LLEGA DEL SERVIDOR COMO RTA");
      console.log(result);
      this.results();
    }, (err) => {
      console.log(err);
    });
  }

}