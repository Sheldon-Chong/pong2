import { interpolate, Point2D, Vector2D } from "./Coordinates.js";
import { GameObject, exportCleanup } from "./GameObject.js";
import { Sprite } from "./Sprite.js";
export class Interpolate {
    target = null;
    targetOffset = new Vector2D(0, 0);
    clamp = new Vector2D(10, 10);
    slowness = 2;
    constructor(params) {
        Object.assign(this, params);
    }
}
export class ImageObject extends GameObject {
    sprite;
    scaleFactor = new Vector2D(1, 1);
    params;
    interpolate = new Interpolate({});
    truePos;
    className = "imageObject";
    constructor(params) {
        super({});
        Object.assign(this, params);
        this.components = new Map();
        this.truePos = this.position;
        this.params = params;
        this.onUpdate = () => {
            console.log("factor:", this.scaleFactor);
            this.scale = new Vector2D(this.sprite.width, this.sprite.height).multiply(this.scaleFactor);
            if (this.interpolate.target !== null) {
                const endPosition = this.interpolate.target.position.add(this.interpolate.targetOffset);
                this.truePos = interpolate(this.truePos, endPosition, this.interpolate.slowness);
                this.position = this.truePos;
                if (this.position.y > endPosition.add(this.interpolate.clamp).y) {
                    this.position.y = endPosition.add(this.interpolate.clamp).y;
                }
                if (this.position.y < endPosition.subtract(this.interpolate.clamp).y) {
                    this.position.y = endPosition.subtract(this.interpolate.clamp).y;
                }
            }
        };
        this.sprite = this.addComponent(new Sprite({
            ...params.sprite,
            onLoad: () => {
                this.scale = new Vector2D(this.sprite.width, this.sprite.height).multiply(this.scaleFactor);
            }
        }));
        this.getWorldPosition = (added) => {
            return this.position.add(this.interpolate.targetOffset);
        };
    }
    init() {
    }
    export(exportStatic = false) {
        // console.log(this.componentToJSON());
        return exportCleanup({
            id: this.id,
            className: this.className,
            // components: this.componentToJSON(),
            sprite: this.sprite.toJSON(), //todo problem here!! nonstatic not working
            zIndex: this.zIndex,
            position: this.position.export(),
            scaleFactor: this.scaleFactor,
            // scale: this.scale
        }, exportStatic);
    }
}
//todo fix the revive and update methods using seperate tester file
//# sourceMappingURL=ImageObject.js.map