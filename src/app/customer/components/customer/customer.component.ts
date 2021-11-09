import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../customer.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment-timezone';
import { ColDef } from 'ag-grid-community'
import { NgxPrintModule } from 'ngx-print';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  public customerForm: FormGroup;
  public route: ActivatedRoute;
  public userDetail: any;
  public customerId: string;
  public paymentHistory: Array<any> = [];
  public model: any
  public columnDefs: ColDef[];
  public defaultColDef: any;
  public rowData = [];
  public gridOptions: any;
  public gridApi: any;
  public gridColumnApi: any;
  public gridLength: number;
  public showMode: boolean = false;
  public myDetails: any;

  constructor(private customerService: CustomerService, private fb: FormBuilder) {
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

  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  }

  print() {
    this.showMode = true;
    setTimeout(() => {
      console.log("print");
      window.print()
    }, 2000)
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

  initCustomerForm() {
    this.customerForm = this.fb.group({
      startDate: '',
      endDate: ''
    })
    this.customerForm.get('startDate').patchValue(moment().startOf('month'));
    this.customerForm.get('endDate').patchValue(moment().endOf('month'));
  }

  search() {
  }

  reset() {

  }

  clear() {

  }

  getCustomerData() {
    let obj = { customerId: this.customerId };
    this.customerService.getCustomer(obj).then((result) => {
      if (result) {
        this.rowData = result[0].paymentHistory;
        this.gridLength = this.rowData.length * 33;
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

    this.customerId = "dhruviltalaviya@1"
    console.log("-->", this.customerId)
    this.initCustomerForm();
    this.getCustomerData();
    this.getMyProfile();
  }

}
