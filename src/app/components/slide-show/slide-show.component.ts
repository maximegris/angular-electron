import { Component, OnInit, HostListener, Input, ViewChild, ViewChildren, ElementRef } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Order } from '../../models/Order';
import { Slide } from '../../models/Slide';
import { Observable } from 'rxjs';
import { ElectronService } from "../../providers/electron.service";
import { enterView } from '@angular/core/src/render3/instructions';

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
  // @ViewChildren(Counter) counters: QueryList<Counter>;

  constructor(private apiService: ApiService, private electron: ElectronService, private el: ElementRef) {
    console.log('slide active', this.newActive)
    console.log('slides', this.slides)

  }


  @HostListener('window:click', ['$event'])

  clickEvent(event: any) {
    // console.log('slide click', event);
    if (event.target.classList.contains('update-slides-state')) {

      // console.log('slide active', this.newActive);

      this.slideMessage.nativeElement.hidden = false;

      setTimeout(() => {
        this.slideMessage.nativeElement.hidden = true;
      }, 3000);


      if (this.orderType === 'active') {
        this.slidePath = this.filePaths.full;
      } else {
        this.slidePath = this.filePaths.watermarked;
      }

      this.active = this.newActive === undefined ? this.active : this.newActive.position - 1;

      this.slides = this.activeRentals(this.active);

      // Fix for video pausing when re-ordering
      const videoTags = Array.from(document.querySelectorAll('video'));
      if (videoTags.length > 0) {
        videoTags.forEach(vide => vide.play())
      }
      console.log('tags', videoTags)

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

    }
    if (event.keyCode >= 49 && event.keyCode <= 57 || event.keyCode >= 97 && event.keyCode <= 105) {
      if (parseInt(event.key) > this.slides.length) {
        return;
      }
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
