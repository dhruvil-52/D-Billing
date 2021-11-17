import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './components/payment/payment.component';
import { BillHistoryComponent } from './components/bill-history/bill-history.component';

const routes: Routes = [
  { path: '', component: PaymentComponent },
  // { path: 'payment', component: PaymentComponent },
  // { path: 'payment/:custId', component: PaymentComponent },
  { path: ':custId', component: PaymentComponent },
  { path: 'bill/history', component: BillHistoryComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class PaymentRoutingModule { }
