import { Component, OnInit } from '@angular/core';
import { CommunticationService } from 'src/app/services/communtication.service';
import { common } from '../../../models/common';
import { SellService } from '../../sell.service';

@Component({
  selector: 'app-generate-sell-bill',
  templateUrl: './generate-sell-bill.component.html',
  styleUrls: ['./generate-sell-bill.component.scss']
})
export class GenerateSellBillComponent implements OnInit {

  public mobileNumber = "9638717070";
  public GSTNumber = "13279284024-204-904298";
  public billType = "Original"// original or duplicate
  public customerName = "Dhruvil Talaviya";
  public customerGSTNumber = "2389480=4-424090894";
  public billNumber = 1;
  public todayDate = new Date();
  public amount = 55000.30;
  public gstPercentage = 5;
  public sgst = 200.90;
  public cgst = 200.90;
  public roundOff = common.findDecimalPoint(common.roundOff(this.amount) - this.amount);
  public total = this.amount + this.roundOff;
  public totalInWords = common.moneyInWords(this.total);
  public bankName = "HDFC Bank";
  public custBankName = "Kotal";
  public bankAccountNumber = 153178637781873;
  public IFSCCode = "HDFC00001235";
  public chequeNumber = "2892748-32u823-8899";
  public address = "ahmedabad nikol"
  public userDetails: any;
  public myDetails: any;
  constructor(private sellService: SellService, private communicationService: CommunticationService) { }

  changeMode() {
    if (this.billType == "Original") {
      this.billType = "Duplicate";
    } else {
      this.billType = "Original";
    }

  }

  myFunction() {
    window.print();
    // https://www.py4u.net/discuss/914318
    // console.log("called")
  }

  getMyProfile() {
    this.sellService.getMyProfile().then((result) => {
      this.myDetails = result[0];
    }).catch((error) => {
      console.log("error", error)
    });
  }

  getCustomerInfo() {
    let obj = {
      name: "dhruvil"
    }
    this.sellService.getCustomer(obj).then((result) => {
      this.userDetails = result[0];
    }).catch((error) => {
      console.log("error", error)
    });
  }

  ngOnInit(): void {
    this.getMyProfile();
    this.getCustomerInfo();
    this.communicationService.currentTab = "Billing";
  }

}
