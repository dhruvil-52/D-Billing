import { Injectable } from '@angular/core';
import { DBillingService } from '../services/d-billing.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private dbillingService: DBillingService) { }

  makeBill(obj) {
    return new Promise((resolve, reject) => {
      this.dbillingService.commonApi(obj, "makeBill").then((result) => {
        console.log("result",result);
        resolve(result);
      }, (error) => {
        reject(error);
      })
    })
  }

  getBill(obj) {
    return new Promise((resolve, reject) => {
      this.dbillingService.commonApi(obj, "getBill").then((result: any) => {
        for (let data of result){
        data.customerName = data.firstName + " " + data.lastName;
        }
        console.log(result);
        resolve(result);
      }, (error) => {
        reject(error);
      })
    })
  }
}
