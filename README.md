[![Angular Logo](./logo-angular.jpg)](https://angular.io/) [![Electron Logo](./logo-electron.jpg)](https://electron.atom.io/)

# Introduction

Bootstrap your project with Angular 4 and Electron (Typescript + SASS)

Currently runs with:

- Angular v4.0.1
- Angular-CLI v1.0.0
- Electron v1.6.2

With this sample, you can :

- Run your app in a local development environment with Electron & Hot reload
- Package your app into an executable file for Linux, Windows & Mac

## Getting Started

Clone this repository locally :

``` bash
git clone https://github.com/maximegris/angular-electron.git
```

Install dependencies with your favorite dependency manager (npm or yarn) :

``` bash
npm install
```

If you want to use Angular-cli to generate components & co, you must to install it globally.  
Please follow [Angular-cli documentation](https://github.com/angular/angular-cli) if you had installed an old version of angular-cli and need to upgrade it.

``` bash
npm install -g @angular/cli
```


## To build for development

**in a terminal window** -> npm start  
**in another terminal window** -> npm run electron:serve

Voila! You have your Angular + Electron app in a local development environment with hot reload !

The code for this is managed at `main.js`. In this sample, the app runs with a simple Electron window.
By default, Developer tools is open. You can desactivate it by commenting `win.webContents.openDevTools();` in `main.js`.

## To build for production

- npm run electron:dist

You can find your built files in the /dist directory.

## Included Commands

- `npm run electron:linux` - builds your application and creates an app consumable on linux systems.
- `npm run electron:windows` - On a Windows OS, builds your application and creates an app consumable in windows 32/64 bit systems.
- `npm run electron:mac` - On a MAC OS, builds your application and generates a `.app` file of your application that can be run on mac .

**Your executable is optimised. There are only the files of /dist directory in the executable generated.**