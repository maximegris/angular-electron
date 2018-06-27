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
  @Input() newActive: any;
  @Input() slideOrders: any;
  @Input() fullScreen: any;

  constructor(private apiService : ApiService, private electron: ElectronService) { }


  @HostListener('window:click', ['$event'])

  clickEvent(event: any) {
    console.log('slide click', event);
    if(event.target.className == 'update-slides-state') {

      this.active = this.newActive.position - 1;

      this.slides = this.activeRentals(this.newActive.position - 1);

      console.log('current slides', this.slides, this.active);
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // console.log(event);
    if(event.keyCode === 71) {
      console.log('newActive', this.newActive);
      // this.slides = this.activeRentals(2);
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
    if(event.keyCode >= 49 && event.keyCode <= 57 || event.keyCode >= 97 && event.keyCode <= 105 ) {
      console.log('numpad');
      this.slides.forEach( slide => slide.show = false);
      const selectSlide = this.slides[parseInt(event.key) - 1];
      if(selectSlide !== undefined) {
        selectSlide.show = true;
      }
    }
  }

  ngOnInit() {
  }

  activeRentals(active) {
    const slides = this.slideOrders.sort((a, b) => a.position - b.position);

    for(let i = 0; i < slides.length; i++) {
      slides[i].show = false;
    }

    // show the first slide
    slides[active].show = true;

    return slides;

  }



}
