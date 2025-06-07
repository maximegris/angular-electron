import {TestBed, waitForAsync} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {TranslateModule} from '@ngx-translate/core';
import {ElectronService} from './core/services';
import {provideRouter} from '@angular/router';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      declarations: [],
      imports: [AppComponent, TranslateModule.forRoot()],
      providers: [provideRouter([]), ElectronService]
    }).compileComponents();
  }));

  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
