import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, retry } from 'rxjs/operators';

import { ApiService } from "../../services/api.service";
import { User } from "../../models/User";
import { ElectronService } from "../../providers/electron.service";
import { DownloadService } from '../../services/download.service';
import { StorageService } from '../../services/storage.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = {
    email: 'client1@admin.com',
    password: 'password'
  }
  showLoader: boolean = false;
  showError: boolean = false;
  errorMessage: any;
  updateUrl: any;

  @ViewChild('userForm') form: any;
  @ViewChild('errorBox') errorBox: any;


  constructor(
    private apiService: ApiService,
    private electronService: ElectronService,
    private router: Router,
    private download: DownloadService,
    private store: StorageService
  ) { }

  ngOnInit() {
    this.download.test()
  }

  async onSubmit({ value, valid }: { value: User, valid: boolean }) {
    // const store = new this.electronService.store();

    if (!valid) {
      console.log('Form is not valid');
    } else {
      console.log(value);

      // Login route
      const user = await this.apiService.login({ email: value.email, password: value.password })
      console.log(user)

      // persist credentials
      const store = await this.store.set({
        'platfrom': process.platform,
        'version': this.electronService.version,
        'method': 'user',
        'user.token': user.success.token,
        'user.details': user.success.user
      })
      console.log(store)

      const orders = await this.download.getOrders()

      console.log(orders)



      // const persist = await this.saveUserDetails(user)
      // console.log('store', store.get('user.details'))

      console.log('done')


    }
  }


  // onSubmit({ value, valid }: { value: User, valid: boolean }) {
  //   let store = new this.electronService.store();

  //   if (!valid) {
  //     console.log('Form is not valid');
  //   } else {
  //     console.log(value);
  //     this.showLoader = true;
  //     this.apiService.login({ email: value.email, password: value.password }).subscribe(
  //       (res: any) => {
  //         // store.clear();
  //         store.set('platfrom', process.platform);
  //         store.set('version', this.electronService.version);
  //         store.set('method', 'user');

  //         store.set('user.token', res.success.token);
  //         store.set('user.details', res.success.user);
  //         this.apiService.getOrders('user').subscribe(
  //           (orders: any) => {
  //             store.set('user.loggedIn', true);
  //             this.apiService.latest_version = null;
  //             this.apiService.latest_version_url = null;
  //             this.apiService.storeOrders(orders);
  //           },
  //           (error) => {
  //             this.showLoader = false;
  //             console.log('handle error', error);

  //             if (error.status === 426) {
  //               store.set('user.loggedIn', true);
  //               this.apiService.latest_version = error.error.version;
  //               this.apiService.latest_version_url = error.error.url;
  //               this.router.navigate(['home']);
  //             } else {
  //               this.showError = true;
  //               this.errorMessage = error.error.message;
  //             }
  //           });

  //       },
  //       (error) => {
  //         this.showLoader = false;
  //         console.log('handle error', error);
  //         this.showError = true;
  //         this.errorMessage = 'Invalid login';
  //       }

  //     );

  //   }
  // }

  // onCodeSubmit(code) {
  //   console.log(code.value)
  //   let store = new this.electronService.store();
  //   this.showLoader = true;
  //   this.apiService.loginKey({ code: code.value }).subscribe((res: any) => {
  //     console.log(res);
  //     store.set('platfrom', process.platform);
  //     store.set('version', this.electronService.version);
  //     store.set('method', 'key');

  //     store.set('order_key', code.value);
  //     store.set('user.token', res.success.token);
  //     store.set('user.details', res.success.user);
  //     this.apiService.getOrders('key').subscribe(
  //       (orders: any) => {
  //         store.set('user.loggedIn', true);
  //         this.apiService.latest_version = null;
  //         this.apiService.latest_version_url = null;
  //         this.apiService.storeOrders(orders);
  //       },
  //       (error) => {
  //         this.showLoader = false;
  //         console.log('handle error', error);

  //         if (error.status === 426) {
  //           store.set('user.loggedIn', true);
  //           this.apiService.latest_version = error.error.version;
  //           this.apiService.latest_version_url = error.error.url;
  //           this.router.navigate(['home']);
  //         } else {
  //           this.showError = true;
  //           this.errorMessage = error.error.message;
  //         }
  //       });

  //   },
  //     (error) => {
  //       console.log('handle error', error);
  //       this.showError = true;
  //       this.showLoader = false;
  //       this.errorMessage = 'Invalid login';
  //     });
  // }



}
