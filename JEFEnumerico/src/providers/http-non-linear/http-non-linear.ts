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

  public post(data, apiUrl) {
    return (new Promise((resolve, reject) => {
    this.http.post(apiUrl, data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    }));
  }

}