[![Angular Logo](./logo-angular.jpg)](https://angular.io/) [![Electron Logo](./logo-electron.jpg)](https://electron.atom.io/)

[![Travis Build Status][build-badge]][build]
[![Dependencies Status][dependencyci-badge]][dependencyci]
[![Make a pull request][prs-badge]][prs]
[![License](http://img.shields.io/badge/Licence-MIT-brightgreen.svg)](LICENSE.md)

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

# Introduction

[title](#documentation)

Bootstrap and package your project with Angular 6(+) and Electron (Typescript + SASS + Hot Reload) for creating Desktop applications.

Currently runs with:

- Angular v6.0.5
- Electron v2.0.3
- Electron Builder v20.13.4

With this sample, you can :

- Run your app in a local development environment with Electron & Hot reload
- Run your app in a production environment
- Package your app into an executable file for Linux, Windows & Mac

## Getting Started

Clone this repository locally :

``` bash
git clone https://github.com/maximegris/angular-electron.git
```

Install dependencies with npm :

``` bash
npm install
```

There is an issue with `yarn` and `node_modules` that are only used in electron on the backend when the application is built by the packager. Please use `npm` as dependencies manager.


If you want to generate Angular components with Angular-cli , you **MUST** install `@angular/cli` in npm global context.
Please follow [Angular-cli documentation](https://github.com/angular/angular-cli) if you had installed a previous version of `angular-cli`.

``` bash
npm install -g @angular/cli
```

## To build for development

- **in a terminal window** -> npm start

Voila! You can use your Angular + Electron app in a local development environment with hot reload !

The application code is managed by `main.ts`. In this sample, the app runs with a simple Angular App (http://localhost:4200) and an Electron window.
The Angular component contains an example of Electron and NodeJS native lib import.
You can desactivate "Developer Tools" by commenting `win.webContents.openDevTools();` in `main.ts`.

## Included Commands

|Command|Description|
|--|--|
|`npm run ng:serve:web`| Execute the app in the browser |
|`npm run build`| Build the app. Your built files are in the /dist folder. |
|`npm run build:prod`| Build the app with Angular aot. Your built files are in the /dist folder. |
|`npm run electron:local`| Builds your application and start electron
|`npm run electron:linux`| Builds your application and creates an app consumable on linux system |
|`npm run electron:windows`| On a Windows OS, builds your application and creates an app consumable in windows 32/64 bit systems |
|`npm run electron:mac`|  On a MAC OS, builds your application and generates a `.app` file of your application that can be run on Mac |

**Your application is optimised. Only /dist folder and node dependencies are included in the executable.**

## Browser mode

Maybe you want to execute the application in the browser with hot reload ? You can do it with `npm run ng:serve:web`.
Note that you can't use Electron or NodeJS native libraries in this case. Please check `providers/electron.service.ts` to watch how conditional import of electron/Native libraries is done.

## Branch & Packages version

- Angular 4 & Electron 1 : Branch [angular4](https://github.com/maximegris/angular-electron/tree/angular4)
- Angular 5 & Electron 1 : Branch [angular5](https://github.com/maximegris/angular-electron/tree/angular5)
- Angular 6 & Electron 2 : (master) 

[build-badge]: https://travis-ci.org/maximegris/angular-electron.svg?branch=master
[build]: https://travis-ci.org/maximegris/angular-electron.svg?branch=master
[dependencyci-badge]: https://dependencyci.com/github/maximegris/angular-electron/badge
[dependencyci]: https://dependencyci.com/github/maximegris/angular-electron
[license-badge]: https://img.shields.io/badge/license-Apache2-blue.svg?style=flat
[license]: https://github.com/maximegris/angular-electron/blob/master/LICENSE.md
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[github-watch-badge]: https://img.shields.io/github/watchers/maximegris/angular-electron.svg?style=social
[github-watch]: https://github.com/maximegris/angular-electron/watchers
[github-star-badge]: https://img.shields.io/github/stars/maximegris/angular-electron.svg?style=social
[github-star]: https://github.com/maximegris/angular-electron/stargazers
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20angular-electron!%20https://github.com/maximegris/angular-electron%20%F0%9F%91%8D
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/maximegris/angular-electron.svg?style=social


---


# Documentation {#documentation}

Definitions:  
- **UserData** Folder : Path where the app can store files on the OS separate from the app itself. This path can be called through the `electron.remote.app.getPath('userData')` method.  

## Tech Stack
Angular transplanted into an Electron project.

## Dependancies in use
- `clipboard` - Built in electron module, used to monitor the clipboard
- `store` - Package to easily read/write data to the config.json in the userData folder
- `fs-jetpack` - Package that creates/deletes directories
- `moment` - moment.js - time and date library
- `request` - An http client
- `os` - Built in electron module

## Files and Storage
Files can be stored in the user data folder, this can be accessed with an electron method, `electron.remote.app.getPath('userData');`

All files associated with an order are stored in this location as well as a `config.json` file that stored login information and order details. A folder called `.orderCache` is generated when the app starts.

Temporary files are stored using `electron.os.tmpdir() + '/' + 'dropstmp';`
This will return a path to the OS's temp folder, files for the app can be found under `/dropstmp`

## Important Files
- `src/app/providors/electron.service.ts` - This file is responsible for importing node modules from the electron project into Angular. So if you need to add some plugin i.e. fs-jetpack from NPM, then you import it here to use in another component. Its a kind of bridge between Electron and Angular.
- `package.json` - Here we can change the build number, amongst all the other normal things.
- `electron-builder.json` - The build name can be changed from here aswell as specifying the build output types.
- `main.ts` - High level configuration can be found here such as the title bar menu settings.

## Development


## Building for Windows and Mac
- Windows build command: `npm run electron:windows`
- Mac build command: `npm run electron:mac`

## Code Signing
#### Windows:
- Still processing the the Certificate in 2019 - To be confirmed

#### Mac:
App signing is performed every time you run `npm run electron:mac`  
The following files necessary to sign the app, keep these safe:
- `Certificates.p12`
- `Release.key`

---

## App Feature Overview

### Login
Login can be performed either by using a key associated with an order or the regular username and password. These authentication requests both go to `'POST: /login'` and `'POST: /login-with-key'` API endpoints respectivley.  

The Bearer token is stored in the `config.json` in the userData folder.

### Downloading Orders
Following authentication or clicking refresh (see orders component) an API call is made to get all orders.  

A call to either `'GET: /user-orders'` or `'GET: /orders-key'` can be made depending on the login type used. i.e. key or username&password. Files are then stored in the userData folder.

<img src="docs/bd-login-download.png" alt="drawing" width="800"/>

### Image Copy Protection
- On Windows the clipboard is monitored, if an image file is detected then the clipboard is immidietly cleared
- Mac - The SHIFT+CMD key  combination will hide the document body of the app for 1 second.
- The full resoloution images are encrypted with `aes-256-cbc`.
- Full resoloution images are decrypted and stored in the OS's temp directory while the app is open. The OS's global temporary directory can be called through `electron.os.tmpdir()`, the app will create a folder called `'dropstmp'`.
- Loggin out of the app will trigger a delete of both the userData and temporary OS folder.


---

## Core Classes

### API Service : `src/app/services/api.service.ts`
#### Class Properties
- `filePaths: any` - Object containing local paths to the stored thumbnail, watermarked, full images and temporary files. 
- `env: string = 'staging'` - For setting the API URL and the website URL. can be set to one of the following values: 'local' | 'staging' | null or undefined. When set to null or undefined, api calls will be made to the production API.
- `domain: string` - The base domain for the API
- `apiURL: string` - The full url for the API
- `latest_version: any = null` - Set by the API response when the app version is out of date
- `latest_version_url: any = null` -  Set by the API response when the app version is out of date
- `webSite: string` - The URL to the customer website

#### Methods
- Note that all api service methods return promises and not observables.

Login:
```javascript
async login(form: any, method: string): Promise<any>  

/**
  * @desc : Used for logging in with key or username & pass
  * @param form : form data
  * @param method : only 'code' or 'user' - used to determine which API route to use
  * @returns Promise
*/  


```

Get Orders:  
```javascript
async getOrders(method: string): Promise<any>  

/**
  * @desc : Get user orders,
  * send app version,
  * only returns if you have latest app version,
  * else return the latest version with the url to download it
  * @route GET /user-orders
  * @param method : only 'code' or 'user' - used to determine which API route to use
  * @returns Promise
*/  
```


### Download Service : `src/app/services/download.service.ts`
#### Class Properties
- `orders: any` - array of order objects
- `totalBytes: any = 0` - Set total byte size of the download
- `receivedBytes: any = 0` - Set the received bytes of the download
- `progressLoading: Subject<any> = new Subject()` - An observable value for monitoring the progress of an initiated download.

#### Methods
Initialize download process
```javascript
async processDownloads(method: string)  

/**
  * @desc : Called after login or reloading (nabvbar),
  * Gets the orders, formats the URLs for download the runs each download until complete
  * @param method : only 'code' or 'user' - used to determine which API route to use
*/  
```
Generate download list:
```javascript
getDownloadList(orders)  

/**
  * @desc : takes in a list of order objects and returns a download list
  * @param orders : array of orders returned from the API
*/  
```
Resolve Downloads:
```javascript
async startDownload(orders)  

/**
  * @input formatted download list
  * @param orders - Processes download URIs with the downloadFile() method
*/  
```
Download Single File:
```javascript
downloadFile(configuration: { remoteFile: string, localFile: PathLike, encryption: boolean, onProgress: Function })  

/**
  * @desc : Makes an API request to download and srtore a single File,
  * Files may optionally be encrypted
  * Each download increments the total download progress
  * @param configuration : Object with File's remote and local details
  */  
```
Decrypt a single file
```javascript
decryptFile(config: { inputPath: PathLike, outputPath: PathLike }): Promise<{}>   

/**
  * @desc : Decrypt and store a single file
  * @param config
  */  
```

### Orders Component : `src/app/components/orders/orders.component.ts`
#### Class Properties
- `filePaths: any = this.apiService.filePaths`
- `orders: Order[]`
- `orderType: string = 'active'` - refers to the current tab selected in the UI
- `moment: any = this.electron.moment` - Moment.js
- `hideOrders: boolean = false` - Hide the Orders template
- `showSlideShow: boolean = false` - Show the slideshow template
- `showModal: boolean = false` - Show the Modal template
- `slides: Order[]` - Images in the slide show
- `selectedOrder: Order` - Stores the selected slide/order when thumbnail is clicked
- `ordersLength: any` - The ammount of slides/orders - for the 'sequence' dropdowns
- `noOrders: boolean = false`
- `domain: string` - Set to the domain of the API

Initialize:
```javascript
ngOnInit()  

/**
  * @desc : call getOrders() method, builds all the order properties,
  * this.orders represents both the thumbnails and slides that are loaded,
  * Only clicking on the UI tabs can change the definition of this.orders
  */
```
<img src="docs/bd-orders-template.png" alt="drawing" width="600"/>

Trigger SlideShow mode:
```javascript
fullScreen(event, order)  

/**
  * @desc : Called when user clicks on thumbnail,
  * Sets a selected order, then displays the slide show
  * @param event : Click Event
  * @param order
  */

```
<img src="docs/bd-orders-slideshow.png" alt="drawing" width="600"/>

Change slide sequence:
```javascript
onChange(event, order)  

/**
  * @desc : Sets the order to the position selected
  * @param event : Change event
  * @param order
  */
```




