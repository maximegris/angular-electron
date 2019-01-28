import { Injectable } from '@angular/core';
import { ElectronService } from '../providers/electron.service';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  orders: any;
  totalBytes: any = 0;

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



    return ordersResponse;
    // console.log(orders)
  }

  getDownloadList(orders) {
    const urls = [];
    const { thumbs, full, watermarked } = this.apiService.filePaths;
    for (let order of orders) {
      this.totalBytes += order.total_bytes
      urls.push({ remoteFile: this.apiService.apiURL + order.img_path, localFile: full + order.file })
      urls.push({ remoteFile: this.apiService.apiURL + order.thumb_img_path, localFile: thumbs + order.file })
      urls.push({ remoteFile: this.apiService.apiURL + order.watermark_img_path, localFile: watermarked + order.file })
    }
    return urls;
  }

  async startDownload(orders) {

    try {
      const files = orders.map((order, index) => {
        const { remoteFile, localFile } = order
        const file = this.downloadFile({
          remoteFile,
          localFile,
          onProgress: (received, total) => {
            var percentage = (received * 100) / total;
            console.log(`(${index}) ${percentage}% | ${received} bytes out of ${total} bytes.`);
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

  downloadFile(configuration) {
    return new Promise((resolve, reject) => {
      // Save variable to know progress
      var received_bytes = 0;
      var total_bytes = 0;

      var req = this.electron.request({
        method: 'GET',
        uri: configuration.remoteFile
      });

      var out = this.electron.fs.createWriteStream(configuration.localFile);
      req.pipe(out);

      // req.on('response', function (data) {
      //   // Change the total bytes value to get progress later.
      //   total_bytes = parseInt(data.headers['content-length']);
      // });

      // Get progress if callback exists
      if (configuration.hasOwnProperty("onProgress")) {
        req.on('data', function (chunk) {
          // Update the received bytes
          received_bytes += chunk.length;

          configuration.onProgress(received_bytes, total_bytes);
        });
      } else {
        req.on('data', function (chunk) {
          // Update the received bytes
          received_bytes += chunk.length;
        });
      }

      req.on('end', function () {
        resolve();
      });
    });
  }
}
