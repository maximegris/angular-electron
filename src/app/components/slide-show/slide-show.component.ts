import { Component, OnInit, HostListener, Input } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Order } from '../../models/Order';
import { Slide } from '../../models/Slide';
import { ElectronService } from "../../providers/electron.service";

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.scss'],
  // host: {
  //   '(document:keyup)': 'onKey($event)'
  // }
})
export class SlideShowComponent implements OnInit {
  slides: Slide[];
  moment: any = this.electron.moment;
  fullPath: string = this.apiService.fullPath;
  active: number = 0;
  // slideOrders: any;
  @Input() slideOrders: any;

  constructor(private apiService : ApiService, private electron: ElectronService) { }

  // changeOrder(orders: Order[]) {

  //   this.orders = orders;
  //   console.log('orders from slideshow', this.orders);
  // }


  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // console.log('orders from slideshow',  this.orders)
    console.log('slideshow', event);

    // if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
    //   // document.querySelector('app-slide-show img').webkitRequestFullscreen()
    //   if(this.active < this.slides.length) {
    //     this.slides[this.active].show = true;
    //     if(this.active > 0) {
    //       this.slides[this.active - 1].show = false;
    //     }
    //     if(this.active < this.slides.length - 1) {
    //     this.active++
    //     }
    //   }
    // }

    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      console.log('child', this.slideOrders);
      if(this.active < this.slides.length - 1) {
        this.slides.forEach( slide => slide.show = false);
        this.slides[this.active += 1].show = true;
      }
      // if(this.active < this.slides.length) {
      //   this.slides[this.active].show = true;
      //   if(this.active > 0) {
      //     this.slides[this.active - 1].show = false;
      //   }
      //   if(this.active < this.slides.length - 1) {
      //   this.active++
      //   }
      // }
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      if(this.active > 0) {
        this.slides.forEach( slide => slide.show = false);
        this.slides[this.active -= 1].show = true;
      }
      // if(this.active > 0) {
      //   this.slides[this.active].show = false;

      //   if(this.active > 0) {

      //     this.slides[this.active - 1].show = true;

      //   }
      //   if(this.active !== 0) {
      //     this.active--
      //   }
      // }
    }


    // Important function for numpad below !!!!!!

    // if(event.keyCode >= 49 && event.keyCode <= 57 || event.keyCode >= 97 && event.keyCode <= 105 ) {
    //   console.log('numpad');
    //   this.slides.forEach( slide => slide.show = false);
    //   const selectSlide = this.slides[parseInt(event.key) - 1];
    //   if(selectSlide !== undefined) {
    //     selectSlide.show = true;
    //   }

    // }



    console.log(this.slides);
    console.log(this.active);
  }

  ngOnInit() {
    this.slides = this.activeRentals().sort((a, b) => a.position - b.position);
    console.log(this.slides);
  }

  activeRentals() {
    const orders = this.apiService.loadCachedOrders().filter(order => this.moment().isBetween(order.start_date, order.end_date));
    const positions = [3,2,1];
    return orders.map( (slide: Slide, index) => {
      return {
        thumb_img_path: slide.thumb_img_path,
        show: index === 2 ? true : false,
        position: positions[index],
        order_id: slide.order_id
      }
    });
  }



}
