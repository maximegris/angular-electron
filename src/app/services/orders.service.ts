import { Injectable } from '@angular/core';
import { Order } from "../models/Order";
import { ApiService } from "./api.service";
import { ElectronService } from "../providers/electron.service";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  moment: any = this.electron.moment;

  constructor(private apiService: ApiService, private electron: ElectronService) { }

  allOrders(param) {
    const orders = this.apiService.loadCachedOrders();
    let filtered: any = {};
    filtered.type = param;
    switch (param) {
      case "active":
        filtered.orders = orders.filter(order => this.moment().isBetween(order.start_date, order.end_date));
      break;
      case "upcoming":
        filtered.orders = orders.filter(order => this.moment().isSameOrBefore(this.moment(order.start_date)));
      break;
      case "expired":
        filtered.orders = orders.filter(order => this.moment().isAfter(this.moment(order.end_date)));
      break;
      case "test":
      break;
    }
    return filtered;
  }

  getOrders(param = 'active') {

    return this.allOrders(param).orders.map( (order, index) => {
      return {
        id: order.id,
        order_id: order.order_id,
        image_id: order.image_id,
        user_id: order.user_id,
        start_date: order.start_date,
        end_date: order.end_date,
        name: order.name,
        thumb_img_path: order.thumb_img_path,
        position: index + 1,
        show: false
      }
    })
  }
}
