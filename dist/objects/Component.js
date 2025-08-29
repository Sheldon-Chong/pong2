import { GameObject } from './GameObjects.js';
export class Component {
    name = "";
    renderable = false;
    enabled = true;
    host;
    constructor(params) {
        Object.assign(this, params);
    }
    init() {
        return this;
    }
}
//# sourceMappingURL=Component.js.map