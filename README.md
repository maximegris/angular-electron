[![Angular Logo](./logo-angular.jpg)](https://angular.io/) [![Electron Logo](./logo-electron.jpg)](https://electron.atom.io/)

# Introduction

Bootstrap your project with Angular 4 and Electron (Typescript + SASS)

Currently runs with:

- Angular v4.0.1
- Angular-CLI v1.0.0
- Electron v1.6.2
- Electron-Prebuilt v1.4.13

## Getting Started

Clone this repository locally :

``` bash
git clone https://github.com/maximegris/angular-electron.git
```

Install dependencies with your favorite dependency manager (npm or yarn) :

``` bash
npm install
```

## To build for development

**in a terminal window** -> npm start  
**in another terminal window** -> npm run electron

The code for this is managed at `main.js`. In this sample, the app runs with a simple Electron window.
By default, Developer tools is opened. You can unactivate it by uncomment `win.webContents.openDevTools();` in `main.js`.

## To build for production

npm run build  
npm run electron dist
