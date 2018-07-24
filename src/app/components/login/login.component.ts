import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, retry } from 'rxjs/operators';

import { ApiService } from "../../services/api.service";
import { User } from "../../models/User";
import { ElectronService } from "../../providers/electron.service";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = {
    email: '',
    password: ''
  }
  showLoader: boolean = false;
  showError: boolean = false;
  errorMessage: any;
  updateUrl: any;
  @ViewChild('userForm') form: any;


  constructor(private apiService: ApiService,  private electronService: ElectronService) { }

  ngOnInit() {
    console.log("Log Process Obj", process.platform);
    let store = new this.electronService.store();
    console.log(store);
   }

  // login(e) {
  //   console.log(e);

  // }

  onSubmit({value, valid}: {value: User, valid: boolean}) {
    let store = new this.electronService.store();

    if(!valid) {
      console.log('Form is not valid');
    } else {
      console.log(value);
      this.showLoader = true;
      this.apiService.login({email: value.email, password: value.password}).subscribe(
        (res: any) => {
        store.clear();
        store.set('platfrom', process.platform);
        store.set('version', this.electronService.version);
        store.set('method', 'user');

        store.set('user.token', res.success.token);
        store.set('user.details', res.success.user);
        // this.apiService.cacheOrders('user');
        this.apiService.getOrders('user').subscribe(
          (orders: any) => {
            store.set('user.loggedIn', true);
            this.apiService.storeOrders(orders);
        },
        (error) => {
          this.showLoader = false;
          console.log('handle error', error);
          this.showError = true;
          this.errorMessage = error.error.message;
          this.updateUrl = error.error.url !== undefined ? error.error.url : '';
        });

      },
      (error) => {
        this.showLoader = false;
        console.log('handle error', error);
        this.showError = true;
        this.errorMessage = 'Invalid login';
      }

    );

    }
  }

  onCodeSubmit(code) {
    console.log(code.value)
    let store = new this.electronService.store();
    this.showLoader = true;
    this.apiService.loginKey({code: code.value}).subscribe((res: any) => {
      console.log(res);
      store.clear();
      store.set('platfrom', process.platform);
      store.set('version', this.electronService.version);
      store.set('method', 'key');

      store.set('order_key', code.value);
      store.set('user.token', res.success.token);
      store.set('user.details', res.success.user);
      // this.apiService.cacheOrders('key');
      this.apiService.getOrders('key').subscribe(
        (orders: any) => {
          store.set('user.loggedIn', true);
          this.apiService.storeOrders(orders);
      },
      (error) => {
        this.showLoader = false;
        console.log('handle error', error);
        this.showError = true;
        this.errorMessage = error.error.message;
      });

    },
    (error) => {
      console.log('handle error', error);
      this.showError = true;
      this.showLoader = false;
      this.errorMessage = 'Invalid login';

    });
  }




}
