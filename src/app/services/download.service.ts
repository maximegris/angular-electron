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

  async processDownloads(method: string) {
    // get orders
    // #1 api call
    // #2 persist data
    // #3 get file size api call
    // #4 call download method

    // this.makeTmpDir();

    this.makeDirs()
    const ordersResponse: any = await this.apiService.getOrders(method);

    if (ordersResponse) {
      const store = await this.store.set({
        'user.loggedIn': true,
        'order_data.orders': ordersResponse.success
      })

      console.log('store orders', store)

      const listToDownload = this.getDownloadList(ordersResponse.success);

      await this.startDownload(listToDownload);

      this.totalBytes = 0;
      this.receivedBytes = 0;
      console.log('download complete')
      return ordersResponse;
    }


  }

  getDownloadList(orders) {
    const urls = [];
    const { thumbs, full, watermarked } = this.apiService.filePaths;
    const storage = this.apiService.domain + '/storage';
    const secureStorge = this.apiService.apiURL + 'file-dl/';
    for (let order of orders) {
      this.totalBytes += order.total_bytes
      urls.push({ remoteFile: secureStorge + order.image_id, localFile: full + order.file, encryption: true })
      urls.push({ remoteFile: storage + order.thumb_img_path, localFile: thumbs + this.getFilenameFromUrl(order.thumb_img_path), encryption: false })
      urls.push({ remoteFile: storage + order.watermark_img_path, localFile: watermarked + order.file, encryption: false })
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
        const { remoteFile, localFile, encryption } = order
        const file = this.downloadFile({
          remoteFile,
          localFile,
          encryption,
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
    const key = '14189dc35ae35e75ff31d7502e245cd9bc7803838fbfd5c773cdcd79b8a28bbd';
    const cipher = this.electron.crypto.createCipher('aes-256-cbc', key);

    return new Promise((resolve, reject) => {

      const req = this.electron.request({
        method: 'GET',
        uri: configuration.remoteFile
      });

      const out = this.electron.fs.createWriteStream(configuration.localFile);
      const tmpURI = this.electron.os.tmpdir() + '/dropstmp/' + this.getFilenameFromUrl(configuration.localFile);
      const tmp = this.electron.fs.createWriteStream(tmpURI);
      // console.log('temp_path', tmp)
      if (configuration.encryption) {
        req.pipe(tmp);
        req.pipe(cipher).pipe(out);
      } else {
        req.pipe(out);
      }


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

  makeTmpDir() {
    this.electron.jetpack.dir(this.electron.os.tmpdir() + '/' + 'dropstmp');
  }

  makeDirs() {
    const orderImageCache = this.electron.jetpack.dir(this.electron.remote.app.getPath('userData') + '/' + '.orderCache');
    orderImageCache.dir('thumbs');
    orderImageCache.dir('full');
    orderImageCache.dir('watermarked');
  }
}
