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

  getActive() {
    const orders = this.apiService.loadCachedOrders();
    return orders.filter(order => this.moment().isBetween(order.start_date, order.end_date));
  }

  getOrders() {
    return this.getActive().map( (order, index) => {
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
        show: index === 0 ? true : false
      }
    })
  }
}
