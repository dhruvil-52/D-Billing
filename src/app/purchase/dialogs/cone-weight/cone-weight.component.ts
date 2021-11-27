import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cone-weight',
  templateUrl: './cone-weight.component.html',
  styleUrls: ['./cone-weight.component.scss']
})
export class ConeWeightComponent implements OnInit {

  public first: number;
  public firstTotal: number;
  public second: number;
  public secondTotal: number;
  public third: number;
  public thirdTotal: number;
  public forth: number;
  public forthTotal: number;
  public fifth: number;
  public fifthTotal: number;
  public sixth: number;
  public sixthTotal: number;

  public total: number;
  constructor(
    private modal: NgbActiveModal,
  ) { }

  getTotal(no) {
    switch (no) {
      case 1:
        this.firstTotal = this.first * 25;
        break;
    }
  }

  clear() {
    // this.data = {};
    // this.customerForm.reset();
  }

  close() {
    this.modal.close();
  }

  save() {
    this.modal.close(this.total)
  }

  ngOnInit(): void {
  }


}
