import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../providers/inventory.service';
import { CurrencyPipe } from '@angular/common';
import { Response } from '@angular/http';
import Item from '../../models/item.model';



@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public newItem: Item = new Item();
    public editItem: Item;
    // itemsList: Item[];
    itemsList;


    displayedColumns = ['id', 'name', 'price', 'unit'];

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.itemsList.filter = filterValue;
    }


    constructor(private _inventory: InventoryService) { }

    ngOnInit(): void { }
}
