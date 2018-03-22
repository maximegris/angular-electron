import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { InventoryService } from '../../providers/inventory.service';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import Item from '../../models/item.model';
import Customer from '../../models/customer.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  Customers;
  selectedCustomer;

  displayedColumns = [
    'number',
    'name',
    'city'
  ];
  selectedRowIndex = -1;

  constructor(
    private _inventoryService: InventoryService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    console.log('getting customer data...');
    // At component initialization the
    this._inventoryService.getCustomers().subscribe( customers => {
      // assign the todolist property to the proper http response
      console.log(customers);
      this.Customers = new MatTableDataSource(customers);
    });
  }

  selectCustomer(customer) {
    this._inventoryService.setSelectedCustomer(customer, true);
    console.log('selected: ' + customer.customerName);
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
    this.Customers.filter = filterValue;
  }

  deleteItem(id: string) {
    console.log('deleting....');
    this._inventoryService.deleteItemById(id);
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
