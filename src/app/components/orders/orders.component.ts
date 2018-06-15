import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Order } from "../../models/Order";
import { ElectronService } from "../../providers/electron.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: any;
  thumbPath: string;
  fullPath: string = this.apiService.fullPath;
  moment: any = this.electron.moment;

  constructor(private apiService: ApiService, private electron: ElectronService) { }

  ngOnInit() {
    // document.addEventListener('keydown', this.slideNav);
    // console.log(this.apiService.cahceThumbs());
    // this.apiService.cacheOrders();
    // this.apiService.getStuff();
    this.thumbPath = this.apiService.thumbPath;
    // this.apiService.makeDirs();
    // this.apiService.cacheFullImgs();
    this.orders = this.activeRentals();
    // console.log(this.activeRentals());

  }

  fullSreen(event) {
    const filepath = event.target.src;
    event.target.src = filepath.replace('thumbs', 'full');
    event.target.webkitRequestFullscreen();

  }

  slideNav(e) {
    console.log(e);
    if(e.key === "ArrowLeft") {
      document.webkitExitFullscreen();
    }
  }


  activeRentals() {
    const orders = this.apiService.loadCachedOrders();
    return orders.filter(order => this.moment().isBetween(order.start_date, order.end_date));
  }

  onNewOrders(orders: Order[]) {
    console.log(orders);
    this.orders = orders;
  }







}
