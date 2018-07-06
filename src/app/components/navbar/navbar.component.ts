import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { Order } from '../../models/Order';
import { ApiService } from "../../services/api.service";
import { ElectronService } from "../../providers/electron.service";
import { OrdersService } from "../../services/orders.service";
import { viewClassName } from '@angular/compiler';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  moment: any = this.electron.moment;
  orders: any;
  client: string;
  @ViewChild('testTab') testTab  : any;

  @Output() newOrders: EventEmitter<any> = new EventEmitter();

  constructor(private apiService : ApiService, private electron: ElectronService, private ordersService: OrdersService) { }

  ngOnInit() {
    // this.loadCached();
    // this.testTab.nativeElement.dispatchEvent(new Event('click'));

    // console.log('test-tab', this.testTab.nativeElement)

    this.client = this.apiService.getClient().name;
  }

  filterOrders(event, param) {
    Array.from(document.querySelectorAll('.tab-item')).forEach( e => e.classList.remove('is-active'));
    event.target.classList.add('is-active');

    const orders = {
      orders: this.ordersService.getOrders(param),
      type: param
    }

    this.newOrders.emit(orders);
  }


  logout() {
    this.apiService.logout();
  }

  showModal() {
    document.querySelector('app-modal').removeAttribute('hidden');
  }

  reload() {
    this.apiService.reAuth();
    setTimeout(function(){
      location.reload();
    }, 3000);
    // location.reload();
  }


}
