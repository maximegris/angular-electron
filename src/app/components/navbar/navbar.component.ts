import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { Order } from '../../models/Order';
import { ApiService } from "../../services/api.service";
import { ElectronService } from "../../providers/electron.service";
import { OrdersService } from "../../services/orders.service";
import { viewClassName } from '@angular/compiler';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  moment: any = this.electron.moment;
  orders: any;
  client: string;
  showError: boolean = false;
  errorMessage: any;
  @ViewChild('testTab') testTab  : any;
  @ViewChild('errorBox') errorBox: any;
  @ViewChild('header') header: any;

  @Output() newOrders: EventEmitter<any> = new EventEmitter();

  constructor(private apiService : ApiService, private electron: ElectronService, private ordersService: OrdersService) { }

  ngOnInit() {
    // this.loadCached();
    // this.testTab.nativeElement.dispatchEvent(new Event('click'));

    // console.log('test-tab', this.testTab.nativeElement)
    let store = new this.electron.store();
    const latestVersion = store.get('latest_version');
    const actualVersion = this.electron.version;
    console.log( 'storedLatest:', latestVersion, 'actual:', this.electron.version)
    console.log(actualVersion < latestVersion);

    if(actualVersion < latestVersion) {
      // if(!islatestVersion) {
        this.showUpdateMsg();
      // }
    }


    this.client = this.apiService.getClient().name;
  }

  filterOrders(event, param) {
    Array.from(document.querySelectorAll('.tab-item')).forEach( e => e.classList.remove('is-active'));
    event.target.classList.add('is-active');

    const orders = {
      orders: this.ordersService.getOrders(param),
      type: param
    }

    this.newOrders.emit(orders);
  }


  logout() {
    this.apiService.logout();
  }

  showModal() {
    document.querySelector('app-modal').removeAttribute('hidden');
  }

  reload() {
    let store = new this.electron.store();
    store.get('method');
    const method = store.get('method');
    if(method !== undefined) {
      this.apiService.getOrders(method).subscribe(
        (orders: any) => {
          this.apiService.storeOrders(orders);
          // store.set('latest_version', true);
          setTimeout(function(){
            location.reload();
          }, 3000);
      },
      (error) => {
        console.log('handle error', error);
        this.showError = true;
        this.header.nativeElement.style.paddingTop = '65px';
        if(error.status === 426) {
          this.errorBox.nativeElement.innerHTML = `Your app is out of date, please click <a href="${error.error.url}">here</a> for our latest version`;
          store.set('user.loggedIn', true);
          store.set('latest_version', error.error.version);
          store.set('latest_version_url', error.error.url);
          // this.router.navigate(['home']);
        } else {
          this.errorMessage = error.error.message;
        }
      });
    } else {
      console.log('no auth method found')
    }
  }

  showUpdateMsg() {
    this.showError = true;
    this.header.nativeElement.style.paddingTop = '65px';
    let store = new this.electron.store();
    const url = store.get('latest_version_url');
    this.errorBox.nativeElement.innerHTML = `Your app is out of date, please click <a href="${url}">here</a> for our latest version`;
  }


}
