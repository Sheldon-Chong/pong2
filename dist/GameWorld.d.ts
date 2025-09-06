import { Point2D } from './objects/Coordinates.js';
import { GameObject } from './objects/GameObject.js';
import { Camera } from './objects/Camera.js';
import { Viewport } from './objects/Viewport.js';
export declare class GameWorld {
    gameObjects: Map<number, GameObject>;
    camera: Camera | null;
    viewport: Viewport;
    game: any;
    constructor(viewport?: Viewport);
    addObject(object: GameObject): GameObject;
    checkCollisions(): void;
    update(): void;
    exportBackLog: GameObject[];
    exportState(): {
        camera: {
            position: Point2D;
        };
        gameObjects: any[];
    };
}
//# sourceMappingURL=GameWorld.d.ts.map