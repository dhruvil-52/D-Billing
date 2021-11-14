import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { CustomerService } from '../../../customer/customer.service';
import * as moment from 'moment-timezone';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  public customerForm: FormGroup;
  public columnDefs: ColDef[];
  public defaultColDef: any;
  public rowData = [];
  public gridOptions: any;
  public gridApi: any;
  public gridColumnApi: any;
  public myDetails: any;
  public userDetail: any;
  public showMode: boolean = false;
  public customerId: any;


  constructor(private fb: FormBuilder, private customerService: CustomerService) {
    this.columnDefs = [
      {
        headerName: 'Bill No',
        field: 'billNumber',
        width: 150,
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
        headerName: 'Date',
        field: 'date',
        width: 200,
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
        headerName: 'Amount',
        field: 'dueAmount',
        width: 200,
        headerTooltip: 'Amount',
        tooltipField: "dueAmount",
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
      }
    ]
    this.defaultColDef = {
      enableValue: true,
      enableRowGroup: true,
      enablePivot: true,
      sortable: true,
      resizable: true,
      searchable: true,
      suppressMaxRenderedRowRestriction: true,
      suppressColumnVirtualisation: true,
      sortingOrder: ['asc', 'desc'],
      floatingFilterComponentParams: { suppressFilterButton: true },
    };
  }

  initCustomerForm() {
    this.customerForm = this.fb.group({
      name: '',
      startDate: '',
      endDate: ''
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

  setDefaultValue() {
    this.customerForm.get('startDate').patchValue(moment().startOf('month'));
    this.customerForm.get('endDate').patchValue(moment().endOf('month'));
  }

  reset() {
    this.initCustomerForm();
    this.setDefaultValue();
  }

  clear() {
    this.initCustomerForm();
  }

  print() {
    this.getMyProfile();
    this.showMode = true;
    setTimeout(() => {
      console.log("print");
      window.print()
    }, 2000)
  }

  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  }

  getCustomerData() {
    let obj = this.customerForm.getRawValue();
    this.customerService.getCustomer(obj).then((result) => {
      if (result) {
        if (result[0] && result[0].paymentHistory) {
          this.rowData = result[0].paymentHistory;
        } else {
          this.rowData = [];
        }
        this.userDetail = result[0];
      }
    }, (error) => {
      console.log(error);
    })
  }

  getMyProfile() {
    this.customerService.getMyProfile().then((result) => {
      this.myDetails = result[0];
    }).catch((error) => {
      console.log("error", error)
    });
  }

  ngOnInit(): void {
    // this.customerId = this.route.snapshot.params.custId;

    // this.route.queryParams
    //   .subscribe(params => {
    //     console.log(params); // { orderby: "price" }
    //     this.customerId = params.custId;
    //     console.log(this.custId); // price
    //   }
    // );

    this.initCustomerForm();
    this.customerId = "dhruviltalaviya@1"
    console.log("-->", this.customerId)
    // when component open from customer screen
    if (this.customerId) {
      this.customerForm.get('startDate').patchValue(moment().startOf('month'));
      this.getCustomerData();
    }
  }

}
