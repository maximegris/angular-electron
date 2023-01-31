import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { handleKeysPressed, keysPressed } from '../../../shared/utils/keyboard';

@Component({
  selector: 'app-grid-cell-value',
  templateUrl: './grid-cell-value.component.html',
  styleUrls: ['./grid-cell-value.component.scss'],
})
export class GridCellValueComponent implements OnInit {
  @Input() value: string;
  @Input() comment: string;

  editMode = false;

  constructor() {}

  @ViewChild('textInput', { static: false, read: ElementRef })
   set textInputRef(value: ElementRef) {
    if (value) {
      value.nativeElement.focus();
    }
  }

  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (keysPressed(event, { key: 'ArrowLeft' }, { key: 'ArrowRight' })) {
      event.stopPropagation();
    }
  }

  ngOnInit(): void {}
}
