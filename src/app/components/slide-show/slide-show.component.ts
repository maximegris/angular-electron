import { Component, OnInit, HostListener } from '@angular/core';
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
  slide: Slide = {
    thumb_img_path: '',
    show: null
  };
  slides: Slide[];
  moment: any = this.electron.moment;
  fullPath: string = this.apiService.fullPath;
  showSlideShow: boolean = true;
  active: number = 0;

  constructor(private apiService : ApiService, private electron: ElectronService) { }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);

    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      // document.querySelector('app-slide-show img').webkitRequestFullscreen()
      if(this.active < this.slides.length) {
        this.slides[this.active].show = true;
        if(this.active > 0) {
          this.slides[this.active - 1].show = false;
        }
        if(this.active < this.slides.length - 1) {
        this.active++
        }
      }

    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      if(this.active > 0) {
        this.slides[this.active].show = false;

        if(this.active > 0) {

          this.slides[this.active - 1].show = true;

        }
        if(this.active !== 0) {
          this.active--
        }
      }
    }

    console.log(this.slides);
    console.log(this.active);
  }

  ngOnInit() {
    this.slides = this.activeRentals();
    console.log(this.slides);
  }

  activeRentals() {
    const orders = this.apiService.loadCachedOrders().filter(order => this.moment().isBetween(order.start_date, order.end_date));
    return orders.map( (slide: Slide, index) => {
      return {
        thumb_img_path: slide.thumb_img_path,
        // show: index === this.active ? true : false
        show: false
      }
    });
  }

}
