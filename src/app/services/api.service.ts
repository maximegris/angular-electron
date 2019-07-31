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
  domain: string; // API
  apiURL: string;
  latest_version: any = null;
  latest_version_url: any = null;
  webSite: string;

  constructor(private http: HttpClient, private electronService: ElectronService, private router: Router, public zone: NgZone) {
    this.setFilePaths();
    this.setEnvVariables();

  }

  setFilePaths() {
    this.filePaths = {
      thumbs: this.electronService.remote.app.getPath('userData') + "/.orderCache/thumbs/",
      full: this.electronService.remote.app.getPath('userData') + "/.orderCache/full/",
      tmp: this.electronService.os.tmpdir() + '/dropstmp/',
      watermarked: this.electronService.remote.app.getPath('userData') + "/.orderCache/watermarked/",
      app: this.electronService.remote.app.getAppPath()
    }
  }

  setEnvVariables() {
    if (this.env == 'local') {
      this.domain = 'http://backdrops.test'; // API
      this.webSite = 'https://backdrops.ninja-staging.co.za';
    } else if (this.env == 'staging') {
      this.domain = 'https://api.backdrops.ninja-staging.co.za'; // API
      this.webSite = 'https://backdrops.ninja-staging.co.za';
    } else {
      this.domain = 'https://api.backdropprojections.com'; // API
      this.webSite = 'https://backdropprojections.com';
    }
    this.apiURL = this.domain + '/api/';
  }

  /**
   *
   * @desc : Used to launch in app link in an external browser
   * @param {string} [path='']
   */
  launchPage(path: string = '') {
    console.log('platform', process.platform)
    let uri = this.webSite + path;
    console.log(uri)
    let execStr: string;
    if (process.platform === 'win32') {
      execStr = 'start ' + uri;
    } else if (process.platform === 'darwin') {
      execStr = 'open ' + uri;
    } else { // *linux
      execStr = 'xdg-open ' + uri;
    }
    this.electronService.childProcess.execSync(execStr);
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

  /**
  * @desc : Used for logging in with key or username & pass
  * @param form : form data
  * @param method : only 'code' or 'user' - used to determine which API route to use
  * @returns Promise
  */
  async login(form: any, method: string): Promise<any> {

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

  /**
   * @desc : Get user orders,
   * send app version,
   * only returns if you have latest app version,
   * else return the latest version with the url to download it
   * @route GET /user-orders
   * @param method : only 'code' or 'user' - used to determine which API route to use
   * @returns Promise
   */
  async getOrders(method: string): Promise<any> {
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
          return Promise.reject(err);
        }
      })
    return response;

  }

  loadCachedOrders() {
    let store = new this.electronService.store();
    return store.get('order_data.orders');
  }

  getClient() {
    let store = new this.electronService.store();
    const user = store.get('user.details');
    if (user !== undefined) {
      return user;
    }
  }



}
