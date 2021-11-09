import { Injectable } from '@angular/core';
import { DBillingService } from 'src/app/services/d-billing.service';

@Injectable({
  providedIn: 'root'
})
export class SellService {

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

  getMyProfile() {
    return new Promise((resolve, reject) => {
      this.dbillingService.commonApi({}, "getMyProfile", "get").then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      })
    })
  }

  editMyProfile(obj) {
    return new Promise((resolve, reject) => {
      this.dbillingService.commonApi(obj, "editMyProfile").then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      })
    })
  }
}
