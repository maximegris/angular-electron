import { Component, OnInit, HostListener, EventEmitter, Output, ViewChild  } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { OrdersService } from "../../services/orders.service";
import { Order } from "../../models/Order";
import { Slide } from "../../models/Slide";
import { ElectronService } from "../../providers/electron.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  filePaths: any = this.apiService.filePaths;
  orders:  Order[];
  orderType: string = 'active';
  moment: any = this.electron.moment;
  hideOrders: boolean = false;
  showSlideShow: boolean = false;
  showModal: boolean = false;
  slides: Order[];
  positions: any;
  selectedOrder: Order;
  ordersLength: any;
  noOrders: boolean = false;

  constructor(private apiService: ApiService, private electron: ElectronService, private ordersService: OrdersService) { }

  // onChange(event, order) {
  //   console.log(order);
  //   const oldPosition = order.position;
  //   const newPosition = parseInt(event.target.value);
  //   const tempOrders = [...this.orders];
  //   const a = tempOrders.findIndex( el => el.position == oldPosition);
  //   const b = tempOrders.findIndex( el => el.position == newPosition);

  //   this.orders[a].position = newPosition;
  //   this.orders[b].position = oldPosition;

  //   this.slides = this.orders;
  //   console.log('a', a);
  //   console.log('b', b);

  //   console.log('new slide order', this.slides);
  // }

  onChange(event, order) {
    console.log(order);
    const oldPosition = order.position;
    const newPosition = parseInt(event.target.value);
    console.log('new', newPosition);
    const tempOrders = [...this.orders];
    const a = tempOrders.findIndex( el => el.position == oldPosition);
    const b = tempOrders.findIndex( el => el.position == newPosition);

    this.orders[a].position = newPosition;
    this.orders[b].position = oldPosition;

    this.slides = this.orders;
    console.log('a', a);
    console.log('b', b);

    console.log('new slide order', this.slides);
    ///
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.hideOrders = false;
      this.showSlideShow = false;
    }
  }

  ngOnInit() {
      this.orders = this.ordersService.getOrders();
      this.slides = this.orders;

      this.ordersLength = [];
      for(let i = 1; i <= this.orders.length; i++) {
        this.ordersLength.push(i);
      }

      if(this.orders.length < 1) {
        this.orderType = 'test';
        this.orders = this.ordersService.getOrders('test');
        this.slides = this.orders;
        Array.from(document.querySelectorAll('.tab-item')).forEach( e => e.classList.remove('is-active'));
        document.querySelectorAll('.tab-item')[3].classList.add('is-active');
      }
  }
  fullSreen(event, order) {

    this.selectedOrder = order;

    if(this.orderType === 'expired') {
      return null;
    }

    this.hideOrders = true;
    this.showSlideShow = true;
    document.documentElement.webkitRequestFullScreen();
  }

  activeRentals() {
    const orders = this.apiService.loadCachedOrders();
    return orders.filter(order => this.moment().isBetween(order.start_date, order.end_date));
  }

  onShowModal() {
    console.log('show the modal');
  }

  onNewOrders(orders) {
    console.log(orders);
    this.orders = orders.orders;
    this.orderType = orders.type;
    this.slides = this.orders;
  }

  displayModal(param) {
    this.showModal = param;
  }

}
