import { Point2D, Vector2D } from './Coordinates.js';
import { Sprite } from './Sprite.js';
import { Component } from './Component.js';
const RenderableMarker = Symbol("Renderable");
function ownsProperty(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}
export function pruneEmpty(obj, exportStatic = false) {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
        if (value === undefined || value === null)
            continue;
        if (Array.isArray(value) && value.length === 0)
            continue;
        if (typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0)
            continue;
        if (key.startsWith("STATIC_")) {
            if (exportStatic) {
                result[key.slice("STATIC_".length)] = value;
                console.log("exported as", value);
            }
        }
        else {
            result[key] = value;
        }
    }
    return result;
}
export class GameObject {
    game;
    id;
    static globalId = 0;
    // identification
    name = "";
    // hierarchy
    parent = null;
    children = [];
    // physics
    position = new Point2D(0, 0);
    rotation = 0;
    scale = new Vector2D(10, 10);
    velocity = new Vector2D(0, 0);
    acceleration = new Vector2D(0, 0);
    maximumVelocity = new Vector2D(1000, 1000);
    onUpdate;
    zIndex = 0;
    // --webserver stuff--
    cache = {};
    isStatic = false;
    init() {
    }
    updateToGame() {
        this.game.world.exportBackLog.push(this);
    }
    components = new Map();
    constructor(params) {
        Object.assign(this, params);
        this.id = GameObject.globalId;
        GameObject.globalId++;
        console.log(params.components);
        const map = new Map();
        if (Array.isArray(params.components)) {
            for (const component of params.components) {
                component.host = this;
                component.init();
                map.set(component.id, component);
            }
        }
        this.components = map;
    }
    addComponent(component) {
        this.components.set(component.id, component);
        component.host = this;
        component.init();
        return component;
    }
    getComponents() {
        return this.components.values().toArray();
    }
    addChild(object) {
        this.children.push(object);
        object.parent = this;
        object.game = this.game;
    }
    update() {
        this.velocity = this.velocity.add(this.acceleration.multiply(this.game.delta));
        if (this.maximumVelocity) {
            this.velocity.x = Math.max(-Math.abs(this.maximumVelocity.x), Math.min(this.velocity.x, Math.abs(this.maximumVelocity.x)));
            this.velocity.y = Math.max(-Math.abs(this.maximumVelocity.y), Math.min(this.velocity.y, Math.abs(this.maximumVelocity.y)));
        }
        this.position = this.position.add(this.velocity.multiply(this.game.delta));
        if (this.onUpdate)
            this.onUpdate();
        for (const child of this.children) {
            child.update();
        }
    }
    getWorldPosition(added = new Vector2D(0, 0)) {
        if (!this.parent) {
            return new Point2D(this.position.x, this.position.y).add(added);
        }
        const parentPos = this.parent.getWorldPosition(new Vector2D(0, 0));
        return new Point2D(parentPos.x + this.position.x, parentPos.y + this.position.y).add(added);
    }
    getWorldScale() {
        if (!this.parent) {
            return new Vector2D(this.scale.x, this.scale.y);
        }
        const parentScale = this.parent.getWorldScale();
        return parentScale.multiply(this.scale);
    }
    componentToJSON(exportStatic = false) {
        return this.getComponents().map(component => {
            if (typeof component.toJSON === "function") {
                return component.toJSON(exportStatic);
            }
            const componentJson = {};
            for (const key in component) {
                if (key !== "host" && ownsProperty(component, key)) {
                    componentJson[key] = component[key];
                }
            }
            return componentJson;
        });
    }
    draw(viewport) {
        // Draw this object's components
        for (const component of this.getComponents()) {
            if (component === null || component.host === null) {
                continue;
            }
            if (component.name === "sprite") {
                try {
                    component.draw(viewport);
                }
                catch (error) {
                    console.log("CAMERA", error);
                    console.log("component", component);
                }
            }
            if (component.name === "hitbox") {
                try {
                    component.draw(viewport);
                }
                catch (error) {
                    console.log("error", typeof component);
                }
            }
        }
        // Recursively draw children
        for (const child of this.children) {
            // console.log(JSON.stringify(this.children));
            try {
                child.draw(viewport);
                // console.log("child drawn", typeof child);
            }
            catch (error) {
                // console.log("error", error);
            }
        }
    }
    export(exportStatic = false) {
        const json = {
            name: this.name,
            id: this.id,
            position: this.position,
            scale: this.scale,
            rotation: this.rotation,
            zIndex: this.zIndex,
            children: this.children.map(child => child.id),
            components: this.componentToJSON(),
        };
        return pruneEmpty(json, exportStatic);
    }
}
//# sourceMappingURL=GameObject.js.map