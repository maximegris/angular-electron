import { Component, OnInit, OnDestroy } from '@angular/core';
import { InventoryService } from '../../providers/inventory.service';
import { MatTableDataSource } from '@angular/material';
import Item from '../../models/item.model';
import Customer from '../../models/customer.model';
import {Subscription} from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/publishReplay';



@Component({
    selector: 'app-invoice',
    templateUrl: './invoice.component.html',
    styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
    itemsSubscription: Subscription;
    itemsMatTableData: MatTableDataSource<Item>;
    customerIsSelected = false;
    selectedCustomer: Customer;
    items: Array<Item>;
    total = 0;
    displayedColumns = ['name', 'price', 'unit', 'Qty'];

    constructor(private _inventoryService: InventoryService) {
    }


    ngOnInit() {
        this.itemsMatTableData = new MatTableDataSource(this._inventoryService.savedInvoice);
        console.log('am i happening???');
        this.itemsSubscription = this._inventoryService.getInvoicedItems()
        .subscribe(items => {
            console.log(items.values);
            this.itemsMatTableData = new MatTableDataSource(items);
            this.items = items;
            this.total = 0;
            this.items.forEach(element => {
                this.total += (element.price * element.orderQty);
            });
            console.log(this.itemsMatTableData);
            console.log('we are subscribed.');
        });

        this.subscribeToSelectedCustomer();
    }

    subscribeToSelectedCustomer() {
        this._inventoryService.getSelectedCustomer().subscribe(customer => {
            this.customerIsSelected = true;
            console.log('customer selected is: ' + this.customerIsSelected);
            this.selectedCustomer = customer;
        })
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnDestroy() {
        // Called once, before the instance is destroyed.
        // Add 'implements OnDestroy' to the class.
        // this._inventoryService.savedInvoice = this.items;
        // this._inventoryService.setSelectedCustomer(this.selectedCustomer, true);
        // this.itemsSubscription.unsubscribe();
    }

}
