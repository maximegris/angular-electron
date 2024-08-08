import {BrowserWindow, Event as ElectronEvent, Rectangle, Tray} from 'electron';
import {inject, injectable} from "inversify";
import 'reflect-metadata'; // Import reflect-metadata
import * as path from "node:path";

import {WindowListener} from "../utils/decorators/window-listener.decorator";
import {OnAppReady} from "../utils/interfaces/on-app-ready.interface";
import {FileService} from "../utils/services/file.service";
import {MainWindowBaseClass} from "../utils/base-classes/main-window.base-class";
import {TrayListener} from "../utils/decorators/tray-listener.decorator";
import {TrayEventEnum} from "../utils/enums/tray-listener.enum";
import {WindowEventEnum} from "../utils/enums/window-listener.enum";
import {WindowEventType} from "../utils/types/window-listener.type";
import {TrayEventType} from "../utils/types/tray-listener.type";

@injectable()
export class MainWindow extends MainWindowBaseClass implements OnAppReady {
    private readonly TRAY_ICON_PATH = '/src/assets/icons/favicon.256x256.png';

    constructor(@inject(FileService) protected readonly fileService: FileService) {
        super();
    }


    onAppReady() {
        this.createWindow();
        this.createTray();
    }

    private createWindow() {
        const window = new BrowserWindow({
            x: 0,
            y: 0,
            width: 800,
            height: 1100,
            resizable: false,
            webPreferences: {
                nodeIntegration: true,
                allowRunningInsecureContent: MainWindow.isServeMode,
                contextIsolation: false,
            },
        });
        this.loadUrl(window, this.fileService.rootPath);
    }

    private createTray() {
        this.tray = new Tray(path.join(this.fileService.rootPath, this.TRAY_ICON_PATH));
    }

    @TrayListener(TrayEventEnum.CLICK)
    onClick(event: TrayEventType[TrayEventEnum.CLICK]): void {
        console.log(event[1].width)
    }


    @WindowListener(WindowEventEnum.CLOSED)
    onWindowClose(event: WindowEventType[WindowEventEnum.CLOSED]): void {

    }
}


