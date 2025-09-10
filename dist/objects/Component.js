import { GameObject } from './GameObject.js';
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
    export() {
        return this;
    }
}
//# sourceMappingURL=Component.js.map