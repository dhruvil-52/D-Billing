import { Injectable } from '@angular/core';
import { DBillingService } from 'src/app/services/d-billing.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private dbillingService: DBillingService) { }

  getCustomer(obj) {
    return new Promise((resolve, reject) => {
      this.dbillingService.commonApi(obj, "getCustomer").then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      })
    })
  }

  addCustomer(obj) {
    return new Promise((resolve, reject) => {
      this.dbillingService.commonApi(obj, "addCustomer").then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      })
    })
  }

  updateCustomer(obj) {
    return new Promise((resolve, reject) => {
      this.dbillingService.commonApi(obj, "updateCustomer").then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      })
    })
  }

  removeCustomer(obj) {
    return new Promise((resolve, reject) => {
      this.dbillingService.commonApi(obj, "removeCustomer").then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      })
    })
  }

  getMyProfile() {
    return new Promise((resolve, reject) => {
      this.dbillingService.commonApi({}, "getMyProfile", "get").then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      })
    })
  }

}
