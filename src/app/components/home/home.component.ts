import { Component, OnInit } from '@angular/core';
import { QzService } from '../../services/qz.service';
import * as qz from 'qz-tray';

var sha256 = require('js-sha256');

qz.api.setSha256Type(function (data) {
  var hashed = sha256(data);
  return hashed;
});

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  zplData: string[] = [''];                 // ADD ZPL string(s) to test here, e.g. ['^XA....^XZ']
  NETWORK_PRINTER_NAME: string = '';        // CHANGE this to test printing directly with printer name
  NETWORK_PRINTER_IP_ADDRESS: string = '';  // CHANGE this if passing host to setPrinter()

  constructor(
    private qzSvc: QzService
  ) { }

  ngOnInit() {
    this.qzSvc.initQzTray();
    /**
     * if you don't have a backend to test with for retrieving the cert/signed hash,
     * comment out the above and uncomment out the below
     */
    // qz.api.showDebug(true);
    // qz.api.setPromiseType(function promise(resolver) { return new Promise(resolver); });
    // qz.websocket.connect().then(function () {
    //   console.log("Printer Connected!");
    // });
  }

  printLabels() {
    var printerCfg = qz.configs.create(null);
    /** Choose a method below, make sure the variables are defined above */

    printerCfg.setPrinter(this.NETWORK_PRINTER_NAME);
    // printerCfg.setPrinter({host: this.NETWORK_PRINTER_IP_ADDRESS });
    // printerCfg.setPrinter({host: this.NETWORK_PRINTER_IP_ADDRESS, port: 9100});

    console.log('print labels printer config:', printerCfg);
    return qz.print(printerCfg, this.zplData)
      .then(function () {
        console.log('Sent data to print with host only');
      })
      .catch(
        (e) => {
          console.log('ERROR PRINTING WITH HOST FROM QZ TRAY!');
          console.error(e);
        }
      );
  }
}
