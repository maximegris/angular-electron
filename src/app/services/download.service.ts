import { Injectable } from '@angular/core';
import { ElectronService } from '../providers/electron.service';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import { Subject } from 'rxjs';
import { PathLike } from 'fs';

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

  async decryptStoredFiles() {
    this.makeTmpDir();
    let store = new this.electron.store();
    const orders = store.get('order_data.orders');
    const { full, tmp } = this.apiService.filePaths;
    const paths = orders.map(order => this.decryptFile({ inputPath: full + order.file, outputPath: tmp + order.file }));

    const files = await Promise.all(paths);
    return files;

  }

  async listOfStoredFiles(orders: any[]) {
    const { full, tmp } = this.apiService.filePaths;
    const paths = orders.map(order => this.decryptFile({ inputPath: full + order.file, outputPath: tmp + order.file }));

    const files = await Promise.all(paths);
    return files;
  }

  async processDownloads(method: string) {
    this.makeTmpDir();
    this.makeDirs();

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

  downloadFile(configuration: { remoteFile: string, localFile: PathLike, encryption: boolean, onProgress: Function }) {
    const key = '14189dc35ae35e75ff31d7502e245cd9bc7803838fbfd5c773cdcd79b8a28bbd';
    const cipher = this.electron.crypto.createCipher('aes-256-cbc', key);

    return new Promise((resolve, reject) => {

      const req = this.electron.request({
        method: 'GET',
        uri: configuration.remoteFile,
        headers: { 'Authorization': 'Bearer ' + this.store.get('user.token') }
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

  decryptFile(config: { inputPath: PathLike, outputPath: PathLike }): Promise<{}> {
    return new Promise<{}>((resolve, reject) => {
      var key = '14189dc35ae35e75ff31d7502e245cd9bc7803838fbfd5c773cdcd79b8a28bbd';
      var cipher = this.electron.crypto.createDecipher('aes-256-cbc', key);

      var input = this.electron.fs.createReadStream(config.inputPath); // existing file
      var output = this.electron.fs.createWriteStream(config.outputPath); // new file

      input.pipe(cipher).pipe(output);

      output.on('finish', () => {
        resolve()
        console.log('Decrypted file written to disk!');

      });
    })
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

  async deleteStorage() {
    const deletePath = await this.electron.jetpack.removeAsync(this.electron.remote.app.getPath('userData') + '/' + '.orderCache');
    return deletePath;
  }

  async deleteTmp() {
    const deletePath = await this.electron.jetpack.removeAsync(this.electron.os.tmpdir() + '/' + 'dropstmp');
    return deletePath;
  }
}
