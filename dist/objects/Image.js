import { Vector2D } from "./Coordinates.js";
import { GameObject, exportCleanup } from "./GameObject.js";
import { Sprite } from "./Sprite.js";
export class ImageObject extends GameObject {
    path;
    scaleFactor = new Vector2D(10, 10);
    params;
    className = "image";
    sprite = null;
    constructor(params) {
        super({
            game: params.game,
            components: []
        });
        this.params = params;
        this.onUpdate = () => {
            this.scale = new Vector2D(this.sprite.width, this.sprite.height);
        };
    }
    init() {
        this.sprite = this.addComponent(new Sprite({
            imagePath: this.params.path,
            onLoad: () => {
                this.scale = new Vector2D(this.sprite.width, this.sprite.height);
                console.log("onload called");
            }
        }));
    }
    export(exportStatic = false) {
        console.log("this scale", this.scale);
        return exportCleanup({
            id: this.id,
            className: this.className,
            components: this.componentToJSON()
            // scale: this.scale
        });
    }
}
//# sourceMappingURL=Image.js.map