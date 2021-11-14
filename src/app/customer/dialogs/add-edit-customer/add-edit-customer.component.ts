import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../customer.service';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'src/app/services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-customer',
  templateUrl: './add-edit-customer.component.html',
  styleUrls: ['./add-edit-customer.component.scss']
})

export class AddEditCustomerComponent implements OnInit {
  public customerForm: FormGroup;
  public customerId: string;
  public data: any;
  public userName: string;
  public isEditMode: boolean;

  constructor(private customerService: CustomerService,
    private modal: NgbActiveModal,
    private messageService: MessageService,
    private router: Router) {
  }

  initCustomerForm() {
    this.customerForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      mobileNumber: new FormControl(''),
      email: new FormControl(''),
      dueAmount: new FormControl(''),
      date: new FormControl(''),
      customerId: new FormControl(''),
      address: new FormControl(''),
      GSTNumber: new FormControl(''),
    })
    if (this.isEditMode) {
      if (this.data?.mode) {
        delete this.data.mode;
      }
      this.customerForm.setValue(this.data);
    }
  }

  save() {
    let obj = this.customerForm.value;
    if (this.isEditMode) {
      this.customerService.updateCustomer(obj).then((result) => {
        if (result) {
          this.modal.close(true);
        }
      }, (err) => {
        console.log(err);
        this.messageService.showMessage("Error while adding customer into database", "error")
      })
    } else {
      obj.date = new Date();
      this.customerService.addCustomer(obj).then((result) => {
        if (result) {
          this.modal.close(true);
        }
      }, (err) => {
        console.log(err);
        this.messageService.showMessage("Error while adding customer into database", "error")
      })
    }
  }

  clear() {
    this.data = {};
    this.customerForm.reset();
  }

  close() {
    this.modal.close();
  }

  deleteCustomer() {
    let obj = {
      customerId: this.customerForm.controls.customerId.value
    }
    this.customerService.removeCustomer(obj).then((result) => {
      if (result) {
        this.messageService.showMessage("Customer successfully deleted", "success")
        this.modal.close(true)
      }
    }, (error) => {
      console.log(error);
      this.messageService.showMessage("Error while deleting customer", "error")
    })
  }

  showTransaction() {
    this.router.navigate(['payment', this.customerForm.controls.customerId.value])
    this.modal.close();
  }

  ngOnInit(): void {
    this.data = this.data.customer;
    if (this.data) {
      this.isEditMode = true;
    }
    if (this.isEditMode) {
      delete this.data.paymentHistory;
      this.userName = this.data.firstName + " " + this.data.lastName;
    }
    console.log("data", this.data)
    this.initCustomerForm();
  }

}
