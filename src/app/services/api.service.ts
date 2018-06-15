import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { ElectronService } from "../providers/electron.service";
import { Router } from '@angular/router';
import { Order } from "../models/Order";




@Injectable({
  providedIn: 'root'
})
export class ApiService {
  domain: string = 'http://backdrops.localhost';
  apiURL: string = 'http://backdrops.localhost/api/';
  loggedIn: boolean;
  thumbPath: string = this.electronService.remote.app.getPath('userData') + "/orderCache/thumbs/";
  fullPath: string = this.electronService.remote.app.getPath('userData') + "/orderCache/full/";

  constructor(private http: HttpClient, private electronService: ElectronService, private router: Router) {
    let store = new this.electronService.store();
    this.loggedIn = store.get('user.loggedIn');
    if(this.loggedIn === true) {
      this.router.navigate(['home']);
    }
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
        store.set('user.loggedIn', true);
        store.set('user.token', res.success.token);
        store.set('user.details', res.success.user);
        this.router.navigate(['home']);
      });


      // console.log('####helooooo', this.data)

  }

  getOrders() {
    let store = new this.electronService.store();
    const httpOptions = {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + store.get('user.token'), 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*'})
    }
    // return this.http.get('http://backdrops.localhost/api/user-orders', httpOptions).subscribe((res: any) => {
    //   console.log(res);
    //   store.set('orders', res.success);
    // });
    return this.http.get<Order[]>(this.apiURL + 'user-orders', httpOptions);
  }

  cacheOrders() {
    let store = new this.electronService.store();
    this.getOrders().subscribe((orders: any) => {
      store.delete('order_data');
      store.set('order_data.last_download', new Date().toISOString());
      store.set('order_data.orders', orders.success);
    });
  }

  loadCachedOrders() {
    let store = new this.electronService.store();
    return store.get('order_data.orders');
  }

  cahceThumbs() {
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
  }

  makeDirs() {
    const orderImageCache = this.electronService.jetpack.dir(this.electronService.remote.app.getPath('userData') + '/' + 'orderCache');
    orderImageCache.dir('thumbs');
    orderImageCache.dir('full');
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
