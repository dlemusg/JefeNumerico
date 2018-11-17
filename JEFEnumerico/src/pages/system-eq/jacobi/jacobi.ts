import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } 
  from 'ionic-angular';
import { HttpNonLinearProvider }
  from './../../../providers/http-non-linear/http-non-linear';
import { stringify } from '@angular/core/src/render3/util';
@IonicPage()
@Component({
  selector: 'page-jacobi',
  templateUrl: 'jacobi.html',
})
export class JacobiPage {
  private apiUrl  = 'https://stormy-depths-76714.herokuapp.com/jacobi';
  
  showResult = false;

  datasubmit = {
    A : {},
    b : [],
    x0: []
  };

  xs = [];
  escalonada : any;
  private dataReceived = {};
  matrix: Array<string> = [];
  n: any;
  input: string;
  private buttonClicked; 
  private showStep;
  private table;

  private columns;
  private rows;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, 
    public navParams: NavParams, public HttpNonLinearProvider:
    HttpNonLinearProvider) {
      this.buttonClicked = false;
      this.n = "";
      this.showStep = false;
      this.columns = [];
      this.rows=[];
      this.table = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GaussSimplePage');
  }

  //Initialize the variables
  initializationDataRecived(){
    this.rows = [];
    this.columns = [];
    
    for(var i = 0; i < this.n;i++){
      this.dataReceived[i.toString()] = [];
    }
    this.dataReceived['n'] = [];
    this.dataReceived['Error'] = [];
    this.columns = [...this.columns];
    this.rows = [...this.rows];
  }

  //open the button help
  private help () {
    let alert = this.alertCtrl.create({
      title: 'Help!',
      message: ` <ul>
                      <li> Matrix A must be invertible </li>
                      <li> <b> Tol: </b> Response quality; it have to be a number, you can use 'e' to replace 'x10' 
                      ej: 0.001 = 1e-3</li>
                      <br>
                      <li> <b>Iters:</b> is a whole number; is the maximum number of iterations 
                        that the method will try to find the interval</li>
                      <li> <b>x0:</b> is the initial value, it is a number </li>
                      <li> for more information go to the 
                      <a href="https://sites.google.com/view/jefeanumerico/ecuation-systems/iterative-methods/jacobi">
                      Page</a>
                    </li>
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
      x0: []
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
  private addColumns(){
    var x;
    for(var i = 0; i <= this.n;i++){
      if(i == 0) this.columns.push({name: 'n'});
      else{
        let x = "x" + i.toString();
        this.columns.push(
          { name: x, sortable: false}
        );
      }
    }
    this.columns.push({name: 'error'})
  }

  private addRows(){
    for(var i = 0;i < this.dataReceived['n'].length;i++){
      var json = {};
      json['n'] = this.dataReceived['n'][i];
      json['error'] = this.dataReceived['Error'][i];
      for(var j = 0; j< this.n; j++ ){
        let x = "x" + (j+1).toString();
        json[x] = this.dataReceived[j.toString()][i];
      }
      this.rows.push(json);
    }
  }
  // complete the table with the values sent by the server
  tableComplete() {
    this.table = false;//people can see the table
    this.addColumns();
    this.addRows();
    this.rows = [...this.rows];
    this.columns = [...this.columns];
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


  //conect with server end send data
  public postServer() {
    this.HttpNonLinearProvider.post(this.datasubmit, this.apiUrl)
    .then(result => {
      this.dataReceived = result;
      this.showResult = true;
      console.log("ME LLEGA DEL SERVIDOR COMO RTA");
      console.log(result);
      if (typeof (result) == "string") {
        this.showAlert("ERROR:", result);
      }
      this.tableComplete();
      //this.results();
    }, (err) => {
      this.showAlert("ERORR:", "verify parameters entered");
      console.log(err);
    });
  }

}