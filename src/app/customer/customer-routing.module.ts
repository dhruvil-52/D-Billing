import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './components/customer/customer.component';

const customerRoute: Routes = [
  { path: '', component: CustomerComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(customerRoute)
  ],
  exports: [
    RouterModule
  ]
})

export class CustomerRoutingModule { }
