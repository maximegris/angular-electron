// =================
// ===  Angular  ===
// =================
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';


// ======================
// ===  NG Translate  ===
// ======================
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


// ===============
// ===  Wijmo  ===
// ===============
import { WjGridModule } from 'wijmo/wijmo.angular2.grid';
import { WjChartModule } from 'wijmo/wijmo.angular2.chart';


// ===============
// ===  OTHER  ===
// ===============
import 'reflect-metadata';
import '../polyfills';


// =======================
// ===  Local Modules  ===
// =======================
import { GoogleMaterialDesignModule } from './modules/google-material-design.module';


// ========================
// ===  Local Services  ===
// ========================
import { ElectronService } from './providers/electron.service';


// ==========================
// ===  Local Directives  ===
// ==========================
import { WebviewDirective } from './directives/webview.directive';


// =========================
// ===  Local Components ===
// =========================
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MainNavComponent } from './main-nav/main-nav.component';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    MainNavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    GoogleMaterialDesignModule,

    WjGridModule, WjChartModule,  // Wijmo Modules

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [ElectronService],
  bootstrap: [AppComponent]
})
export class AppModule { }
