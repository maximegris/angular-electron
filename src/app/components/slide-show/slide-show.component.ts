import { Component, OnInit, HostListener, Input, ViewChild } from '@angular/core';
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
  filePaths: any = this.apiService.filePaths;
  slides: Slide[];
  moment: any = this.electron.moment;
  slidePath: string;
  active: number = 0;
  @ViewChild('slideMessage') slideMessage: any;
  // OrderType: string;
  @Input() orderType: string;
  @Input() newActive: any;
  @Input() slideOrders: any;
  @Input() fullScreen: any;

  constructor(private apiService: ApiService, private electron: ElectronService) {
    console.log('slide active', this.newActive)
    console.log('slides', this.slides)

  }


  @HostListener('window:click', ['$event'])

  clickEvent(event: any) {
    console.log('slide click', event);
    if (event.target.className == 'update-slides-state') {

      this.slideMessage.nativeElement.hidden = false;

      setTimeout(() => {
        this.slideMessage.nativeElement.hidden = true;
      }, 3000);

      console.log();

      if (this.orderType === 'active') {
        this.slidePath = this.filePaths.full;
        document.body.style.backgroundColor = "black";
      } else {
        this.slidePath = this.filePaths.watermarked;
      }
      document.body.style.backgroundColor = "white";
      // this.active = this.newActive.position - 1;
      this.active = this.newActive === undefined ? this.active : this.newActive.position - 1;

      this.slides = this.activeRentals(this.active);

      // console.log('current slides', this.slides, this.active);
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // console.log(event);
    if (event.keyCode === 71) {
      console.log('newActive', this.newActive);
      console.log('orderType', this.orderType);
      // this.slides = this.activeRentals(2);
      // this.activeRentals();
      console.log(this.slides);
    }
    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      if (this.active < this.slides.length - 1) {
        this.slides.forEach(slide => slide.show = false);
        this.slides[this.active += 1].show = true;
      }
    }
    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      if (this.active > 0) {
        this.slides.forEach(slide => slide.show = false);
        this.slides[this.active -= 1].show = true;
      }
    }
    if (event.key === 'Escape') {
      this.active = 0;
      document.body.style.backgroundColor = "white";
    }
    if (event.keyCode >= 49 && event.keyCode <= 57 || event.keyCode >= 97 && event.keyCode <= 105) {
      console.log('numpad');
      this.slides.forEach(slide => slide.show = false);
      const selectSlide = this.slides[parseInt(event.key) - 1];
      if (selectSlide !== undefined) {
        selectSlide.show = true;
      }
    }
  }

  ngOnInit() {
  }

  activeRentals(active) {
    const slides = this.slideOrders.sort((a, b) => a.position - b.position);

    for (let i = 0; i < slides.length; i++) {
      slides[i].show = false;
    }

    // show the first slide
    slides[active].show = true;

    return slides;

  }




}
