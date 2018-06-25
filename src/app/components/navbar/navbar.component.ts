import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Order } from '../../models/Order';
import { ApiService } from "../../services/api.service";
import { ElectronService } from "../../providers/electron.service";
import { OrdersService } from "../../services/orders.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  moment: any = this.electron.moment;
  orders: any;
  client: string;

  @Output() newOrders: EventEmitter<any> = new EventEmitter();

  constructor(private apiService : ApiService, private electron: ElectronService, private ordersService: OrdersService) { }

  ngOnInit() {
    // this.loadCached();
    this.client = this.apiService.getClient().name;
  }

  filterOrders(event, param) {
    Array.from(document.querySelectorAll('.tab-item')).forEach( e => e.classList.remove('is-active'));
    event.target.classList.add('is-active');

    // const orders = this.apiService.loadCachedOrders();
    // let filtered: any = {};
    // filtered.type = param;
    // switch (param) {
    //   case "active":
    //     filtered.orders = orders.filter(order => this.moment().isBetween(order.start_date, order.end_date));
    //   break;
    //   case "upcoming":
    //     filtered.orders = orders.filter(order => this.moment().isSameOrBefore(this.moment(order.start_date)));
    //   break;
    //   case "expired":
    //     filtered.orders = orders.filter(order => this.moment().isAfter(this.moment(order.end_date)));
    //   break;
    //   case "test":
    //   break;
    // }

    this.newOrders.emit(this.ordersService.allOrders(param));
  }


  logout() {
    this.apiService.logout();
  }

  showModal() {
    document.querySelector('app-modal').removeAttribute('hidden');
  }







  // loadCached(param) {
  //   console.log(this.apiService.loadCachedOrders());
  //   // this.apiService.loadCachedOrders().forEach(order => {
  //     this.newOrders.emit(this.apiService.loadCachedOrders());
  //   // });
  // }



}
