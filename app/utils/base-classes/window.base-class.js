"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var WindowBaseClass_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowBaseClass = void 0;
const electron_1 = require("electron");
const fs = require("node:fs");
const path = require("node:path");
const inversify_1 = require("inversify");
require("reflect-metadata"); // Required for InversifyJS to work properly
let WindowBaseClass = WindowBaseClass_1 = class WindowBaseClass {
    constructor() {
        this.window = null;
        this.tray = null;
        electron_1.app.whenReady().then(() => this.onAppReady());
    }
    loadUrl(window, absolutePath) {
        this.window = window;
        if (WindowBaseClass_1.isServeMode) {
            const debug = require('electron-debug');
            debug();
            require('electron-reloader')(module);
            this.window.loadURL('http://localhost:4200');
        }
        else {
            let pathIndex = './index.html';
            if (fs.existsSync(path.join(absolutePath, '../dist/index.html'))) {
                pathIndex = '../dist/index.html';
            }
            const url = new URL(path.join('file:', absolutePath, pathIndex));
            this.window.loadURL(url.href);
        }
    }
};
exports.WindowBaseClass = WindowBaseClass;
WindowBaseClass.isServeMode = process.argv.slice(1).some(val => val === '--serve');
exports.WindowBaseClass = WindowBaseClass = WindowBaseClass_1 = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], WindowBaseClass);
//# sourceMappingURL=window.base-class.js.map