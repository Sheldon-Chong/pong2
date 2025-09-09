import { Point2D, Vector2D } from './Coordinates.js';
import { Sprite } from './Sprite.js';
import { Component } from './Component.js';
const RenderableMarker = Symbol("Renderable");
// function genericUpdate(obj: any, params: any, cache: any) {
// 		for (const key in params) {
// 				if (cache[key] !== params[key]) {
// 						if (key === "position" && params.position) 
// 								obj.position = new Point2D(params.position.x, params.position.y);
// 						else if (key === "size" && params.size) 
// 								obj.size = new Vector2D(params.size.x, params.size.y);
// 						else 
// 								obj[key] = params[key];
// 						cache[key] = params[key];
// 				}
// 		}
// }
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
    components = [];
    toUpdate = false;
    onUpdate;
    // --webserver stuff--
    cache = {};
    constantSync = true;
    init() {
    }
    updateToGame() {
        this.game.world.exportBackLog.push(this);
    }
    constructor(params) {
        Object.assign(this, params);
        this.id = GameObject.globalId;
        GameObject.globalId++;
        for (const component of this.components) {
            component.host = this;
            component.init();
        }
    }
    addComponent(component) {
        this.components.push(component);
        component.host = this;
        component.init();
        return component;
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
    componentToJSON() {
        return this.components.map(component => {
            const json = {};
            for (const key in component) {
                if (key !== "host" && Object.prototype.hasOwnProperty.call(component, key)) {
                    json[key] = component[key];
                }
            }
            return json;
        });
    }
    draw(viewport) {
        // Draw this object's components
        for (const component of this.components) {
            if (component.name === "sprite") {
                try {
                    component.draw(viewport);
                } //todo!!! ISSUE HERE. Cannot simply pass a camera instance. This is the frontend we're talkin about
                catch (error) {
                    console.log("CAMERA", error);
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
    export() {
        return {
            name: this.name,
            id: this.id,
            position: this.position,
            scale: this.scale,
            rotation: this.rotation,
            components: this.componentToJSON(),
            children: this.children?.map(child => child.id),
            // className: "className" in this ? (this as any).className : undefined
        };
    }
}
//# sourceMappingURL=GameObject.js.map