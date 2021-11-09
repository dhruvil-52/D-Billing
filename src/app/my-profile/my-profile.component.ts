import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SellService } from '../sell/sell.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  public myDetailsForm: FormGroup;
  public mode: string;
  public myDetails: any;
  constructor(private sellService: SellService, private messageService: MessageService) { }

  initMyForm() {
    this.myDetailsForm = new FormGroup({
      shopName: new FormControl(""),
      address: new FormControl(""),
      city: new FormControl(""),
      state: new FormControl(""),
      GSTNumber: new FormControl(""),
      mobileNumber: new FormControl(""),
      mobileNumber2: new FormControl(""),
      bankName: new FormControl(""),
      bankAccountNumber: new FormControl(""),
      IFSCCode: new FormControl(""),
      name: new FormControl(""),
      email: new FormControl(""),
      termsAndConditions: new FormControl([])
    })
  }

  getMyProfile() {
    this.sellService.getMyProfile().then((result) => {
      if (result) {
        this.mode = "edit";
        this.myDetails = result[0];
        this.setDefaultValue()
      } else {
        this.mode = "add";
      }
    }).catch((error) => {
      console.log("error", error)
    });
  }

  setDefaultValue() {
    if (this.mode == "edit") {
      this.myDetailsForm.setValue(this.myDetails);
    }
  }

  reset() {
    this.getMyProfile();
    this.setDefaultValue();
  }

  saveMyDetails() {
    let obj = this.myDetailsForm.value;
    this.sellService.editMyProfile(obj).then((result) => {
      if (result) {
        if (this.mode != "edit") {
          this.messageService.showMessage("You profile has been edited Successfully", "success")
        } else {
          this.messageService.showMessage("You profile has been saved Successfully", "success")
        }
        this.getMyProfile();
        this.setDefaultValue();
      }
    }, (error) => {
      console.log(error)
      if (this.mode != "edit") {
        this.messageService.showMessage("Error while saving details", "error")
      } else {
        this.messageService.showMessage("Error while editing details", "error")
      }
    })
  }

  ngOnInit(): void {
    this.getMyProfile();
    this.initMyForm();
    this.setDefaultValue();
  }

}
