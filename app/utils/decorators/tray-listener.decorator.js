"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrayListener = void 0;
function TrayListener(eventName) {
    return function (target, propertyKey, descriptor) {
        if (!target.__trayEvents) {
            target.__trayEvents = [];
        }
        const eventKey = `${eventName}_${propertyKey}`;
        // Prevent duplicate event binding
        if (!target.__trayEvents.includes(eventKey)) {
            target.__trayEvents.push(eventKey);
            const originalOnAppReady = target.onAppReady;
            target.onAppReady = function (...args) {
                if (typeof originalOnAppReady === 'function') {
                    originalOnAppReady.apply(this, args);
                }
                const tray = this.tray;
                if (tray) {
                    tray.on(eventName, this[propertyKey].bind(this));
                }
            };
        }
    };
}
exports.TrayListener = TrayListener;
//# sourceMappingURL=tray-listener.decorator.js.map