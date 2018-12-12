import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { ElectronService } from "../providers/electron.service";
import { Router } from '@angular/router';
import { Order } from "../models/Order";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  filePaths: any;
  local: boolean = false;
  domain: string;
  apiURL: string;
  loggedIn: boolean;
  fullImgsComplete: boolean = false;
  ready: boolean = false;

  constructor(private http: HttpClient, private electronService: ElectronService, private router: Router) {
    this.filePaths = {
      thumbs: this.electronService.remote.app.getPath('userData') + "/orderCache/thumbs/",
      full: this.electronService.remote.app.getPath('userData') + "/orderCache/full/",
      watermarked: this.electronService.remote.app.getPath('userData') + "/orderCache/watermarked/",
      app: this.electronService.remote.app.getAppPath()
    }
    let store = new this.electronService.store();
    this.loggedIn = store.get('user.loggedIn');
    if(this.loggedIn === true) {
      this.router.navigate(['home']);
    }

    if(this.local) {
      this.domain = 'http://backdrops.localhost';
    } else {
      // this.domain = 'http://backdrop-projections.ninja-staging.co.za';
      this.domain = 'http://backdropslive.forge.ninja-staging.co.za';
    }
    this.apiURL = this.domain + '/api/';
  }

  api(route) {
    return this.apiURL + route;
  }
  img(name) {
    return this.domain + '/storage';
  }

  login(user: User) {
    let store = new this.electronService.store();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
    }

    return this.http.post(this.apiURL + 'login', user, httpOptions);

  }

  loginKey(code) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    }
    return this.http.post(this.apiURL + 'login-with-key', code, httpOptions);
  }

  logout() {
    let store = new this.electronService.store();
    store.set('user.loggedIn', false);
    this.router.navigate(['']);
  }

  getOrders(method) {
    let store = new this.electronService.store();
    let url;
    let httpOptions;
    const details = {
      token: store.get('user.token'),
      platform: process.platform,
      version: this.electronService.version
    }

    if(method === 'user') {
      url = this.apiURL + 'user-orders';
      httpOptions = {
        headers: new HttpHeaders({'Authorization': 'Bearer ' + details.token, 'platform' : details.platform, 'version' : details.version, 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*'})
      }
    } else {
      url = this.apiURL + 'orders-key';
      httpOptions = {
        headers: new HttpHeaders({'Authorization': 'Bearer ' + details.token, 'platform' : details.platform, 'version' : details.version, 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*', 'code': store.get('order_key') })
      }
    }
    return this.http.get<Order[]>(url, httpOptions);
  }

  cacheOrders(method) {
    this.getOrders(method).subscribe(
      (orders: any) => {
        // console.log(orders);
        this.storeOrders(orders);
    });


  }
  async storeOrders(orders) {
    this.makeDirs();
    let store = new this.electronService.store();
    store.delete('order_data');
      store.set('order_data.last_download', new Date().toISOString());
      await store.set('order_data.orders', orders.success);

      await this.cacheThumbs();
      await this.cacheWatermarked();
      await this.cacheFullImgs();
  }

  loadCachedOrders() {
    let store = new this.electronService.store();
    return store.get('order_data.orders');
  }

  cacheThumbs() {
    const images = this.loadCachedOrders();
    images.forEach(el => {
      const options = {
        url: this.domain + '/storage' + el.thumb_img_path,
        dest: this.electronService.remote.app.getPath('userData') + "/orderCache/thumbs/"                  // Save to /path/to/dest/image.jpg
      }

      this.electronService.imageDownloader.image(options)
        .then(({ filename, image }) => {
          console.log('File saved to', filename)
        })
        .catch((err) => {
          console.error(err)
        })

    });
  }

  cacheWatermarked() {
    const images = this.loadCachedOrders();
    images.forEach(el => {
      const options = {
        url: this.domain + '/storage/images/watermarked/' + el.file,
        dest: this.electronService.remote.app.getPath('userData') + "/orderCache/watermarked/"                  // Save to /path/to/dest/image.jpg
      }

      this.electronService.imageDownloader.image(options)
        .then(({ filename, image }) => {
          console.log('File saved to', filename)
        })
        .catch((err) => {
          console.error(err)
        })

    });
  }

  cacheFullImgs() {
    const images = this.loadCachedOrders();
    console.log('image length', images.length);
    if (images.length === 0) {
      this.router.navigate(['home']);
    }
    let count = 0;
    images.forEach((el, index) => {
      const options = {
        url: this.domain + '/storage/images/full_images/' + el.thumb_img_path.substring(el.thumb_img_path.lastIndexOf('/') + 1),
        dest: this.electronService.remote.app.getPath('userData') + "/orderCache/full/"                  // Save to /path/to/dest/image.jpg
      }

      this.electronService.imageDownloader.image(options)
        .then(({ filename, image }) => {
          console.log('File saved to', filename)
          console.log('image index', index)
          console.log('image count', count += 1)
          if(count === images.length) {
            this.router.navigate(['home']);
          }

        })
        .catch((err) => {
          console.error(err)
        })

    });
  }

  makeDirs() {
    const orderImageCache = this.electronService.jetpack.dir(this.electronService.remote.app.getPath('userData') + '/' + 'orderCache');
    orderImageCache.dir('thumbs');
    orderImageCache.dir('full');
    orderImageCache.dir('watermarked');
    this.ready = true;
  }

  getClient() {
    let store = new this.electronService.store();
    const user = store.get('user.details');
    if(user !== undefined) {
        return user;
    }
  }



}
