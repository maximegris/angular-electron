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
    email: '',
    password: ''
  }
  code: any = '';
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
  ) {
    if (this.apiService.env === 'local') {
      this.user = {
        email: 'client1@admin.com',
        password: 'password'
      }
    }
  }

  ngOnInit() {
  }

  async onSubmit(data: any, method: string) {
    console.log(data, method)

    const formValue = method === 'user' ? data.value : { code: data };

    this.showLoader = true;

    // Login route { email: data.value.email, password: data.value.password }
    const user = await this.apiService.login(formValue, method)
      .catch(err => {
        console.log('login component fail', err)
        this.showLoader = false;
        this.showError = true;
        this.errorMessage = 'Invalid login';
      })

    if (user) {
      console.log('User Login', user)

      // persist credentials store.set('user.loggedIn', true);
      const store = await this.store.set({
        'platfrom': process.platform,
        'version': this.electronService.version,
        'method': method,
        'user.token': user.success.token,
        'user.details': user.success.user,
        'user.loggedIn': true,
        'order_key': method === 'code' ? data : null
      })
      console.log(store)

      const orders = await this.download.processDownloads(method)

      console.log(orders)


      console.log('done')
      this.router.navigate(['home']);

    }
  }

}
