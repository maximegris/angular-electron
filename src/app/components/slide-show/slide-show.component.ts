import { Component, OnInit, HostListener, Input } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Order } from '../../models/Order';
import { Slide } from '../../models/Slide';
import { Observable } from 'rxjs';
import { ElectronService } from "../../providers/electron.service";

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.scss']
})
export class SlideShowComponent implements OnInit {
  slides: Slide[];
  moment: any = this.electron.moment;
  fullPath: string = this.apiService.fullPath;
  active: number = 0;
  @Input() slideOrders: any;
  @Input() fullScreen: any;

  constructor(private apiService : ApiService, private electron: ElectronService) { }


  @HostListener('window:click', ['$event'])

  clickEvent(event: any) {
    console.log('slide click', event);
    if(event.target.className == 'update-slides-state') {
      console.log('hit');
      // this.slides = this.slideOrders;
      this.slides = this.activeRentals();
      // this.slides[0].show = true;
      console.log('current slides', this.slides);
    }
  }





  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // console.log(event);
    if(event.keyCode === 71) {
      this.slides = this.activeRentals();
      // this.activeRentals();
      console.log(this.slides);
    }
    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      if(this.active < this.slides.length - 1) {
        this.slides.forEach( slide => slide.show = false);
        this.slides[this.active += 1].show = true;
      }
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      if(this.active > 0) {
        this.slides.forEach( slide => slide.show = false);
        this.slides[this.active -= 1].show = true;
      }
    }

    if (event.key === 'Escape') {
      this.active = 0;
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



    // console.log('This guy', this.slides);
    // console.log(this.active);
  }

  ngOnInit() {
    // this.slides = this.activeRentals().sort((a, b) => a.position - b.position);
    // console.log(this.slides);
    // this.getOrders().subscribe(orders => {
    //   // this.posts = posts;
    //   this.slides = orders;
    // });
  }
  // getOrders() : Observable<any[]> {
  //   return this.slideOrders;
  // }

  activeRentals() {
    // const orders = this.apiService.loadCachedOrders().filter(order => this.moment().isBetween(order.start_date, order.end_date));
    // const positions = [3,2,1];
    // const slides = this.slideOrders.map( (slide: any, index) => {
    //   return {
    //     thumb_img_path: slide.thumb_img_path,
    //     show: false,
    //     position: slide.position !== undefined ? slide.position : index + 1,
    //     order_id: slide.order_id
    //   }
    // }).sort((a, b) => a.position - b.position);

    const slides = this.slideOrders.sort((a, b) => a.position - b.position);

    for(let i = 0; i < slides.length; i++) {
      slides[i].show = false;
    }

    // show the first slide
    slides[0].show = true;

    return slides;

  }



}
