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
    email: 'client5@admin.com',
    password: 'password'
  }
  showLoader: boolean = false;
  showError: boolean = false;
  @ViewChild('userForm') form: any;


  constructor(private apiService: ApiService,  private electronService: ElectronService) { }

  ngOnInit() {

  }

  login(e) {
    console.log(e);
  }

  onSubmit({value, valid}: {value: User, valid: boolean}) {
    let store = new this.electronService.store();

    if(!valid) {
      console.log('Form is not valid');
    } else {
      console.log(value);
      this.apiService.login({email: value.email, password: value.password}).subscribe(
        (res: any) => {
          this.showLoader = true;
        store.clear();
        store.set('version', this.electronService.version);
        store.set('method', 'user');
        store.set('user.loggedIn', true);
        store.set('user.token', res.success.token);
        store.set('user.details', res.success.user);
        this.apiService.cacheOrders('user');
      },
      (error) => {
        console.log('handle error', error);
        this.showError = true;
      }

    );

    }
  }

  onCodeSubmit(code) {
    console.log(code.value)
    let store = new this.electronService.store();
    this.apiService.loginKey({code: code.value}).subscribe((res: any) => {
      store.clear();
      store.set('version', this.electronService.version);
      store.set('method', 'key');
      store.set('user.loggedIn', true);
      store.set('order_key', code);
      store.set('user.token', res.success.token);
      store.set('user.details', res.success.user);
      this.apiService.cacheOrders('key');
    },
    (error) => {
      console.log('handle error', error);
      this.showError = true;
    });
  }




}
