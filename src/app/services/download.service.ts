import { Injectable } from '@angular/core';
import { ElectronService } from '../providers/electron.service';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  orders: any;
  totalBytes: any = 0;
  receivedBytes: any = 0;
  progressLoading: Subject<any> = new Subject();

  constructor(private electron: ElectronService, private apiService: ApiService, private store: StorageService) {

  }

  test() {
    console.log('new service')
  }

  async getOrders() {
    // get orders
    // #1 api call
    // #2 persist data
    // #3 get file size api call
    // #4 call download method
    const ordersResponse: any = await this.apiService.getOrders('user');

    const store = await this.store.set({
      'order_data.orders': ordersResponse.success
    })

    console.log('store orders', store)

    const listToDownload = this.getDownloadList(ordersResponse.success);

    const downloadInit = await this.startDownload(listToDownload);

    this.totalBytes = 0;
    this.receivedBytes = 0;



    return ordersResponse;
  }

  getDownloadList(orders) {
    const urls = [];
    const { thumbs, full, watermarked } = this.apiService.filePaths;
    const api = this.apiService.domain + '/storage';
    for (let order of orders) {
      this.totalBytes += order.total_bytes
      urls.push({ remoteFile: api + order.img_path, localFile: full + order.file })
      urls.push({ remoteFile: api + order.thumb_img_path, localFile: thumbs + this.getFilenameFromUrl(order.thumb_img_path) })
      urls.push({ remoteFile: api + order.watermark_img_path, localFile: watermarked + order.file })
    }
    console.log(urls)
    console.log(this.totalBytes)
    return urls;
  }

  getFilenameFromUrl(url) {
    return url.substring(url.lastIndexOf('/') + 1);
  }

  async startDownload(orders) {

    try {
      const files = orders.map((order, index) => {
        const { remoteFile, localFile } = order
        const file = this.downloadFile({
          remoteFile,
          localFile,
          onProgress: () => {
            this.progressLoading.next(this.progress(index))
          }
        });

        return file;
      })

      const downloads = await Promise.all(files);
      return downloads;

    } catch (err) {
      console.log(err)
      throw 'Error downloading';
    }

  }


  progress(index) {
    let percentage = (this.receivedBytes * 100) / this.totalBytes;
    return {
      index,
      percentage: `${Math.round(percentage)}%`,
      received: this.receivedBytes,
      total: this.totalBytes
    }
  }

  downloadFile(configuration) {
    return new Promise((resolve, reject) => {

      var req = this.electron.request({
        method: 'GET',
        uri: configuration.remoteFile
      });

      var out = this.electron.fs.createWriteStream(configuration.localFile);
      req.pipe(out);

      req.on('data', (chunk) => {
        // Update the received bytes
        this.receivedBytes += chunk.length;

        configuration.onProgress();
      });

      req.on('end', function () {
        resolve();
      });
    });
  }
}
