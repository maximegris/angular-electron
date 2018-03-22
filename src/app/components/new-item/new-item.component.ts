import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../providers/inventory.service'
import { NavComponent } from '../nav/nav.component';
import Item from '../../models/item.model';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss']
})
export class NewItemComponent implements OnInit {
  public newItem: Item = new Item();
  submitted = false;
  units = ['BOX', 'CASE', 'SINGLE'];
  onSubmit() { this.submitted = true; };

  addNewItem() {
    this._inventory.createItem(this.newItem).subscribe(result => {
      this.newItem = new Item();
    })
  }

  constructor(private _inventory: InventoryService) {
  }

  ngOnInit() {
    // this._inventory.instanceVar = 'from add item';
  }

}
