import { Component, OnInit, HostListener, Input, ViewChild, ViewChildren, ElementRef } from '@angular/core';
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
  videoID = Number(sessionStorage.getItem('video_id'));
  @ViewChild('slideMessage') slideMessage: any;
  @Input() orderType: string;
  @Input() newActive: any;
  @Input() slideOrders: any;
  @Input() fullScreen: any;
  @Input() imageIndex: any;

  constructor(private apiService: ApiService, private electron: ElectronService, private el: ElementRef) {
    console.log('slide active', this.newActive)
    console.log('slides', this.slides)
  }



  /**
   * @desc : listens for a click event on one of the thumbnails,
   * Initiates the slide show
   */
  @HostListener('window:click', ['$event'])
  clickEvent(event: any, imageIndex) {
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

      // this.active = this.newActive === undefined ? this.active : this.newActive.position - 1;
      this.active = Number(sessionStorage.getItem('index'));

      this.slides = this.activeRentals(this.active);

      // Fix for video pausing when re-ordering
      // const videoTags = Array.from(document.querySelectorAll('video'));
      // if (videoTags.length > 0) {
      //   videoTags.forEach(vide => vide.play())
      // }
      setTimeout(() => {
        if (this.slides[this.active]['media_type'] === 'video') {
          let video = document.getElementById('video' + Number(sessionStorage.getItem('video_id')));
          (<HTMLVideoElement>video).play();
        }
      }, 1000);


    }
  }

  /**
   * @desc : Controls navigation through the slide show,
   * Arrow keys, digits and escape key may be used
   * @param event
   */
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // console.log(event);
    if (event.keyCode === 71) {
      console.log('newActive', this.newActive);
      console.log('orderType', this.orderType);
      console.log(this.slides);
    }
    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      if (this.active < this.slides.length - 1) {
        this.slides.forEach(slide => slide.show = false);
        this.slides.forEach(slide => slide.show = false);
        this.slides[this.active += 1].show = true;

        if (this.videoID !== Number(this.slides[this.active]['image_id'])) {
          const videoTags = Array.from(document.querySelectorAll('video'));
          if (videoTags.length > 0) {
            videoTags.forEach(vide => vide.pause())
            videoTags.forEach(vide => vide.currentTime = 0)
          }
        }
        if (this.slides[this.active]['media_type'] === 'video') {
          sessionStorage.setItem('video_id', this.slides[this.active]['image_id']);

          this.videoID = Number(sessionStorage.getItem('video_id'))
          let video = document.getElementById('video' + this.videoID);
          (<HTMLVideoElement>video).play();
        }

      }
    }
    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      if (this.active > 0) {
        this.slides.forEach(slide => slide.show = false);
        this.slides[this.active -= 1].show = true;
        if (this.videoID !== Number(this.slides[this.active]['image_id'])) {
          const videoTags = Array.from(document.querySelectorAll('video'));
          if (videoTags.length > 0) {
            videoTags.forEach(vide => vide.pause())
            videoTags.forEach(vide => vide.currentTime = 0)
          }
        }

        if (this.slides[this.active]['media_type'] === 'video') {
          sessionStorage.setItem('video_id', this.slides[this.active]['image_id']);




          this.videoID = Number(sessionStorage.getItem('video_id'))
          let video = document.getElementById('video' + this.videoID);

          (<HTMLVideoElement>video).play();
        }


      }
    }
    if (event.key === 'Escape') {
      this.active = 0;
      const videoTags = Array.from(document.querySelectorAll('video'));
      if (videoTags.length > 0) {
        videoTags.forEach(vide => vide.pause())
        videoTags.forEach(vide => vide.currentTime = 0)
        sessionStorage.setItem('video_id', '0');
        this.videoID = 0;
      }
    }
    // Pause/Play video with spacebar 
    if (this.slides[this.active]['media_type'] === 'video') {
      let video = document.getElementById('video' + Number(sessionStorage.getItem('video_id')));
      if (event.keyCode == 32) {
        if ((<HTMLVideoElement>video).paused)
          (<HTMLVideoElement>video).play();
        else
          (<HTMLVideoElement>video).pause();
      }
    }


    // Shift + 0 goes to slide 10
    if (event.shiftKey && event.keyCode == 48 || event.shiftKey && event.keyCode == 96 || event.keyCode == 48 || event.keyCode == 96) {
      if (this.slides[9] === undefined) {
        return;
      }
      this.slides.forEach(slide => slide.show = false);
      const selectSlide = this.slides[9];
      if (selectSlide !== undefined) {
        selectSlide.show = true;
      }
      if (this.slides[9]['media_type'] === 'video') {
        sessionStorage.setItem('video_id', this.slides[9]['image_id']);

        this.videoID = Number(sessionStorage.getItem('video_id'))
        let video = document.getElementById('video' + this.videoID);
        (<HTMLVideoElement>video).play();
      }
      return;
    }

    // Shift + 1 goes to slide 11
    if (event.shiftKey && event.keyCode == 49 || event.shiftKey && event.keyCode == 97) {
      if (this.slides[10] === undefined) {
        return;
      }
      this.slides.forEach(slide => slide.show = false);
      const selectSlide = this.slides[10];
      if (selectSlide !== undefined) {
        selectSlide.show = true;
      }
      if (this.slides[10]['media_type'] === 'video') {
        sessionStorage.setItem('video_id', this.slides[10]['image_id']);

        this.videoID = Number(sessionStorage.getItem('video_id'))
        let video = document.getElementById('video' + this.videoID);
        (<HTMLVideoElement>video).play();
      }
      return;
    }

    // Shift + 2 goes to slide 12
    if (event.shiftKey && event.keyCode == 50 || event.shiftKey && event.keyCode == 98) {
      if (this.slides[11] === undefined) {
        return;
      }
      this.slides.forEach(slide => slide.show = false);
      const selectSlide = this.slides[11];
      if (selectSlide !== undefined) {
        selectSlide.show = true;
      }
      if (this.slides[11]['media_type'] === 'video') {
        sessionStorage.setItem('video_id', this.slides[11]['image_id']);

        this.videoID = Number(sessionStorage.getItem('video_id'))
        let video = document.getElementById('video' + this.videoID);
        (<HTMLVideoElement>video).play();
      }
      return;
    }

    // Shift + 3 goes to slide 13
    if (event.shiftKey && event.keyCode == 51 || event.shiftKey && event.keyCode == 99) {
      if (this.slides[12] === undefined) {
        return;
      }
      this.slides.forEach(slide => slide.show = false);
      const selectSlide = this.slides[12];
      if (selectSlide !== undefined) {
        selectSlide.show = true;
      }
      if (this.slides[12]['media_type'] === 'video') {
        sessionStorage.setItem('video_id', this.slides[12]['image_id']);

        this.videoID = Number(sessionStorage.getItem('video_id'))
        let video = document.getElementById('video' + this.videoID);
        (<HTMLVideoElement>video).play();
      }
      return;
    }

    // Shift + 4 goes to slide 14
    if (event.shiftKey && event.keyCode == 52 || event.shiftKey && event.keyCode == 100) {
      if (this.slides[13] === undefined) {
        return;
      }
      this.slides.forEach(slide => slide.show = false);
      const selectSlide = this.slides[13];
      if (selectSlide !== undefined) {
        selectSlide.show = true;
      }
      if (this.slides[13]['media_type'] === 'video') {
        sessionStorage.setItem('video_id', this.slides[13]['image_id']);

        this.videoID = Number(sessionStorage.getItem('video_id'))
        let video = document.getElementById('video' + this.videoID);
        (<HTMLVideoElement>video).play();
      }

      return;
    }

    // Shift + 5 goes to slide 15
    if (event.shiftKey && event.keyCode == 53 || event.shiftKey && event.keyCode == 101) {
      if (this.slides[14] === undefined) {
        return;
      }
      this.slides.forEach(slide => slide.show = false);
      const selectSlide = this.slides[14];
      if (selectSlide !== undefined) {
        selectSlide.show = true;
      }
      if (this.slides[14]['media_type'] === 'video') {
        sessionStorage.setItem('video_id', this.slides[14]['image_id']);

        this.videoID = Number(sessionStorage.getItem('video_id'))
        let video = document.getElementById('video' + this.videoID);
        (<HTMLVideoElement>video).play();
      }
      return;
    }

    // Shift + 6 goes to slide 16
    if (event.shiftKey && event.keyCode == 54 || event.shiftKey && event.keyCode == 102) {
      if (this.slides[15] === undefined) {
        return;
      }
      this.slides.forEach(slide => slide.show = false);
      const selectSlide = this.slides[15];
      if (selectSlide !== undefined) {
        selectSlide.show = true;
      }
      if (this.slides[15]['media_type'] === 'video') {
        sessionStorage.setItem('video_id', this.slides[15]['image_id']);

        this.videoID = Number(sessionStorage.getItem('video_id'))
        let video = document.getElementById('video' + this.videoID);
        (<HTMLVideoElement>video).play();
      }
      return;
    }

    // Shift + 7 goes to slide 17
    if (event.shiftKey && event.keyCode == 55 || event.shiftKey && event.keyCode == 103) {
      if (this.slides[16] === undefined) {
        return;
      }
      this.slides.forEach(slide => slide.show = false);
      const selectSlide = this.slides[16];
      if (selectSlide !== undefined) {
        selectSlide.show = true;
      }
      if (this.slides[16]['media_type'] === 'video') {
        sessionStorage.setItem('video_id', this.slides[16]['image_id']);

        this.videoID = Number(sessionStorage.getItem('video_id'))
        let video = document.getElementById('video' + this.videoID);
        (<HTMLVideoElement>video).play();
      }
      return;
      
    }

    // Shift + 8 goes to slide 18
    if (event.shiftKey && event.keyCode == 56 || event.shiftKey && event.keyCode == 104) {
      if (this.slides[17] === undefined) {
        return;
      }
      this.slides.forEach(slide => slide.show = false);
      const selectSlide = this.slides[17];
      if (selectSlide !== undefined) {
        selectSlide.show = true;
      }
      if (this.slides[17]['media_type'] === 'video') {
        sessionStorage.setItem('video_id', this.slides[17]['image_id']);

        this.videoID = Number(sessionStorage.getItem('video_id'))
        let video = document.getElementById('video' + this.videoID);
        (<HTMLVideoElement>video).play();
      }
      return;
    }

    // Shift + 9 goes to slide 19
    if (event.shiftKey && event.keyCode == 57 || event.shiftKey && event.keyCode == 105) {
      if (this.slides[18] === undefined) {
        return;
      }
      this.slides.forEach(slide => slide.show = false);
      const selectSlide = this.slides[18];
      if (selectSlide !== undefined) {
        selectSlide.show = true;
      }
      if (this.slides[18]['media_type'] === 'video') {
        sessionStorage.setItem('video_id', this.slides[18]['image_id']);

        this.videoID = Number(sessionStorage.getItem('video_id'))
        let video = document.getElementById('video' + this.videoID);
        (<HTMLVideoElement>video).play();
      }
      return;
    }

    // slides 1 - 9
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

  /**
   * @desc : sorts the slides based on the thumbnail order
   * @param active
   */
  activeRentals(active) {
    const slides = this.slideOrders.sort((a, b) => a.position - b.position);

    for (let i = 0; i < slides.length; i++) {
      slides[i].show = false;
    }
    // show the first slide
    slides[active].show = true;
    return slides;
  }

  setImgSrc(orderType, slide) {
    switch (orderType) {
      case 'upcoming':
        return 'file:///' + this.apiService.filePaths.watermarked + slide.file
      case 'test':
        return slide.file;
      default:
        return 'file:///' + this.apiService.filePaths.tmp + slide.file
    }
  }




}
