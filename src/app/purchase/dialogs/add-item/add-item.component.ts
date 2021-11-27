import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'src/app/services/message.service';
import { Router } from '@angular/router';
import { PurchaseService } from '../../purchase.service';
import { DialogService } from 'src/app/services/dialog.service';
import { ConeWeightComponent } from '../cone-weight/cone-weight.component';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  public customerForm: FormGroup;
  public customerId: string;
  // public data: any;
  public itemName: string;
  public isEditMode: boolean;

  constructor(private dialogService: DialogService,
    private purchaseService: PurchaseService,
    private modal: NgbActiveModal,
    private messageService: MessageService,
    private router: Router) {
  }

  initCustomerForm() {
    this.customerForm = new FormGroup({
      billNumber: new FormControl(''),
      itemCode: new FormControl(''),
      itemName: new FormControl(''),
      buyFrom: new FormControl(''),
      date: new FormControl(''),
      coneWeight: new FormControl(''),
      grossWeight: new FormControl(''),
      netWeight: new FormControl(''),
      noOfPcs: new FormControl(''),
      rate: new FormControl(''),
      amount: new FormControl(''),
    })
    // if (this.isEditMode) {
    //   if (this.data?.mode) {
    //     delete this.data.mode;
    //   }
    //   this.customerForm.setValue(this.data);
    // }
  }

  save() {
    let obj = this.customerForm.value;
    // if (this.isEditMode) {
    //   this.purchaseService.updateItem(obj).then((result) => {
    //     if (result) {
    //       this.modal.close(true);
    //     }
    //   }, (err) => {
    //     console.log(err);
    //     this.messageService.showMessage("Error while adding customer into database", "error")
    //   })
    // } else {
    obj.date = new Date();
    this.purchaseService.addItem(obj).then((result) => {
      if (result) {
        this.modal.close(true);
      }
    }, (err) => {
      console.log(err);
      this.messageService.showMessage("Error while adding customer into database", "error")
    })
    // }
  }

  openConeWeightDialog() {
    this.dialogService.dialog(ConeWeightComponent, {}, { 'keyboard': false, 'backdrop': true, 'size': 'width-20vw', 'windowClass': '' }).result.then((response) => {
      if (response) {
        this.customerForm.get('coneWeight').setValue(response);
      }
    }, (error) => {
      this.messageService.showMessage("Error while set cone weight", "error")
    })
  }

  clear() {
    // this.data = {};
    this.customerForm.reset();
  }

  close() {
    this.modal.close();
  }

  deleteItem() {
    let obj = {
      customerId: this.customerForm.controls.customerId.value
    }
    this.purchaseService.removeItem(obj).then((result) => {
      if (result) {
        this.messageService.showMessage("Customer successfully deleted", "success")
        this.modal.close()
      }
    }, (error) => {
      console.log(error);
      this.messageService.showMessage("Error while deleting customer", "error")
    })
  }

  ngOnInit(): void {
    // this.data = this.data.item;
    // if (this.data) {
    //   this.isEditMode = true;
    // }
    // if (this.isEditMode) {
    //   this.itemName = this.data.firstName + " " + this.data.lastName;
    // }
    // console.log("data", this.data)
    this.initCustomerForm();
  }

}
