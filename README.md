[![Angular Logo](https://www.vectorlogo.zone/logos/angular/angular-icon.svg)](https://angular.io/) [![Electron Logo](https://www.vectorlogo.zone/logos/electronjs/electronjs-icon.svg)](https://electronjs.org/)

# **Angular with Electron**
# ***coding electron like angular structrue - class base and decorators and DI***


 

## Introduction

This is a fork of [angular-electron](https://github.com/maximegris/angular-electron)

Currently runs with:

- **Angular v17.3.6**
- **Electron v30.0.1** 


## Handling Tray Events with Decorators

To manage Tray events effectively using decorators, you can streamline your code as follows:

### Example: Listening for `click` and `double-click` Events

You can use the `@TrayListener` decorator to handle Tray events in a clean and organized way. Below is an example that listens for both `click` and `double-click` events:

```typescript
// Use @TrayListener to bind Tray events to methods
@TrayListener('click')
onTrayClick() { 
    console.log('tray click');
}

@TrayListener('double-click')
onTrayClick() {
    console.log('tray double click');
} 
```

## Handling BrowserWindow Events with Decorators

You can also use decorators to handle BrowserWindow events efficiently. For instance, to handle the `close` event, you can use the `@WindowListener` decorator.

### Example: Listening for the `close` Event

To listen for the `close` event on the BrowserWindow, use the `@WindowListener` decorator as shown below:

```typescript
// Use @WindowListener to bind BrowserWindow events to methods
@WindowListener('close')
onWindowClose() {
    console.log('window close');
}
```
## Dependency Injection (DI)

In this project, you can use dependency injection (DI) similarly to how it's done in Angular, thanks to InversifyJS. Below are examples demonstrating how to set up DI and provide services.

### Example: Injecting Services

```typescript 
@injectable()
export class FileService {

}
```
Use the `@injectable` decorator to mark your classes for dependency injection, and the `@inject` decorator to inject dependencies into your constructors.
```typescript
@injectable()
export class MainWindow extends MainWindowBaseClass implements OnAppReady {
     constructor(@inject(FileService) protected readonly fileService: FileService) {
        super();
    }
} 
```
```typescript 
// Set up the DI container with the services you need
const container = useProvide([FileService]);

// Resolve the MainWindow class with its dependencies
const mainWindow = container.resolve(MainWindow);
``` 
