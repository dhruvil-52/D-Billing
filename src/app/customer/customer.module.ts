import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { CustomerComponent } from './components/customer/customer.component';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { AddEditCustomerComponent } from './dialogs/add-edit-customer/add-edit-customer.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxPrintModule } from 'ngx-print';


@NgModule({
  declarations: [CustomerComponent, CustomerListComponent, AddEditCustomerComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    AgGridModule.withComponents([]),
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    BsDatepickerModule.forRoot(),
    NgxPrintModule
  ],
  entryComponents: [AddEditCustomerComponent]
})

export class CustomerModule { }
