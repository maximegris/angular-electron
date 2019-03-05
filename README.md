[![Angular Logo](./logo-angular.jpg)](https://angular.io/) [![Electron Logo](./logo-electron.jpg)](https://electron.atom.io/)

[![Travis Build Status][build-badge]][build]
[![Dependencies Status][dependencyci-badge]][dependencyci]
[![Make a pull request][prs-badge]][prs]
[![License](http://img.shields.io/badge/Licence-MIT-brightgreen.svg)](LICENSE.md)

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

# Introduction

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

# Documentation

## Tech Stack
Angular transplanted into an Electron project.

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
### Login & download orders
Login can be performed either by using a key associated with an order or the regular username and password. These authentication requests both go to `'POST: /login'` and `'POST: /login-with-key'` API endpoints respectivley.  

The Bearer token is stored in the `config.json` in the app's local storage folder, that can be called using `electron.remote.app.getPath('userData');`

Following authentication a call to either `'GET: /user-orders'` or `'GET: /user-orders'` 