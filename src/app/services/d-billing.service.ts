import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DBillingService {

  constructor(private http: HttpClient) { }
  addItem(obj) {
    // this.http.get(environment.origin)
    let apiName = environment.origin + "/addItem";
    this.http.post(apiName, obj)
      .subscribe((data: any) => {
        console.log(data.data)
      })
  }

  getItem() {

  }

  removeItem() {

  }

  makeBill() {

  }

  commonApi(obj, api, type?) {
    return new Promise((resolve, reject) => {
      let apiName = environment.origin + "/" + api;

      if (type == "get") {
        this.http.get(apiName)
          .subscribe((data: any) => {
            resolve(data.data)
          }, (error) => {
            reject(error);
          })
      } else {
        this.http.post(apiName, obj)
          .subscribe((data: any) => {
            resolve(data.data)
          }, (error) => {
            reject(error);
          })
      }
    })
  }

  removeCustomer() {

  }

  updateCustomer() {

  }

  getBill() {

  }

  returnAllItems() {

  }
}
