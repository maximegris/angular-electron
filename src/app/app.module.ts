import 'zone.js';
import 'reflect-metadata';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Store, StoreModule } from '@ngrx/store';
import { freelancersReducer } from './components/home/freelancer-grid/freelancers.reducer';
import { filterReducer } from './components/home/filter/filter.reducer';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FilterComponent } from './components/home/filter/filter.component';
import { FreelancerGridComponent } from './components/home/freelancer-grid/freelancer-grid.component';

import { AppRoutingModule } from './app-routing.module';

import { ElectronService } from './providers/electron.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FilterComponent,
    FreelancerGridComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.provideStore({ freelancers: freelancersReducer , filter: filterReducer })
  ],
  providers: [ElectronService],
  bootstrap: [AppComponent]
})
export class AppModule { }
