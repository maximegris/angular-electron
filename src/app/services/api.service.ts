import { Injectable, Output, EventEmitter, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ElectronService } from "../providers/electron.service";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  filePaths: any;
  env: string = 'local';
  domain: string;
  apiURL: string;
  loggedIn: boolean;
  fullImgsComplete: boolean = false;
  ready: boolean = false;
  progressLoading: Subject<any> = new Subject();
  latest_version: any = null;
  latest_version_url: any = null;

  constructor(private http: HttpClient, private electronService: ElectronService, private router: Router, public zone: NgZone) {
    this.filePaths = {
      thumbs: this.electronService.remote.app.getPath('userData') + "/orderCache/thumbs/",
      full: this.electronService.remote.app.getPath('userData') + "/orderCache/full/",
      watermarked: this.electronService.remote.app.getPath('userData') + "/orderCache/watermarked/",
      app: this.electronService.remote.app.getAppPath()
    }
    let store = new this.electronService.store();
    this.loggedIn = store.get('user.loggedIn');
    if (this.loggedIn === true) {
      this.router.navigate(['home']);
    }

    if (this.env == 'local') {
      this.domain = 'http://backdrops.localhost';
    } else if (this.env == 'staging') {
      this.domain = 'https://api.backdrops.ninja-staging.co.za';
    } else {
      this.domain = 'https://backdropslive.forge.ninja-staging.co.za';
    }
    this.apiURL = this.domain + '/api/';
  }

  progress(array: Array<any>, index: number): any {
    const total = array.length;
    const percentage = index / total * 100;
    return `${Math.round(percentage)}%`;
  }

  api(route) {
    return this.apiURL + route;
  }
  img(name) {
    return this.domain + '/storage';
  }

  async login(form: any, method: string) {

    const endpoint = method === 'user' ? 'login' : 'login-with-key';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
    }

    let response = await this.http.post<any>(this.apiURL + endpoint, form, httpOptions).toPromise();
    return response;
  }

  logout() {
    let store = new this.electronService.store();
    store.set('user.loggedIn', false);
    this.router.navigate(['']);
  }

  async getOrders(method) {
    let store = new this.electronService.store();
    let url;
    let httpOptions;
    const details = {
      token: store.get('user.token'),
      platform: process.platform,
      version: this.electronService.version
    }

    if (method === 'user') {
      url = this.apiURL + 'user-orders';
      httpOptions = {
        headers: new HttpHeaders({ 'Authorization': 'Bearer ' + details.token, 'platform': details.platform, 'version': details.version, 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*' })
      }
    } else {
      url = this.apiURL + 'orders-key';
      httpOptions = {
        headers: new HttpHeaders({ 'Authorization': 'Bearer ' + details.token, 'platform': details.platform, 'version': details.version, 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*', 'code': store.get('order_key') })
      }
    }
    const response = await this.http.get<any>(url, httpOptions)
      .toPromise()
      .catch(err => {
        if (err.status === 426) {
          this.latest_version = err.error.version;
          this.latest_version_url = err.error.url;
          console.log(err)
          console.log('api version', this.latest_version)
        }
      })
    return response;

  }

  loadCachedOrders() {
    let store = new this.electronService.store();
    return store.get('order_data.orders');
  }

  // async storeOrders(orders) {
  //   this.makeDirs();
  //   let store = new this.electronService.store();
  //   store.delete('order_data');
  //   store.set('order_data.last_download', new Date().toISOString());
  //   await store.set('order_data.orders', orders.success);

  //   await this.cacheThumbs();
  //   await this.cacheWatermarked();
  //   await this.cacheFullImgs();
  // }


  getClient() {
    let store = new this.electronService.store();
    const user = store.get('user.details');
    if (user !== undefined) {
      return user;
    }
  }



}
