import { Tray} from 'electron';

export function TrayListener(eventName: TrayEvent) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (!target.__trayEvents) {
            target.__trayEvents = [];
        }

        const eventKey = `${eventName}_${propertyKey}`;

        // Prevent duplicate event binding
        if (!target.__trayEvents.includes(eventKey)) {
            target.__trayEvents.push(eventKey);

            const originalOnAppReady = target.onAppReady;

            target.onAppReady = function (...args: any[]) {
                if (typeof originalOnAppReady === 'function') {
                    originalOnAppReady.apply(this, args);
                }

                const tray = this.tray as Tray;

                if (tray) {
                    tray.on(eventName as any, this[propertyKey].bind(this));
                }
            };
        }
    };
}

type TrayEvent =
    | 'click'
    | 'right-click'
    | 'double-click'
    | 'mouse-enter'
    | 'mouse-leave'
    | 'mouse-move'
    | 'balloon-show'
    | 'balloon-click'
    | 'balloon-closed'
    | 'drop'
    | 'drop-files'
    | 'drop-text'
    | 'drag-enter'
    | 'drag-leave'
    | 'drag-end';
