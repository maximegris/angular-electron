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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainWindow = void 0;
const electron_1 = require("electron");
const inversify_1 = require("inversify");
require("reflect-metadata"); // Import reflect-metadata
const path = require("node:path");
const file_service_1 = require("../utils/services/file.service");
const main_window_base_class_1 = require("../utils/base-classes/main-window.base-class");
const tray_listener_decorator_1 = require("../utils/decorators/tray-listener.decorator");
const tray_listener_enum_1 = require("../utils/enums/tray-listener.enum");
const window_listener_decorator_1 = require("../utils/decorators/window-listener.decorator");
const window_listener_enum_1 = require("../utils/enums/window-listener.enum");
const ipc_listener_decorator_1 = require("../utils/decorators/ipc-listener.decorator");
const ipc_channel_enum_1 = require("../../shared/enums/ipc-channel.enum");
let MainWindow = class MainWindow extends main_window_base_class_1.MainWindowBaseClass {
    constructor(fileService) {
        super();
        this.fileService = fileService;
        this.TRAY_ICON_PATH = '/src/assets/icons/electron.png';
        this.popupWindow = null;
        this.mainWindowBounds = {
            width: 200,
            height: 400,
        };
    }
    onAppReady() {
        this.createMainWindow();
        this.createTray();
    }
    createMainWindow() {
        const window = new electron_1.BrowserWindow({
            x: 0,
            y: 0,
            width: this.mainWindowBounds.width,
            height: this.mainWindowBounds.height,
            resizable: false,
            frame: false,
            skipTaskbar: true,
            show: false,
            webPreferences: {
                nodeIntegration: true,
                allowRunningInsecureContent: true,
                contextIsolation: false,
                backgroundThrottling: false
            },
        });
        this.loadUrl(window, this.fileService.rootPath);
    }
    createTray() {
        this.tray = new electron_1.Tray(path.join(this.fileService.rootPath, this.TRAY_ICON_PATH));
        this.tray.setToolTip('this is my first timer');
    }
    onTrayClick([event, bounds]) {
        if (this.window) {
            const newBounds = {
                x: bounds.x - (this.mainWindowBounds.width / 2),
                y: bounds.y - this.mainWindowBounds.height - 10,
                width: this.mainWindowBounds.width,
                height: this.mainWindowBounds.height,
            };
            this.window.setBounds(newBounds);
            this.window.show();
        }
    }
    onTrayRightClick(event) {
        var _a;
        const trayMenuConfig = electron_1.Menu.buildFromTemplate([
            {
                label: 'quit',
                click: () => {
                    this.app.quit();
                }
            },
            {
                label: 'show',
                click: () => {
                    var _a;
                    (_a = this.window) === null || _a === void 0 ? void 0 : _a.show();
                }
            },
            {
                label: 'hide',
                click: () => {
                    var _a;
                    (_a = this.window) === null || _a === void 0 ? void 0 : _a.hide();
                }
            }
        ]);
        (_a = this.tray) === null || _a === void 0 ? void 0 : _a.popUpContextMenu(trayMenuConfig);
    }
    onWindowBlur() {
        var _a;
        (_a = this.window) === null || _a === void 0 ? void 0 : _a.hide();
    }
    onUpdateText(event, timeLeft) {
        var _a;
        console.log(timeLeft);
        (_a = this.tray) === null || _a === void 0 ? void 0 : _a.setToolTip(timeLeft);
    }
};
exports.MainWindow = MainWindow;
__decorate([
    (0, tray_listener_decorator_1.TrayListener)(tray_listener_enum_1.TrayEventEnum.CLICK),
    (0, tray_listener_decorator_1.TrayListener)(tray_listener_enum_1.TrayEventEnum.DOUBLE_CLICK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MainWindow.prototype, "onTrayClick", null);
__decorate([
    (0, tray_listener_decorator_1.TrayListener)(tray_listener_enum_1.TrayEventEnum.RIGHT_CLICK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MainWindow.prototype, "onTrayRightClick", null);
__decorate([
    (0, window_listener_decorator_1.WindowListener)(window_listener_enum_1.WindowEventEnum.BLUR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MainWindow.prototype, "onWindowBlur", null);
__decorate([
    (0, ipc_listener_decorator_1.IpcListener)(ipc_channel_enum_1.IPCChannelEnum.UPDATE_TRAY_TEXT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MainWindow.prototype, "onUpdateText", null);
exports.MainWindow = MainWindow = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(file_service_1.FileService)),
    __metadata("design:paramtypes", [file_service_1.FileService])
], MainWindow);
//# sourceMappingURL=main.window.js.map