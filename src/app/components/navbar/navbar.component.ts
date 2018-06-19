import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Order } from '../../models/Order';
import { ApiService } from "../../services/api.service";
import { ElectronService } from "../../providers/electron.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  moment: any = this.electron.moment;
  orders: any;

  @Output() newOrders: EventEmitter<any> = new EventEmitter();

  constructor(private apiService : ApiService, private electron: ElectronService) { }

  ngOnInit() {
    // this.loadCached();
  }

  filterOrders(param) {
    const orders = this.apiService.loadCachedOrders();
    let filtered;
    switch (param) {
      case "active":
        // filtered = orders.filter(order => this.moment().isSameOrBefore(this.moment(order.end_date)));
        filtered = orders.filter(order => this.moment().isBetween(order.start_date, order.end_date));
      break;
      case "upcoming":
        filtered = orders.filter(order => this.moment().isSameOrBefore(this.moment(order.start_date)));
      break;
      case "expired":
        filtered = orders.filter(order => this.moment().isAfter(this.moment(order.end_date)));
      break;
      case "test":
      break;
    }
    this.newOrders.emit(filtered);
  }

  logout() {
    this.apiService.logout();
  }




  loadCached(param) {
    console.log(this.apiService.loadCachedOrders());
    // this.apiService.loadCachedOrders().forEach(order => {
      this.newOrders.emit(this.apiService.loadCachedOrders());
    // });
  }



}
