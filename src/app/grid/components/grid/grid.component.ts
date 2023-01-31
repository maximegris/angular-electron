import { DataSource } from '@angular/cdk/collections';
import {
  ConnectedPosition,
  ConnectionPositionPair,
  Overlay,
  OverlayRef,
  OverlaySizeConfig,
  PositionStrategy,
} from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { normalizeIndex } from '../../../shared/utils/array-utils';
import { handleKeysPressed } from '../../../shared/utils/keyboard';
import { GridCellDirective } from '../../directives/grid-cell.directive';
import { OverlayInputComponent } from '../overlay-input/overlay-input.component';

interface Point {
  x: number;
  y: number;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit, AfterViewInit {
  @ViewChildren(GridCellDirective) gridCells!: QueryList<GridCellDirective>;
  @ViewChild('table', { static: true, read: ElementRef }) table: ElementRef;
  @ViewChild('editFormTemplate') editFormTemplate: TemplateRef<unknown>;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new ExampleDataSource();
  cursorIndex!: Point;

  private cellMatrix: GridCellDirective[][];
  private overlayRef: OverlayRef;
  private editPortal: ComponentPortal<OverlayInputComponent>;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private renderer2: Renderer2,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {}

  get overlayPositions(): ConnectedPosition[] {
    return [
      new ConnectionPositionPair(
        { originX: 'start', originY: 'top' },
        { overlayX: 'start', overlayY: 'top' }
      ),
    ];
  }

  get overlayPositionStrategy(): PositionStrategy {
    return this.overlay
      .position()
      .flexibleConnectedTo(this.cursorCell.nativeElement)
      .withPositions(this.overlayPositions)
      .withPush(false)
      .withFlexibleDimensions(true)
      .withGrowAfterOpen(true)
      .withLockedPosition(true);
  }

  get cursorCell(): GridCellDirective | null {
    if (!this.cursorIndex) {
      return null;
    }

    return this.cellMatrix.at(this.cursorIndex.x)?.at(this.cursorIndex.y);
  }

  get overlaySizeConfig(): OverlaySizeConfig {
    const tableRect =
      this.table.nativeElement.getBoundingClientRect() as DOMRect;
    const cellRect =
      this.cursorCell?.nativeElement.getBoundingClientRect() ?? tableRect;

    const maxWidth = tableRect.right - cellRect.left;
    const maxHeight = tableRect.bottom - cellRect.top;

    return {
      height: this.cursorCell?.nativeElement.clientHeight,
      width: this.cursorCell?.nativeElement.clientWidth,
      maxHeight,
      maxWidth,
    };
  }

  set cursorPosition(value: Point) {
    value.x = normalizeIndex(value.x, this.cellMatrix.length);
    value.y = normalizeIndex(value.y, this.cellMatrix[value.x].length);
    this.cursorCell?.deselect();
    this.toggleColumnHeaderHighlight();
    this.cursorIndex = value;
    this.toggleColumnHeaderHighlight();
    this.cursorCell?.select();
  }

  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    handleKeysPressed(event, { key: 'ArrowUp' }, () => {
      this.cursorPosition = { ...this.cursorIndex, x: this.cursorIndex.x - 1 };
    });

    handleKeysPressed(event, { key: 'ArrowDown' }, () => {
      this.cursorPosition = { ...this.cursorIndex, x: this.cursorIndex.x + 1 };
    });

    handleKeysPressed(event, { key: 'ArrowLeft' }, () => {
      this.cursorPosition = { ...this.cursorIndex, y: this.cursorIndex.y - 1 };
    });

    handleKeysPressed(event, { key: 'ArrowRight' }, () => {
      this.cursorPosition = { ...this.cursorIndex, y: this.cursorIndex.y + 1 };
    });

    handleKeysPressed(event, { key: 'Enter' }, () => {
      this.cursorCell?.edit();
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initGrid(this.gridCells.toArray());
    this.cursorPosition = { x: 0, y: 0 };
    this.changeDetectorRef.detectChanges();
    this.editPortal = new ComponentPortal(
      OverlayInputComponent,
      this.viewContainerRef
    );
  }

  private initGrid(cells: GridCellDirective[]) {
    const cellMap = new Map<HTMLTableRowElement, GridCellDirective[]>();

    cells.forEach((cell) => {
      if (cellMap.has(cell.parentRowElement)) {
        cellMap.get(cell.parentRowElement).push(cell);
      } else {
        cellMap.set(cell.parentRowElement, [cell]);
      }
    });

    this.cellMatrix = Array.from(cellMap.values());
  }

  private toggleColumnHeaderHighlight() {
    const activeColumnName = this.cursorCell?.columnName;
    const columnHeaderElement = this.table.nativeElement.querySelector(
      `th.cdk-column-${activeColumnName}[role="columnheader"]`
    );

    if (!columnHeaderElement) {
      return;
    }

    if (columnHeaderElement.classList.contains('selected')) {
      this.renderer2.removeClass(columnHeaderElement, 'selected');
    } else {
      this.renderer2.addClass(columnHeaderElement, 'selected');
    }
  }

  private createOverlay() {
    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlayPositionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      ...this.overlaySizeConfig,
    });
  }

  private attachOverlay() {
    if (!this.overlayRef) {
      this.createOverlay();
    } else {
      this.overlayRef.detach();
      this.overlayRef.updatePositionStrategy(this.overlayPositionStrategy);
      this.overlayRef.updateSize(this.overlaySizeConfig);
    }
    this.overlayRef.attach(this.editPortal);
  }
}

export class ExampleDataSource extends DataSource<PeriodicElement> {
  /** Stream of data that is provided to the table. */
  data = new BehaviorSubject<PeriodicElement[]>(ELEMENT_DATA);

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<PeriodicElement[]> {
    return this.data;
  }

  disconnect() {}
}
