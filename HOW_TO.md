###*First check it exists a version of your library compatible with the version of Angular defined in package.json.*

### How to install ng-bootstrap

``` bash
ng add @ng-bootstrap/ng-bootstrap
```

### How to install ngx-bootstrap

``` bash
ng add ngx-bootstrap
```

### How to install Angular Material

Temporarily replace custom builders by default ones in `angular.json`

@angular-builders/custom-esbuild:browser => @angular-devkit/build-angular:browser \
@angular-builders/custom-esbuild:dev-server => @angular-devkit/build-angular:dev-server

Add Angular Material using `ng add` command:

``` bash
ng add @angular/material
```
You will get the following questions:

``` bash
? Choose a prebuilt theme name, or "custom" for a custom theme: *Choose any theme you like here*
? Set up global Angular Material typography styles? *Yes* 
? Set up browser animations for Angular Material? *Do not include / error if you choose Include*
```
Angular Material Library is now installed in your project.

Put back custom builders in `angular.json`

@angular-devkit/build-angular:browser => @angular-builders/custom-esbuild:browser \
@angular-devkit/build-angular:dev-server => @angular-builders/custom-esbuild:dev-server
