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

  /**
   * @desc : Called when you click on the main UI tabs
   * @param event : Javascript Event
   * @param param : Active | Upcoming | Expired | Test
   * @returns : Emmits filtered orders to the Orders component
   */
  filterOrders(event, param) {
    Array.from(document.querySelectorAll('.tab-item')).forEach(e => e.classList.remove('is-active'));
    event.target.classList.add('is-active');

    const orders = {
      orders: this.ordersService.getOrders(param),
      type: param
    }

    this.newOrders.emit(orders);
  }


  async logout() {
    await this.download.deleteStorage()
    await this.download.deleteTmp()
    /* Delete temp, not working on Win, disabled
    // await this.download.deleteTmp()
    */
    this.apiService.logout()
  }

  showModal() {
    document.querySelector('app-modal').removeAttribute('hidden');
  }

  /**
   * @desc : Called in navbar to refresh orders,
   * Used to update UI if user orders were updated server-side
   * Fetches the user orders and stores them, then redirects to the 'home' route
   */
  async reload() {
    this.router.navigate(['loading']);
    const orders = await this.download.processDownloads(this.store.get('method'))
    this.router.navigate(['home']);
    console.log(orders)
  }

  showUpdateMsg() {
    this.showError = true;
    this.header.nativeElement.style.paddingTop = '65px';
    const url = this.apiService.latest_version_url;
    this.errorBox.nativeElement.innerHTML = `Your app is out of date, please click <a target="_blank" href="${url}">here</a> for our latest version`;
  }

  showBlockedAppMessage() {
    this.showError = this.electron.blocked.exists;
    this.header.nativeElement.style.paddingTop = '65px';
    this.errorBox.nativeElement.innerHTML = this.electron.blocked.msg;
    setTimeout(() => {
      this.showError = false;
      this.header.nativeElement.style.paddingTop = '10px';
    }, 5000)
  }


}
