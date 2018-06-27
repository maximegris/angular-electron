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
  local: boolean = true;
  domain: string;
  apiURL: string;
  loggedIn: boolean;
  thumbPath: string = this.electronService.remote.app.getPath('userData') + "/orderCache/thumbs/";
  fullPath: string = this.electronService.remote.app.getPath('userData') + "/orderCache/full/";
  cacheReady: boolean = false;
  cacheComplete: boolean = false;
  loginDone: boolean = false;

  constructor(private http: HttpClient, private electronService: ElectronService, private router: Router) {
    this.filePaths = {
      thumbs: this.electronService.remote.app.getPath('userData') + "/orderCache/thumbs/",
      full: this.electronService.remote.app.getPath('userData') + "/orderCache/full/",
      watermarked: this.electronService.remote.app.getPath('userData') + "/orderCache/watermarked/"
    }
    let store = new this.electronService.store();
    this.loggedIn = store.get('user.loggedIn');
    if(this.loggedIn === true) {
      this.router.navigate(['home']);
    }

    if(this.local) {
      this.domain = 'http://backdrops.localhost';
    } else {
      this.domain = 'http://backdrop-projections.ninja-staging.co.za';
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

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    }
    let store = new this.electronService.store();
    this.http.post(this.apiURL + 'login',
      user,
      httpOptions).subscribe((res: any) => {
        console.log(res);
        store.delete('user');
        store.delete('order_data');
        store.set('user.loggedIn', true);
        store.set('user.token', res.success.token);
        store.set('user.details', res.success.user);

        this.cacheOrders('user');
        this.makeDirs();

        // if(this.loginDone) {
          setTimeout(()=> {
            if(this.cacheReady === true && this.cacheComplete === false ) {
              this.cacheThumbs();
              this.cacheWatermarked();
              this.cacheFullImgs();
            }
            if(this.cacheComplete) {
              this.router.navigate(['home']);
            }
            console.log(this.cacheReady, this.cacheComplete);
          }, 3000);
        // }

      });

  }

  loginKey(code) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    }
    let store = new this.electronService.store();
    this.http.post(this.apiURL + 'login-with-key',
      code,
      httpOptions).subscribe((res: any) => {
        store.delete('user');
        store.delete('order_data');
        store.set('user.loggedIn', true);
        store.set('order_key', code);
        store.set('user.token', res.success.token);
        store.set('user.details', res.success.user);

        this.cacheOrders('key');
        this.makeDirs();


        // if(this.loginDone) {
          setTimeout(()=> {
            if(this.cacheReady === true && this.cacheComplete === false ) {
              this.cacheThumbs();
              this.cacheWatermarked();
              this.cacheFullImgs();
            }
            if(this.cacheComplete) {
              this.router.navigate(['home']);
            }
            console.log(this.cacheReady, this.cacheComplete);
          }, 3000);
        // }

      });
  }

  logout() {
    let store = new this.electronService.store();
    store.set('user.loggedIn', false);

    this.cacheComplete = false;
    this.router.navigate(['']);
  }

  getOrders(method) {
    let store = new this.electronService.store();
    // const url = method === 'user-login' ? this.apiURL + 'user-orders' : this.apiURL + 'orders-key';
    let url;
    let httpOptions;

    if(method === 'user') {
      url = this.apiURL + 'user-orders';
      httpOptions = {
        headers: new HttpHeaders({'Authorization': 'Bearer ' + store.get('user.token'), 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*'})
      }
    } else {
      url = this.apiURL + 'orders-key';
      httpOptions = {
        headers: new HttpHeaders({'Authorization': 'Bearer ' + store.get('user.token'), 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*', 'code': store.get('order_key.code') })
      }
    }
    return this.http.get<Order[]>(url, httpOptions);
  }

  cacheOrders(method) {
    let store = new this.electronService.store();
    this.getOrders(method).subscribe(
      (orders: any) => {
      store.delete('order_data');
      store.set('order_data.last_download', new Date().toISOString());
      store.set('order_data.orders', orders.success);
    });
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
    images.forEach(el => {
      const options = {
        url: this.domain + '/storage/images/full_images/' + el.thumb_img_path.substring(el.thumb_img_path.lastIndexOf('/') + 1),
        dest: this.electronService.remote.app.getPath('userData') + "/orderCache/full/"                  // Save to /path/to/dest/image.jpg
      }

      this.electronService.imageDownloader.image(options)
        .then(({ filename, image }) => {
          console.log('File saved to', filename)
        })
        .catch((err) => {
          console.error(err)
        })

    });
    this.cacheComplete = true;
    this.loginDone = false;
  }

  makeDirs() {
    const orderImageCache = this.electronService.jetpack.dir(this.electronService.remote.app.getPath('userData') + '/' + 'orderCache');
    orderImageCache.dir('thumbs');
    orderImageCache.dir('full');
    orderImageCache.dir('watermarked');
    this.cacheReady = true;
    this.loginDone = true;
  }

  getClient() {
    let store = new this.electronService.store();
    const user = store.get('user.details');
    if(user !== undefined) {
        return user;
    }
  }


  getStuff() {
    let store = new this.electronService.store();
    const httpOptions = {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + store.get('user.token'), 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*'})
    }


    const options = {
      url: 'http://backdrops.localhost/storage/images/thumbs/marguerite-daisy-beautiful-beauty_1528183491.jpg',
      dest: this.electronService.remote.app.getPath('userData') + "/externalFiles/thumbs/"                  // Save to /path/to/dest/image.jpg
    }

    this.electronService.imageDownloader.image(options)
      .then(({ filename, image }) => {
        console.log('File saved to', filename)
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
