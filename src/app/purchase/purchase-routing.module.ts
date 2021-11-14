import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseListComponent } from './components/purchase-list/purchase-list.component';
import { RemainingItemComponent } from './components/remaining-item/remaining-item.component';

const routes: Routes = [
  { path: '', component: PurchaseListComponent },
  { path: 'list', component: PurchaseListComponent },
  { path: 'remaining-item', component: RemainingItemComponent }
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
