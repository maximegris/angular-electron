[![Angular Logo](https://www.vectorlogo.zone/logos/angular/angular-icon.svg)](https://angular.io/) [![Electron Logo](https://www.vectorlogo.zone/logos/electronjs/electronjs-icon.svg)](https://electronjs.org/)


# **Angular with Electron**
### ***Coding Electron with Angular-like Structure: Class-Based, Decorators, and Dependency Injection***
## Handling Tray Events with Decorators

Using decorators, you can efficiently manage Tray events. Here’s how you can listen to Tray events using the `@TrayListener` decorator:
### Example: Listening for `click` and `double-click` Events

```typescript
@TrayListener('click')
onTrayClick() { 
    if (this.window?.isVisible()) {
        this.window?.hide();
    } else {
        this.window?.show();
    }
    console.log('Tray clicked');
}

@TrayListener('double-click')
onTrayDoubleClick() {
    console.log('Tray double-clicked');
}
```
## Handling BrowserWindow Events with Decorators

Similarly, you can use decorators to handle BrowserWindow events effectively. For instance, to manage the `close` event, use the `@WindowListener` decorator:
### Example: Listening for the `close` Event

```typescript
@WindowListener('close')
onWindowClose() {
    this.window = null;
    console.log('Window closed');
}
```
### Define a Service

Use the `@injectable` decorator to mark your classes for dependency injection.

```typescript
import { injectable } from 'inversify';

@injectable()
export class FileService {
    // Implementation
}
```
### Inject Dependencies into Classes

Inject dependencies into your classes using the `@inject` decorator.

```typescript
import { injectable, inject } from 'inversify';
import { FileService } from './file.service'; // Adjust the path as necessary

@injectable()
export class MainWindow extends MainWindowBaseClass implements OnAppReady {
    private readonly TRAY_ICON_PATH = '/src/assets/icons/favicon.256x256.png';

    constructor(@inject(FileService) protected readonly fileService: FileService) {
        super();
    }

    // Other methods and properties
}
```
### Set Up the DI Container

Configure the DI container with the services you need.

```typescript
import { useProvide } from './dependency-injection-setup'; // Adjust the path as necessary

const container = useProvide([FileService]);
```
### Resolve the MainWindow Class with Dependencies

Resolve your main class with its dependencies from the container.

```typescript
const mainWindowWithDependencies = container.resolve(MainWindow);
``` 
