import { Component, OnInit, HostListener, EventEmitter, Output  } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Order } from "../../models/Order";
import { Slide } from "../../models/Slide";
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
  hideOrders: boolean = false;
  showSlideShow: boolean = false;
  parentMessage = this.orders;
  // slide = {
  //   thumb_img_path: '',
  //   show: '',
  //   position: number
  // }
  // slides: Slide[];
  positions: any;

  @Output() slides: EventEmitter<any> = new EventEmitter();

  constructor(private apiService: ApiService, private electron: ElectronService) { }

  onKeyUp() {
    // console.log(this.orders)
    this.slides = this.orders;
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // console.log(event);
    if (event.key === 'Escape') {
      this.hideOrders = false;
      this.showSlideShow = false;
    }
  }

  ngOnInit() {
    // document.addEventListener('keydown', this.slideNav);
    // console.log(this.apiService.cahceThumbs());
    // this.apiService.cacheOrders();
    // this.apiService.makeDirs();
    // this.apiService.cahceThumbs();
    // this.apiService.cacheFullImgs();
    // this.apiService.getStuff();
    this.thumbPath = this.apiService.thumbPath;

    this.orders = this.activeRentals();
    console.log(this.activeRentals());

  }

  fullSreen(event) {
    this.hideOrders = true;
    this.showSlideShow = true;
    document.documentElement.webkitRequestFullScreen();
    // const filepath = event.target.src;
    // event.target.src = filepath.replace('thumbs', 'full');
    // event.target.webkitRequestFullscreen();

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

  // changeOrder() {
  //   this.slides.emit('test');
  // }







}
