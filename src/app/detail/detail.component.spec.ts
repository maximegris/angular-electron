import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DetailComponent} from './detail.component';
import {TranslateModule} from '@ngx-translate/core';
import {provideRouter} from '@angular/router';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [DetailComponent, TranslateModule.forRoot()],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h1 tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'PAGES.DETAIL.TITLE'
    );
  });
});
