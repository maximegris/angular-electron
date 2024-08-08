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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var MainWindow_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainWindow = void 0;
const electron_1 = require("electron");
const inversify_1 = require("inversify");
require("reflect-metadata"); // Import reflect-metadata
const path = require("node:path");
const window_listener_decorator_1 = require("../utils/decorators/window-listener.decorator");
const file_service_1 = require("../utils/services/file.service");
const main_window_base_class_1 = require("../utils/base-classes/main-window.base-class");
const tray_listener_decorator_1 = require("../utils/decorators/tray-listener.decorator");
let MainWindow = MainWindow_1 = class MainWindow extends main_window_base_class_1.MainWindowBaseClass {
    constructor(fileService) {
        super();
        this.fileService = fileService;
        this.TRAY_ICON_PATH = '/src/assets/icons/favicon.256x256.png';
    }
    onAppReady() {
        this.createWindow();
        this.createTray();
    }
    createWindow() {
        const window = new electron_1.BrowserWindow({
            x: 0,
            y: 0,
            width: 800,
            height: 1100,
            resizable: false,
            webPreferences: {
                nodeIntegration: true,
                allowRunningInsecureContent: MainWindow_1.isServeMode,
                contextIsolation: false,
            },
        });
        this.loadUrl(window, this.fileService.rootPath);
    }
    createTray() {
        this.tray = new electron_1.Tray(path.join(this.fileService.rootPath, this.TRAY_ICON_PATH));
    }
    onTrayClick() {
        var _a, _b, _c;
        if ((_a = this.window) === null || _a === void 0 ? void 0 : _a.isVisible()) {
            (_b = this.window) === null || _b === void 0 ? void 0 : _b.hide();
        }
        else {
            (_c = this.window) === null || _c === void 0 ? void 0 : _c.show();
        }
        console.log('tray click');
    }
    onWindowClose() {
        this.window = null;
        console.log('window close');
    }
};
exports.MainWindow = MainWindow;
__decorate([
    (0, tray_listener_decorator_1.TrayListener)('click'),
    (0, tray_listener_decorator_1.TrayListener)('double-click'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MainWindow.prototype, "onTrayClick", null);
__decorate([
    (0, window_listener_decorator_1.WindowListener)('close'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MainWindow.prototype, "onWindowClose", null);
exports.MainWindow = MainWindow = MainWindow_1 = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(file_service_1.FileService)),
    __metadata("design:paramtypes", [file_service_1.FileService])
], MainWindow);
//# sourceMappingURL=main.window.js.map