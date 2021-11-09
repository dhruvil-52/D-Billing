import { Injectable } from '@angular/core';
import { DBillingService } from '../services/d-billing.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private dbillingService: DBillingService) { }

  getItem(obj) {
    return new Promise((resolve, reject) => {
      this.dbillingService.commonApi(obj, "getItem").then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      })
    })
  }

  addItem(obj) {
    return new Promise((resolve, reject) => {
      this.dbillingService.commonApi(obj, "addItem").then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      })
    })
  }

  removeItem(obj) {
    return new Promise((resolve, reject) => {
      this.dbillingService.commonApi(obj, "removeItem").then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      })
    })
  }
}
