import { Component, OnInit, HostListener, EventEmitter, Output  } from '@angular/core';
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
  orders:  Order[];
  orderType: string = 'active';
  thumbPath: string;
  fullPath: string = this.apiService.fullPath;
  moment: any = this.electron.moment;
  hideOrders: boolean = false;
  showSlideShow: boolean = false;
  showModal: boolean = false;
  parentMessage = this.orders;
  slides: Order[];
  positions: any;

  // @Output() slides: EventEmitter<any> = new EventEmitter();

  constructor(private apiService: ApiService, private electron: ElectronService, private ordersService: OrdersService) { }

  onKeyUp(event, order) {

    // this.changeOrder();
    // console.log(event.target);

    // let indexToSwop = event.target.selectedIndex;


    const oldPosition = order.position;
    const newPosition = parseInt(event.target.value);

    const tempOrders = [...this.orders];

    // let b = order.position
    const a = tempOrders.findIndex( el => el.position == oldPosition);
    // this.orders[indexToSwop].position = b; //
    const b = tempOrders.findIndex( el => el.position == newPosition);

    // const c = tempOrders.findIndex( el => el.show == true);
    // console.log('to swop', this.orders[indexToSwop])
    this.orders[a].position = newPosition;
    this.orders[b].position = oldPosition;
    // this.orders[c].show = false;
    // this.orders[0].show = true;
    this.slides = this.orders;
    console.log('a', a);
    console.log('b', b);

    console.log('new slide order', this.slides);
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
    // this.apiService.cacheThumbs();
    // this.apiService.cacheFullImgs();
    // this.apiService.getStuff();


    this.thumbPath = this.apiService.thumbPath;

    setTimeout(()=> {
      this.orders = this.ordersService.getOrders();
      // console.log(this.activeRentals());
      this.slides = this.orders;
    }, 2000)



    // console.log(Object.keys(this.orders));

  }

  fullSreen(event) {
    this.hideOrders = true;
    this.showSlideShow = true;
    document.documentElement.webkitRequestFullScreen();
    // const filepath = event.target.src;
    // event.target.src = filepath.replace('thumbs', 'full');
    // event.target.webkitRequestFullscreen();

  }

  // slideNav(e) {
  //   console.log(e);
  //   if(e.key === "ArrowLeft") {
  //     document.webkitExitFullscreen();
  //   }
  // }


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
  }

  displayModal(param) {
    this.showModal = param;
  }

  // changeOrder() {
  //   // this.slides.emit('test');
  //   const slides = this.orders.map( (slide: any, index) => {
  //     return {
  //       thumb_img_path: slide.thumb_img_path,
  //       show: false,
  //       position: slide.position !== undefined ? slide.position : index + 1,
  //       order_id: slide.order_id
  //     }
  //   }).sort((a, b) => a.position - b.position);

  //   // show the first slide
  //   slides[0].show = true;

  //   this.slides = slides;
  // }







}
