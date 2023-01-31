import { CdkColumnDef } from '@angular/cdk/table';
import { ContentChild, Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { GridCellValueComponent } from '../components/grid-cell-value/grid-cell-value.component';

@Directive({
  selector: 'td[appGridCell]',
})
export class GridCellDirective implements OnInit {

  @ContentChild(GridCellValueComponent) cellValue: GridCellValueComponent;

  constructor(
    private elementRef: ElementRef,
    private render2: Renderer2,
    private cdkColumnDef: CdkColumnDef,
  ) {}

  get columnName() {
    return this.cdkColumnDef.cssClassFriendlyName;
  }

  get parentRowElement(): HTMLTableRowElement | null {
    if (this.nativeElement.parentElement instanceof HTMLTableRowElement) {
      return this.nativeElement.parentElement;
    }
    return null;
  }

  get nativeElement(): HTMLTableCellElement {
    return this.elementRef.nativeElement as HTMLTableCellElement;
  }

  ngOnInit(): void {
    this.render2.setAttribute(this.nativeElement, 'role', 'gridcell');
    this.render2.setAttribute(this.nativeElement, 'tabindex', '-1');
  }

  select() {
    this.nativeElement.focus();
    this.render2.setAttribute(this.nativeElement, 'tabindex', '0');
    this.render2.addClass(this.nativeElement, 'selected');
    console.log(this.cellValue);
  }

  deselect() {
    this.render2.setAttribute(this.nativeElement, 'tabindex', '-1');
    this.render2.removeClass(this.nativeElement, 'selected');
  }

  edit() {
    this.cellValue.editMode = true;
  }
}
