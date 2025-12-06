import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {TranslateModule} from '@ngx-translate/core';
import {ElectronService} from './core/services';
import {provideRouter} from '@angular/router';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [AppComponent, TranslateModule.forRoot()],
      providers: [provideRouter([]), ElectronService]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
