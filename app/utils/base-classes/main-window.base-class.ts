import {Tray} from "electron";
import "reflect-metadata"; // Required for InversifyJS to work properly
import {injectable} from "inversify";

import {OnAppReady} from "../interfaces/on-app-ready.interface";
import {WindowBaseClass} from "./window.base-class";

@injectable()
export abstract class MainWindowBaseClass extends WindowBaseClass implements OnAppReady {
    protected tray: Tray | null = null;

    abstract onAppReady(): void;
}
