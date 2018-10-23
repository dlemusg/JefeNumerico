import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HttpNonLinearProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpNonLinearProvider {

  constructor(public http: HttpClient) {
    console.log('Hello HttpNonLinearProvider Provider');
  }

  public get(apiUrl) {
    return new Promise(resolve => {
      this.http.get(apiUrl).subscribe(data => {
        resolve(data);
        console.log(data)
      }, err => {
        console.log(err);
      });
    });
  }

  public post(data, apiUrl) {
    console.log(data);
    return (new Promise((resolve, reject) => {
      this.http.post(apiUrl, data).subscribe(res => {
          console.log(res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    }));
  }

}