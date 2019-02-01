import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, flatMap, catchError } from 'rxjs/operators';
import * as qz from 'qz-tray';

@Injectable({
  providedIn: 'root'
})
export class QzService {
  constructor(
    private http: HttpClient,
  ) {}

  certUrl: string;
  sigUrl: string;

  /**
   * QZ TRAY
   * Begin section for getting and setting the SSL certificate and signed hashes
   * so that qz tray will trust the application and not show the allow/block
   * popup every time a print action takes place
   */

  // Get the certificate from the node API
  getSSLCert() {
    return this.http.get(this.certUrl, { responseType: 'text' as 'text' })
      .pipe(
        map(
          (cert: any) => cert
        )
      );
  }

  // pass the certificate to qz tray to store it
  setSSLCert(cert: string) {
    console.log('set cert init!')
    return new Promise((resolve, reject) => {
      this.setCert(cert)
      resolve();
    });
  }

  setCert(cert: string) {
    return qz.security.setCertificatePromise(
      (resolve, reject) => {
        resolve(cert);
      }
    )
  }

  // a promise that kicks off the below two functions
  setSignature() {
    console.log('set sig init');
    return new Promise((resolve, reject) => {
      this.setSignaturePromise();
      resolve();
    });
  }

  // set up the promise that qz tray will use to verify the application on every print command
  setSignaturePromise() {
    qz.security.setSignaturePromise(
      hash => this.getSignedHashPromise(hash)
    );
  }

  // returns a promise that wraps an API call to the node API, sending a random string
  // that qz tray generates to have it signed and returned, so that qz tray can verify
  // the signature and trust the application to issue the print command
  getSignedHashPromise(hash: string) {
    return new Promise(
      (resolve, reject) => {
        this.http.post(this.sigUrl, { request: hash }, { responseType: 'text' as 'text' })
          .subscribe(resolve, reject);
      }
    );
  }

  initQzTray() {
    this.getSSLCert()
        .pipe(
          flatMap(certificate => {
            // console.log(`certificate: ${ certificate }`);
            return this.setSSLCert(certificate);
          }),
          flatMap(() => {
            // console.log(`setting signature`);
            return this.setSignature();
          }),
          catchError((err):any => {
            // console.log('Handling error locally and rethrowing it...', err);
            return throwError(err);
          })
        )
        .subscribe(
          (data: any) => {
            // console.log('app component set qz tray cert and signature promises complete');
            qz.api.showDebug(true);
            qz.api.setPromiseType(function promise(resolver) { return new Promise(resolver); });
            qz.websocket.connect().then(function () {
              console.log("Printer Connected!");
            });
          }
        );
  }
  /**
   * END QZ TRAY section
   */
}



