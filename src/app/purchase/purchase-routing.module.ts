import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseListComponent } from './components/purchase-list/purchase-list.component';

const routes: Routes = [
  { path: '', component: PurchaseListComponent },
  { path: 'list', component: PurchaseListComponent }
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

export class PurchaseRoutingModule { }
