import {Component, Input, OnInit} from '@angular/core';
import { InventoryService } from '../../providers/inventory.service'
import { ActivatedRoute } from '@angular/router';

// Model
import Item from '../../models/item.model';

// RxJs Imports
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  item: Item = new Item();
  subscription: Subscription;
  @Input() itemID: string;
  units = ['BOX', 'CASE', 'SINGLE'];

  constructor(private _inventoryService: InventoryService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    // this.itemID = this.route.snapshot.params['id'];
    console.log(' from the edit component the id is: ' + this.itemID);
    // this.subscription = this._inventoryService.getSelectedItem().subscribe(item => {
    //   this.item = item
      // console.log('form edit item, item is: ' + item + 'at time of init');
    // });
    // console.log('From edit item component: the item is ' + this.item.name);
    this._inventoryService.getItemById(this.itemID).subscribe(item => {
      this.item = item.data;
    })
  }

  sendEdit(item: Item) {
    this._inventoryService.editTodo(item).subscribe(res => {
      console.log('Update Succesful')
    }, err => {
      console.error('Update Unsuccesful')
    })
    this._inventoryService.getItems();
  }

}
