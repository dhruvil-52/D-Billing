import { Component, OnInit } from '@angular/core';
import { NgxPrintModule } from 'ngx-print';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public title = "D-Billing";

  constructor() { }

  public generatePDF() {

  }
  ngOnInit(): void {
  }

}
