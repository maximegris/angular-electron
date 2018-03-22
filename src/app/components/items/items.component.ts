import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { InventoryService } from '../../providers/inventory.service';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import Item from '../../models/item.model';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  itemsList;
  displayedColumns = [
    'name',
    'price',
    'unit',
    'category',
    'class',
    'edit',
    'delete'
  ];
  OrderedItems: any;
  selectedRowIndex = -1;
  scanCode = '';
  itemToBeAdded: Item = new Item();
  quantity = 1;

  constructor(
    private _inventoryService: InventoryService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    // At component initialization the
    this._inventoryService.getItems().subscribe(items => {
      // assign the todolist property to the proper http response
      this.itemsList = new MatTableDataSource(items);
    });
  }

  openEditDialog(ID: string) {
    const dialogRef = this.dialog.open(EditItemDialogComponent, {
      width: '900px',
      data: { id: ID }
    });
  }

  // highlight the row clicked based on the index of it
  highlight(row) {
    this.selectedRowIndex = row;
  }

  // function for use by the data table to filter the MatTableDataSource
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.itemsList.filter = filterValue;
  }

  deleteItem(id: string) {
    console.log('deleting....');
    this._inventoryService.deleteItemById(id);
  }

  // -----------------------------------------------------------------------------------------
  // push the scanned item to the inventory services invoice list
  updateSelectedItemsByScanCode(item) {
    let isThere = false;
    // check if the item is in the invoice already
    for (let i = 0; i < this._inventoryService.OrderedItems.length; i++) {
      // we are going through each item in the array here...
      if (this._inventoryService.OrderedItems[i].name === item.name) {
        // if we are here, the item has been found already...
        console.log(
          'the quantity before we add the new one was: ' +
            this._inventoryService.OrderedItems[i].orderQty
        );
        this._inventoryService.OrderedItems[i].orderQty += this.quantity;
        console.log(
          'afterwards, the qty of the same item is: ' +
            this._inventoryService.OrderedItems[i].orderQty
        );
        isThere = true;
        break;
      }
    }
    // if we don't find the item in the array, do that logic here.
    if (!isThere) {
      console.log('the item is not in the array, push it.');
      this._inventoryService.OrderedItems.push(item);
    }
    // submit the modified array to the inventory service for safekeeping.
    console.log('about to submit this to the invoiced items subject: ');
    console.log(this._inventoryService.OrderedItems);
    this._inventoryService.sendItemToInvoice(
      this._inventoryService.OrderedItems
    );
  }
  // --------------------------------------------------------------------------------------------
  // checks if the scancode submited isn't null and then sends the job to updateSelectedItemByScanCode
  onSubmitScanCode(scancode: string) {
    // check if the scancode value is not empty
    if (scancode !== '' || null) {
      // if it isn't empty, go and get the item by the scancode from the service.
      this._inventoryService.getItemByScancode(scancode).subscribe(item => {
        this.itemToBeAdded = item.data;
        this.itemToBeAdded.orderQty = this.quantity;
        this.updateSelectedItemsByScanCode(this.itemToBeAdded);
      });
      // after the process has ran, set the focus back to the scancode element
      document.getElementById('scancode').focus();
    }
    this.scanCode = '';
    // throw zthis into the subscription maybe
    // this.updateSelectedItemsByScanCode(this.itemToBeAdded);
  }
  // -----------------------------------------------------------------------------------------------
  // grabs and return us an Item object from the provided scancoe
  getItemByScancode(scancode: string) {
    this._inventoryService.getItemByScancode('850607007335').subscribe(res => {
      console.log('Item by scancode is: ');
      console.log(res);
    });
  }
}

//  --------------------------------------------------------------------------------------------------
// This is just the component for the Dialog that spawns when clicking the edit item icon on the data table. Mostly can be ignored.
@Component({
  selector: 'app-edit-dialog',
  template: `<app-item itemID='{{data.id}}'></app-item>`
})
export class EditItemDialogComponent {
  id = '';

  constructor(
    public dialogRef: MatDialogRef<EditItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  OnInit() {
    this.id = this.data.id;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
