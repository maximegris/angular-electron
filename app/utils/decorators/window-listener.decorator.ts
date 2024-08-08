import {BrowserWindow} from 'electron';

export function WindowListener(eventName: BrowserWindowEvent) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (!target.__windowEvents) {
            target.__windowEvents = [];
        }

        const eventKey = `${eventName}_${propertyKey}`;

        // Prevent duplicate event binding
        if (!target.__windowEvents.includes(eventKey)) {
            target.__windowEvents.push(eventKey);

            const originalOnAppReady = target.onAppReady;

            target.onAppReady = function (...args: any[]) {
                if (typeof originalOnAppReady === 'function') {
                    originalOnAppReady.apply(this, args);
                }

                const window = this.window as BrowserWindow;

                if (window) {
                    window.on(eventName as any, this[propertyKey].bind(this));
                }
            };
        }
    };
}

type BrowserWindowEvent =
    | 'page-title-updated'
    | 'close'
    | 'closed'
    | 'session-end'
    | 'unresponsive'
    | 'responsive'
    | 'blur'
    | 'focus'
    | 'show'
    | 'hide'
    | 'ready-to-show'
    | 'maximize'
    | 'unmaximize'
    | 'minimize'
    | 'restore'
    | 'will-resize'
    | 'resize'
    | 'will-move'
    | 'move'
    | 'moved'
    | 'enter-full-screen'
    | 'leave-full-screen'
    | 'enter-html-full-screen'
    | 'leave-html-full-screen'
    | 'always-on-top-changed'
    | 'app-command'
    | 'scroll-touch-begin'
    | 'scroll-touch-end'
    | 'scroll-touch-edge'
    | 'swipe'
    | 'sheet-begin'
    | 'sheet-end'
    | 'new-window-for-tab';
