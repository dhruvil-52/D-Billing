import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { SellService } from '../sell/sell.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  public myDetailsForm: FormGroup;
  // public termsAndConditions = new FormArray([])
  public mode: string;
  public myDetails: any;
  // get terms() { return this.myDetailsForm.get('termsAndConditions'); }
  get terms(): FormArray {
    return this.myDetailsForm.get("termsAndConditions") as FormArray
  }
  xyz = [1, 2, 3, 4, 5]
  constructor(private sellService: SellService, private messageService: MessageService, private fb: FormBuilder) { }

  // initMyForm() {
  //   this.myDetailsForm = new FormGroup({
  //     shopName: new FormControl(""),
  //     address: new FormControl(""),
  //     city: new FormControl(""),
  //     state: new FormControl(""),
  //     GSTNumber: new FormControl(""),
  //     mobileNumber: new FormControl(""),
  //     mobileNumber2: new FormControl(""),
  //     bankName: new FormControl(""),
  //     bankAccountNumber: new FormControl(""),
  //     IFSCCode: new FormControl(""),
  //     name: new FormControl(""),
  //     email: new FormControl(""),
  //     termsAndConditions: new FormControl(""),
  //   })
  // }
  initMyForm() {
    this.myDetailsForm = this.fb.group({
      shopName: "",
      address: "",
      city: "",
      state: "",
      GSTNumber: "",
      mobileNumber: "",
      mobileNumber2: "",
      bankName: "",
      bankAccountNumber: "",
      IFSCCode: "",
      name: "",
      email: "",
      termsAndConditions: this.fb.array([]),
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

  addTerms() {
    // this.terms.push(this.fb.control(''));
    // (this.myDetailsForm.controls['termsAndConditions'] as FormArray).push(this.fb.control(''));
    this.terms.push(this.fb.control(''));
  }

  removeTerms(index: number) {
    // (this.myDetailsForm.controls['termsAndConditions'] as FormArray).removeAt(index);
    this.terms.removeAt(index);
  }

  clearWholeTerms() {
    // (this.myDetailsForm.controls['termsAndConditions'] as FormArray).clear();
    this.terms.clear();
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
    for (let i = 0; i < 5; i++) {
      this.addTerms();
    }
    this.setDefaultValue();
  }

}
