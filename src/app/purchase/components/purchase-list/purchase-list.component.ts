import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/dialog.service';
import { MessageService } from 'src/app/services/message.service';
import { PurchaseService } from '../../purchase.service';
import { AddItemComponent } from '../../dialogs/add-item/add-item.component';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.scss']
})
export class PurchaseListComponent implements OnInit {
  public gridApi: any; // holds grid Api data
  public gridColumnApi: any; // holds grid column  Api data
  public columnDefs: ColDef[]; // holds column defination data
  public defaultColDef: any; // holds default colu
  public rowData: any = []; // hols grid data
  public name: string;
  public itemForm: FormGroup;

  constructor(private purchaseService: PurchaseService, private fb: FormBuilder, private router: Router,
    public dialog: MatDialog, private dialogService: DialogService,
    public messageService: MessageService) {
    this.columnDefs = [
      {
        headerName: 'Bill Number',
        field: 'billNumber',
        width: 110,
        headerTooltip: 'Bill Number',
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
        headerName: 'Buy From',
        field: 'buyFrom',
        width: 200,
        headerTooltip: 'Buy From',
        tooltipField: "buyFrom",
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
        width: 95,
        headerTooltip: 'Buy Date',
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
        headerName: 'Item',
        field: 'itemName',
        width: 180,
        headerTooltip: 'Item',
        tooltipField: "itemName",
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
        headerName: 'Item Code',
        field: 'itemCode',
        width: 140,
        headerTooltip: 'Item Code',
        tooltipField: "itemCode",
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
        headerName: 'Gross Wt.',
        field: 'grossWeight',
        width: 95,
        headerTooltip: 'Gross Weight',
        tooltipField: "grossWeight",
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
        headerName: 'Piece',
        field: 'noOfPcs',
        width: 75,
        headerTooltip: 'Piece',
        tooltipField: "noOfPcs",
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
        headerName: 'Cone Wt.',
        field: 'coneWeight',
        width: 93,
        headerTooltip: 'Cone Weight',
        tooltipField: "coneWeight",
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
        headerName: 'Net Wt.',
        field: 'netWeight',
        width: 85,
        headerTooltip: 'Net Weight',
        tooltipField: "netWeight",
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
        headerName: 'Rate',
        field: 'rate',
        width: 75,
        headerTooltip: 'Rate',
        tooltipField: "rate",
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
        headerName: 'Amount',
        field: 'amount',
        width: 93,
        headerTooltip: 'Amount',
        tooltipField: "amount",
        type: 'rightAligned',
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

  initItemForm() {
    this.itemForm = this.fb.group({
      billNumber: '',
      buyFrom: '',
      itemName: '',
      itemCode: '',
      startDate: '',
      endDate: ''
    })
  }

  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    // params.api.sizeColumnsToFit();
  }

  addItem() {
    // let dialogRef = this.dialog.open(AddEditCustomerComponent, {
    //   width: '250px',
    //   data: { name: this.name }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.name = result;
    // });

    this.dialogService.dialog(AddItemComponent, {}, { 'keyboard': false, 'backdrop': true, 'size': 'width-40vw', 'windowClass': '' }).result.then((response) => {
      if (response) {
        console.log(response);
        this.messageService.showMessage("Item added successfully", "success");
        this.getItem();
      } else {
        this.messageService.showMessage("Error while adding Item", "error")
      }
    }, (error) => {
      this.messageService.showMessage("Error while adding Item", "error")
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

  clear() {
    this.itemForm.reset();
    this.getItem()
  }

  getItem() {
    let obj = this.itemForm.getRawValue();
    console.log(obj)
    this.purchaseService.getItem(obj).then((result) => {
      if (result) {
        this.rowData = result;
        console.log(this.rowData)
      }
    }, (error) => {
      ``
      console.log(error);
    })
  }

  ngOnInit(): void {
    this.initItemForm();
    this.getItem();
  }

}

