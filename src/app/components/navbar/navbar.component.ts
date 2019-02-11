import { Component, OnInit, EventEmitter, Output, ViewChild, NgZone } from '@angular/core';
import { Order } from '../../models/Order';
import { ApiService } from "../../services/api.service";
import { ElectronService } from "../../providers/electron.service";
import { OrdersService } from "../../services/orders.service";
import { viewClassName } from '@angular/compiler';
import { DownloadService } from '../../services/download.service';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';

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
  @ViewChild('testTab') testTab: any;
  @ViewChild('errorBox') errorBox: any;
  @ViewChild('header') header: any;

  @Output() newOrders: EventEmitter<any> = new EventEmitter();

  constructor(
    private apiService: ApiService,
    private electron: ElectronService,
    private ordersService: OrdersService,
    public zone: NgZone,
    private download: DownloadService,
    private store: StorageService,
    private router: Router
  ) { }

  ngOnInit() {
    const latestVersion = this.apiService.latest_version;
    const actualVersion = this.electron.version;
    console.log('storedLatest:', latestVersion, 'actual:', this.electron.version)
    console.log(actualVersion < latestVersion);

    if (actualVersion < latestVersion) {
      this.showUpdateMsg();
    }

    this.client = this.apiService.getClient().name;

  }

  filterOrders(event, param) {
    Array.from(document.querySelectorAll('.tab-item')).forEach(e => e.classList.remove('is-active'));
    event.target.classList.add('is-active');

    const orders = {
      orders: this.ordersService.getOrders(param),
      type: param
    }

    this.newOrders.emit(orders);
  }


  logout() {
    this.download.deleteStorage()
      .then(() => this.apiService.logout())
  }

  showModal() {
    document.querySelector('app-modal').removeAttribute('hidden');
  }

  async reload() {
    this.router.navigate(['loading']);
    const orders = await this.download.processDownloads(this.store.get('method'))
    this.router.navigate(['home']);
    console.log(orders)
  }

  // reload() {
  //   let store = new this.electron.store();
  //   store.get('method');
  //   const method = store.get('method');
  //   if (method !== undefined) {
  //     this.apiService.getOrders(method).subscribe(
  //       (orders: any) => {
  //         // this.zone.run(() => {
  //         //   this.apiService.storeOrders(orders);
  //         // });

  //         this.apiService.storeOrders(orders);

  //         this.apiService.latest_version = null;
  //         this.apiService.latest_version_url = null;
  //       },
  //       (error) => {
  //         console.log('handle error', error);
  //         this.showError = true;
  //         if (error.status === 426) {
  //           store.set('user.loggedIn', true);
  //           this.apiService.latest_version = error.error.version;
  //           this.apiService.latest_version_url = error.error.url;
  //           // this.router.navigate(['home']);
  //         } else {
  //           this.errorMessage = error.error.message;
  //         }
  //       });
  //   } else {
  //     console.log('no auth method found')
  //   }
  // }

  showUpdateMsg() {
    this.showError = true;
    this.header.nativeElement.style.paddingTop = '65px';
    const url = this.apiService.latest_version_url;
    this.errorBox.nativeElement.innerHTML = `Your app is out of date, please click <a target="_blank" href="${url}">here</a> for our latest version`;
  }


}
