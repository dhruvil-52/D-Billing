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
  selector: 'app-remaining-item',
  templateUrl: './remaining-item.component.html',
  styleUrls: ['./remaining-item.component.scss']
})
export class RemainingItemComponent implements OnInit {
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
        width: 180,
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
        headerName: 'Remaining Weight in kg.',
        field: 'remainingWeight',
        width: 180,
        headerTooltip: 'Remaining Weight',
        tooltipField: "remainingWeight",
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
      itemName: '',
      itemCode: ''
    })
  }

  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    // params.api.sizeColumnsToFit();
  }

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
