import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseListComponent } from './components/purchase-list/purchase-list.component';
import { AddItemComponent } from './dialogs/add-item/add-item.component';
import { RemainingItemComponent } from './components/remaining-item/remaining-item.component';
import { AgGridModule } from 'ag-grid-angular';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxPrintModule } from 'ngx-print';
import { PurchaseRoutingModule } from './purchase-routing.module';


@NgModule({
  declarations: [PurchaseListComponent, AddItemComponent, RemainingItemComponent],
  imports: [
    CommonModule,
    CommonModule,
    AgGridModule.withComponents([]),
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    BsDatepickerModule.forRoot(),
    NgxPrintModule,
    PurchaseRoutingModule
  ],
  entryComponents: [AddItemComponent]
})
export class PurchaseModule { }
