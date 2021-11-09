import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GenerateSellBillComponent } from './components/generate-sell-bill/generate-sell-bill.component';

const sellRoute: Routes = [
  { path: '', component: GenerateSellBillComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(sellRoute)
  ],
  exports: [
    RouterModule
  ]
})

export class GenerateSellBillRoutingModule { }
