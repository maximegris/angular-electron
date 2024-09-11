"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpcListener = void 0;
const electron_1 = require("electron");
function IpcListener(channel) {
    return function (target, propertyKey, descriptor) {
        if (!target.__ipcEvents) {
            target.__ipcEvents = [];
        }
        const eventKey = `${channel}_${propertyKey}`;
        // Prevent duplicate event binding
        if (!target.__ipcEvents.includes(eventKey)) {
            target.__ipcEvents.push(eventKey);
            const originalOnAppReady = target.onAppReady;
            target.onAppReady = function (...args) {
                if (typeof originalOnAppReady === 'function') {
                    originalOnAppReady.apply(this, args);
                }
                // Listen to the IPC event
                electron_1.ipcMain.on(channel, (event, ...eventArgs) => {
                    if (typeof this[propertyKey] === 'function') {
                        this[propertyKey](event, ...eventArgs);
                    }
                });
            };
        }
    };
}
exports.IpcListener = IpcListener;
//# sourceMappingURL=ipc-listener.decorator.js.map