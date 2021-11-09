import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { CustomerService } from '../../customer.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddEditCustomerComponent } from '../../dialogs/add-edit-customer/add-edit-customer.component';
import { DialogService } from 'src/app/services/dialog.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  public gridApi: any; // holds grid Api data
  public gridColumnApi: any; // holds grid column  Api data
  public columnDefs: ColDef[]; // holds column defination data
  public defaultColDef: any; // holds default colu
  public rowData: any = []; // hols grid data
  public name: string;
  public customerForm: FormGroup;

  constructor(private customerService: CustomerService, private fb: FormBuilder, private router: Router,
    public dialog: MatDialog, private dialogService: DialogService,
    public messageService: MessageService) {
    this.columnDefs = [
      {
        headerName: 'Customer',
        field: 'firstName',
        width: 200,
        headerTooltip: 'Customer',
        tooltipField: "firstName",
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
        cellRenderer: params => {
          if (params.data?.firstName && params.data?.lastName) {
            return params.data.firstName + " " + params.data.lastName;
          }
          if (params.data?.firstName) {
            return params.data.firstName;
          }
          if (params.data?.lastName) {
            return params.data.lastName;
          }
        },
      },
      {
        headerName: 'Due',
        field: 'dueAmount',
        width: 100,
        headerTooltip: 'Due Amount',
        tooltipField: "dueAmount",
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
        headerName: 'Mobile No.',
        field: 'mobileNumber',
        width: 140,
        headerTooltip: 'Mobile Number',
        tooltipField: "mobileNumber",
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
        headerName: 'Email',
        field: 'email',
        width: 200,
        headerTooltip: 'Email',
        tooltipField: "email",
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
        headerName: 'Address',
        field: 'address',
        width: 410,
        headerTooltip: 'Address',
        tooltipField: "address",
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
        headerName: 'GST No.',
        field: 'GSTNumber',
        width: 140,
        headerTooltip: 'GST Number',
        tooltipField: "GSTNumber",
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
        headerName: '',
        width: 36,
        headerTooltip: 'Open Customer',
        cellRenderer: (params) => {
          return `<a  target="_blank">
                  <i class="fa fa-edit cursor-pointer" title="Open Customer" action="OpenCustomer"></i>
          </a>`;
        }
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
      name: ''
    })
  }

  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    // params.api.sizeColumnsToFit();
  }

  addCustomer() {
    // let dialogRef = this.dialog.open(AddEditCustomerComponent, {
    //   width: '250px',
    //   data: { name: this.name }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.name = result;
    // });

    this.dialogService.dialog(AddEditCustomerComponent, { }, { 'keyboard': false, 'backdrop': true, 'size': 'width-50vw', 'windowClass': '' }).result.then((response) => {
      if (response) {
        console.log(response);
        this.messageService.showMessage("Customer added successfully", "success");
        this.getCustomerData();
      } else {
        this.messageService.showMessage("Error while adding customer", "error")
      }
    }, (error) => {
      this.messageService.showMessage("Error while adding customer", "error")
    })
  }

  public onRowClicked(data) {
    if (data.event.target !== undefined) {
      let action = data.event.target.getAttribute("action")
      switch (action) {
        case "OpenCustomer":
          this.openCustomer(data.data)
      }
    }
  }

  openCustomer(customer) {
    // console.log("data", customer)
    // if (customer) {
    //   this.router.navigate(['customer', customer.customerId])
    // } else {
    //   this.router.navigate(['customer'])
    // }
    this.dialogService.dialog(AddEditCustomerComponent, { customer }, { 'keyboard': false, 'backdrop': true, 'size': 'width-50vw', 'windowClass': '' }).result.then((response) => {
      if (response) {
        console.log(response);
        this.getCustomerData();
        this.messageService.showMessage("Customer added successfully", "success")
      } else {
        this.messageService.showMessage("Error while adding customer", "error")
      }
    }, (error) => {
      this.messageService.showMessage("Error while adding customer", "error")
    })
  }


  getCustomerData() {
    let obj = this.customerForm.getRawValue();
    console.log(obj)
    this.customerService.getCustomer(obj).then((result) => {
      if (result) {
        this.rowData = result;
      }
    }, (error) => {
      console.log(error);
    })
  }

  ngOnInit(): void {
    this.initCustomerForm();
    this.getCustomerData();
  }

}
