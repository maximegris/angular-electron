import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-overlay-input',
  templateUrl: './overlay-input.component.html',
  styleUrls: ['./overlay-input.component.scss']
})
export class OverlayInputComponent implements OnInit {
  @ViewChild('cellInput', {static: true, read: ElementRef}) cellInputRef: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.cellInputRef.nativeElement.focus();
  }

}
