"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const path = require("node:path");
const inversify_1 = require("inversify");
let FileService = class FileService {
    constructor() {
        this.rootPath = path.join(__dirname, '../../..');
    }
};
exports.FileService = FileService;
exports.FileService = FileService = __decorate([
    (0, inversify_1.injectable)()
], FileService);
//# sourceMappingURL=file.service.js.map