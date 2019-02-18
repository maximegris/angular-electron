import { Component, OnInit, HostListener, EventEmitter, Output, ViewChild, Directive, ElementRef } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { OrdersService } from "../../services/orders.service";
import { Order } from "../../models/Order";
import { Slide } from "../../models/Slide";
import { ElectronService } from "../../providers/electron.service";

// @Directive({
//   selector: '[thumb]',
//   exportAs: 'thumb',
// })
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  filePaths: any = this.apiService.filePaths;
  orders: Order[];
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
  domain: string;
  // @ViewChild('thumb') thumb: ElementRef;
  constructor(private apiService: ApiService, private electron: ElectronService, private ordersService: OrdersService) {
    this.domain = this.apiService.domain;
  }



  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.hideOrders = false;
      this.showSlideShow = false;
      document.body.classList.remove('overflow');
      document.body.style.backgroundColor = "white";
    }
  }

  triggerThumb(thumb) {
    console.log(thumb)
    return thumb.click()
  }

  rePurchase(order) {
    console.log('platform', process.platform)
    let uri = this.apiService.webSite + '/productDetails\\;id=' + order.image_id
    console.log(uri)
    let execStr;
    if (process.platform === 'win32') {
      execStr = 'start ' + uri;
    } else if (process.platform === 'darwin') {
      execStr = 'open ' + uri;
    } else { // *linux
      execStr = 'xdg-open ' + uri;
    }
    this.electron.childProcess.execSync(execStr);
  }

  ngOnInit() {
    this.orders = this.ordersService.getOrders();
    this.slides = this.orders;
    console.log('this.orders', this.orders)

    this.ordersLength = [];
    for (let i = 1; i <= this.orders.length; i++) {
      this.ordersLength.push(i);
    }

    if (this.orders.length < 1) {
      this.orderType = 'test';
      this.orders = this.ordersService.getOrders('test');
      this.slides = this.orders;
      Array.from(document.querySelectorAll('.tab-item')).forEach(e => e.classList.remove('is-active'));
      document.querySelectorAll('.tab-item')[3].classList.add('is-active');
    }
  }
  fullScreen(event, order) {

    this.selectedOrder = order;

    // console.log('Selected order', order);

    if (this.orderType === 'expired') {
      return null;
    }

    this.hideOrders = true;
    this.showSlideShow = true;
    document.body.style.backgroundColor = "black";
    document.body.classList.add('overflow');


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

  onChange(event, order) {
    const pos = parseInt(event.target.value) - 1;

    const arr = [...this.orders];

    let fresh = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id !== order.id) {
        fresh.push(arr[i]);
      }
    }

    let final = [];
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      if (pos === i) {
        count++;
        order.position = i + 1;
        final.push(order);
        if (fresh[i] !== undefined) {
          fresh[i].position = count + 1;
          final.push(fresh[i]);
        }

      } else {
        if (fresh[i] !== undefined) {
          fresh[i].position = count + 1;
          final.push(fresh[i]);
        }
      }
      count++;
    }

    this.orders = final;
    this.slides = this.orders;

    console.log("ReOrdered", final);
  }

}
