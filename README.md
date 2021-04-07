[![Angular Logo](https://www.vectorlogo.zone/logos/angular/angular-icon.svg)](https://angular.io/) [![Electron Logo](https://www.vectorlogo.zone/logos/electronjs/electronjs-icon.svg)](https://electronjs.org/)

![Maintained][maintained-badge]
[![Make a pull request][prs-badge]][prs]
[![License][license-badge]](LICENSE.md)

[![Linux Build][linux-build-badge]][linux-build]
[![MacOS Build][macos-build-badge]][macos-build]
[![Windows Build][windows-build-badge]][windows-build]

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

# Introduction

Bootstrap and package your project with Angular 11 and Electron 12 (Typescript + SASS + Hot Reload) for creating Desktop applications.

Currently runs with:

- Angular v11.2.8
- Electron v12.0.2
- Electron Builder v22.10.5

With this sample, you can:

- Run your app in a local development environment with Electron & Hot reload
- Run your app in a production environment
- Package your app into an executable file for Linux, Windows & Mac

/!\ Hot reload only pertains to the renderer process. The main electron process is not able to be hot reloaded, only restarted.

/!\ Angular 11.x CLI needs Node 10.13 or later to work correctly.

## Getting Started

Clone this repository locally:

``` bash
git clone https://github.com/maximegris/angular-electron.git
```

Install dependencies with npm:

``` bash
npm install
```

There is an issue with `yarn` and `node_modules` when the application is built by the packager. Please use `npm` as dependencies manager.


If you want to generate Angular components with Angular-cli , you **MUST** install `@angular/cli` in npm global context.
Please follow [Angular-cli documentation](https://github.com/angular/angular-cli) if you had installed a previous version of `angular-cli`.

``` bash
npm install -g @angular/cli
```

## To build for development

- **in a terminal window** -> npm start

Voila! You can use your Angular + Electron app in a local development environment with hot reload!

The application code is managed by `main.ts`. In this sample, the app runs with a simple Angular App (http://localhost:4200) and an Electron window.
The Angular component contains an example of Electron and NodeJS native lib import.
You can disable "Developer Tools" by commenting `win.webContents.openDevTools();` in `main.ts`.

## Use Electron / NodeJS libraries

This sample project runs in both modes (web and electron). To make this work, **you have to import your dependencies the right way**. Please check `providers/electron.service.ts` to watch how conditional import of libraries has to be done when using electron / NodeJS / 3rd party libraries in renderer context (i.e. Angular).

## Use "web" 3rd party libraries (like angular, material, bootstrap, ...)

3rd party librairies used in electron's renderer process (like angular) have to be added in `devDependencies` of `package.json`. They are already added in your final package during webpack's compilation phase. Otherwise it will significantly increase the size of your final package... not so cool :(

## Browser mode

Maybe you only want to execute the application in the browser with hot reload? Just run `npm run ng:serve:web`.

## Included Commands

|Command|Description|
|--|--|
|`npm run ng:serve`| Execute the app in the browser |
|`npm run build`| Build the app. Your built files are in the /dist folder. |
|`npm run build:prod`| Build the app with Angular aot. Your built files are in the /dist folder. |
|`npm run electron:local`| Builds your application and start electron
|`npm run electron:build`| Builds your application and creates an app consumable based on your operating system |

**Your application is optimised. Only /dist folder and node dependencies are included in the executable.**

## You want to use a specific lib (like rxjs) in electron main thread ?

YES! You can do it! Just by importing your library in npm dependencies section (not **devDependencies**) with `npm install --save`. It will be loaded by electron during build phase and added to your final package. Then use your library by importing it in `main.ts` file. Quite simple, isn't it?

## Debug with VsCode

[VsCode](https://code.visualstudio.com/) debug configuration is available! In order to use it, you need the extension [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome).

Then set some breakpoints in your application's source code.

Finally from VsCode press **Ctrl+Shift+D** and select **Application Debug** and press **F5**.

Please note that Hot reload is only available in Renderer process.

## E2E Testing

E2E Test scripts can be found in `e2e` folder.

|Command|Description|
|--|--|
|`npm run e2e`| Execute end to end tests |

Note: To make it work behind a proxy, you can add this proxy exception in your terminal  
`export {no_proxy,NO_PROXY}="127.0.0.1,localhost"`

## Branch & Packages version

- Angular 4 & Electron 1 : Branch [angular4](https://github.com/maximegris/angular-electron/tree/angular4)
- Angular 5 & Electron 1 : Branch [angular5](https://github.com/maximegris/angular-electron/tree/angular5)
- Angular 6 & Electron 3 : Branch [angular6](https://github.com/maximegris/angular-electron/tree/angular6)
- Angular 7 & Electron 3 : Branch [angular7](https://github.com/maximegris/angular-electron/tree/angular7)
- Angular 8 & Electron 7 : Branch [angular8](https://github.com/maximegris/angular-electron/tree/angular8)
- Angular 9 & Electron 7 : Branch [angular9](https://github.com/maximegris/angular-electron/tree/angular9)
- Angular 10 & Electron 9 : Branch [angular10](https://github.com/maximegris/angular-electron/tree/angular10)
- Angular 11 & Electron 12 : (master)

[maintained-badge]: https://img.shields.io/badge/maintained-yes-brightgreen
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
[license]: https://github.com/maximegris/angular-electron/blob/master/LICENSE.md
[prs-badge]: https://img.shields.io/badge/PRs-welcome-red.svg
[prs]: http://makeapullrequest.com

[linux-build-badge]: https://github.com/maximegris/angular-electron/workflows/Linux%20Build/badge.svg
[linux-build]: https://github.com/maximegris/angular-electron/actions?query=workflow%3A%22Linux+Build%22
[macos-build-badge]: https://github.com/maximegris/angular-electron/workflows/MacOS%20Build/badge.svg
[macos-build]: https://github.com/maximegris/angular-electron/actions?query=workflow%3A%22MacOS+Build%22
[windows-build-badge]: https://github.com/maximegris/angular-electron/workflows/Windows%20Build/badge.svg
[windows-build]: https://github.com/maximegris/angular-electron/actions?query=workflow%3A%22Windows+Build%22

[github-watch-badge]: https://img.shields.io/github/watchers/maximegris/angular-electron.svg?style=social
[github-watch]: https://github.com/maximegris/angular-electron/watchers
[github-star-badge]: https://img.shields.io/github/stars/maximegris/angular-electron.svg?style=social
[github-star]: https://github.com/maximegris/angular-electron/stargazers
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20angular-electron!%20https://github.com/maximegris/angular-electron%20%F0%9F%91%8D
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/maximegris/angular-electron.svg?style=social
