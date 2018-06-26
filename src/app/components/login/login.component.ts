import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from "../../services/api.service";
import { User } from "../../models/User";



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
  @ViewChild('userForm') form: any;


  constructor(private apiService: ApiService) { }

  ngOnInit() {

  }

  login(e) {
    console.log(e);
  }

  onSubmit({value, valid}: {value: User, valid: boolean}) {
    if(!valid) {
      console.log('Form is not valid');
    } else {
      console.log(value);
      this.apiService.login({email: value.email, password: value.password});
    }
  }

  onCodeSubmit(code) {
    console.log(code.value)
    this.apiService.loginKey({code: code.value});
  }


}
