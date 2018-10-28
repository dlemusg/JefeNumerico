import { FalsePositionPage } from './false-position/false-position';
import { BisectionPage } from './bisection/bisection';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IncrementalSearchPage } from './incremental-search/incremental-search';

/**
 * Generated class for the NonLinearPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-non-linear',
  templateUrl: 'non-linear.html',
})
export class NonLinearPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  
  public goBisection(){
    this.navCtrl.push(BisectionPage);
  }

  public goFalsePosition(){
    this.navCtrl.push(FalsePositionPage);
  }
  public goIncrementalSearch(){
    this.navCtrl.push(IncrementalSearchPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NonLinearPage');
  }

}
