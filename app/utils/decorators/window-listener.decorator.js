"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowListener = void 0;
function WindowListener(eventName) {
    return function (target, propertyKey, descriptor) {
        if (!target.__windowEvents) {
            target.__windowEvents = [];
        }
        const eventKey = `${eventName}_${propertyKey}`;
        // Prevent duplicate event binding
        if (!target.__windowEvents.includes(eventKey)) {
            target.__windowEvents.push(eventKey);
            const originalOnAppReady = target.onAppReady;
            target.onAppReady = function (...args) {
                if (typeof originalOnAppReady === 'function') {
                    originalOnAppReady.apply(this, args);
                }
                const window = this.window;
                if (window) {
                    window.on(eventName, (...eventArgs) => {
                        // Ensure the method signature matches the event's arguments
                        if (typeof this[propertyKey] === 'function') {
                            const expectedArgs = eventArgs;
                            this[propertyKey](expectedArgs);
                        }
                    });
                }
            };
        }
    };
}
exports.WindowListener = WindowListener;
//# sourceMappingURL=window-listener.decorator.js.map