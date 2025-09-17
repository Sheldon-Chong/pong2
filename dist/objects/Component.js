export class Component {
    static globalId = 1;
    id = -1;
    name = "";
    renderable = false;
    enabled = true;
    host;
    onUpdate;
    constructor(params) {
        Object.assign(this, params);
        this.id = Component.globalId;
        Component.globalId++;
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