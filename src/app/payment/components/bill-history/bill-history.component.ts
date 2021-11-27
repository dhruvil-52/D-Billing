import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { PaymentService } from '../../payment.service';

@Component({
  selector: 'app-bill-history',
  templateUrl: './bill-history.component.html',
  styleUrls: ['./bill-history.component.scss']
})
export class BillHistoryComponent implements OnInit {
  public billHistoryForm: FormGroup;
  public columnDefs: ColDef[];
  public defaultColDef: any;
  public rowData = [];
  public gridOptions: any;
  public gridApi: any;
  public gridColumnApi: any;

  constructor(private fb: FormBuilder, private paymentService: PaymentService, private router: Router) {
    this.columnDefs = [
      {
        headerName: 'Date',
        field: 'date',
        width: 150,
        headerTooltip: 'Date',
        filter: 'agMultiColumnFilter',
        tooltipField: "date",
        sortable: true,
        filterParams: {
          filters: [
            {
              filter: 'agDateColumnFilter',
              filterParams: {
                buttons: ['clear'], inRangeInclusive: true, comparator: this.dateFilterParam,
              },
            },
            {
              filter: 'agSetColumnFilter',
              filterParams: { buttons: ['clear'] },
            },
          ],
        },
      },
      {
        headerName: 'customer Name',
        field: 'customerName',
        width: 200,
        headerTooltip: 'customer Name',
        tooltipField: "customerName",
        filter: "agMultiColumnFilter",
        filterParams: {
          filters: [
            {
              filter: 'agTextColumnFilter',
              filterParams: { buttons: ['clear'] },

            },
            {
              filter: 'agSetColumnFilter',
              filterParams: { buttons: ['clear'] },
            },
          ],
        },
      },
      {
        headerName: 'Bill No',
        field: 'billNumber',
        width: 100,
        headerTooltip: 'Bill No',
        tooltipField: "billNumber",
        filter: "agMultiColumnFilter",
        filterParams: {
          filters: [
            {
              filter: 'agTextColumnFilter',
              filterParams: { buttons: ['clear'] },

            },
            {
              filter: 'agSetColumnFilter',
              filterParams: { buttons: ['clear'] },
            },
          ],
        }
      },
      {
        headerName: 'Amount',
        field: 'payAmount',
        width: 150,
        headerTooltip: 'Amount',
        tooltipField: "payAmount",
        filter: "agMultiColumnFilter",
        type: 'rightAligned',
        filterParams: {
          filters: [
            {
              filter: 'agTextColumnFilter',
              filterParams: { buttons: ['clear'] },

            },
            {
              filter: 'agSetColumnFilter',
              filterParams: { buttons: ['clear'] },
            },
          ],
        },
      },
      {
        headerName: 'payment mode',
        field: 'paymentMode',
        width: 150,
        headerTooltip: 'payment mode',
        tooltipField: "paymentMode",
        filter: "agMultiColumnFilter",
        filterParams: {
          filters: [
            {
              filter: 'agTextColumnFilter',
              filterParams: { buttons: ['clear'] },

            },
            {
              filter: 'agSetColumnFilter',
              filterParams: { buttons: ['clear'] },
            },
          ],
        },
      },
      {
        headerName: 'Show Bill',
        field: '',
        cellClass: "grid-cell-centered",
        width: 140,
        cellRenderer: (params) => {
          return `<i class="fa fa-external-link" action="openBill"></i>`;
        }
      }
    ]
  }


  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  }

  public onRowClicked(data) {
    if (data.event.target !== undefined) {
      let action = data.event.target.getAttribute("action")
      switch (action) {
        case "openBill":
          this.openBill(data.data.billNumber)
      }
    }
  }

  openBill(billNo) {
    console.log(billNo)
    this.router.navigate(['sell',billNo])
  }

  initCustomerForm() {
    this.billHistoryForm = this.fb.group({
      billNumber: '',
      startDate: '',
      customerName: ''
    })
  }

  dateFilterParam(filterLocalDateAtMidnight, cellValue) {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var celldate = new Date(dateAsString);
    var dt = celldate.toISOString().slice(0, 10);
    var Coldt = new Date(dt);
    Coldt.setHours(0, 0, 0, 0);
    var filterDt = filterLocalDateAtMidnight;

    if (filterDt.getTime() == Coldt.getTime()) {
      return 0;
    }
    if (Coldt < filterDt) {
      return -1;
    }
    if (Coldt > filterDt) {
      return 1;
    }
  };

  getBillHistoryData() {
    let obj = this.billHistoryForm.getRawValue();
    console.log(obj)
    this.paymentService.getBill(obj).then((result: any) => {
      this.rowData = result;
    })
  }

  reset() {
    this.initCustomerForm();
    this.getBillHistoryData();
  }

  clear() {
    this.initCustomerForm();
  }

  ngOnInit(): void {
    this.initCustomerForm();
    this.getBillHistoryData();
  }

}
