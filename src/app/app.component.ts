import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'D-Billing';
  model: NgbDateStruct;
  constructor(private calendar: NgbCalendar) {

  }
  ngOnInit() {
    // this.model = this.calendar.getToday();
  }
}
