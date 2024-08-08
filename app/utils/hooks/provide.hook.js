"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProvide = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
function useProvide(providers) {
    const container = new inversify_1.Container();
    providers.forEach(item => {
        container.bind(item).to(item);
    });
    return container;
}
exports.useProvide = useProvide;
//# sourceMappingURL=provide.hook.js.map