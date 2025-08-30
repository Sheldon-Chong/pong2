import { GameObject } from './GameObjects.js';
export class Component {
    name = "";
    renderable = false;
    enabled = true;
    host;
    onUpdate;
    constructor(params) {
        Object.assign(this, params);
    }
    init() {
        return this;
    }
    update() {
        if (this.onUpdate)
            this.onUpdate();
    }
}
//# sourceMappingURL=Component.js.map