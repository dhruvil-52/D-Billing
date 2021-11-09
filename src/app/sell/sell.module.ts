import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateSellBillComponent } from './components/generate-sell-bill/generate-sell-bill.component';
import { GenerateSellBillRoutingModule } from './sell-routing.module';
import { NgxPrintModule } from 'ngx-print';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [GenerateSellBillComponent],
  imports: [
    CommonModule,
    GenerateSellBillRoutingModule,
    NgxPrintModule,
    FormsModule,
    MatInputModule
  ]
})
export class SellModule { }
