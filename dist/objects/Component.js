import { GameObject } from './GameObjects.js';
export class Component {
    name = "";
    renderable = false;
    enabled = true;
    parent;
    constructor(params) {
        Object.assign(this, params);
    }
    init() {
        return this;
    }
}
//# sourceMappingURL=Component.js.map