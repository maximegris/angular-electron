"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainWindowBaseClass = void 0;
require("reflect-metadata"); // Required for InversifyJS to work properly
const inversify_1 = require("inversify");
const window_base_class_1 = require("./window.base-class");
let MainWindowBaseClass = class MainWindowBaseClass extends window_base_class_1.WindowBaseClass {
    constructor() {
        super(...arguments);
        this.tray = null;
    }
};
exports.MainWindowBaseClass = MainWindowBaseClass;
exports.MainWindowBaseClass = MainWindowBaseClass = __decorate([
    (0, inversify_1.injectable)()
], MainWindowBaseClass);
//# sourceMappingURL=main-window.base-class.js.map