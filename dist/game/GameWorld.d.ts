import { Point2D } from '../objects/Coordinates.js';
import { GameObject } from '../objects/GameObject.js';
import { Camera } from '../objects/Camera.js';
import { Viewport } from '../objects/Viewport.js';
import { Timer } from '../objects/Timer.js';
export declare class GameWorld {
    gameObjects: Map<number, GameObject>;
    camera: Camera | null;
    bgColor: "#9FD044";
    viewport: Viewport;
    game: any;
    timers: Timer[];
    constructor(viewport?: Viewport);
    addTimer(durationSeconds: number, callback: () => void): void;
    addObject(object: GameObject): GameObject;
    checkCollisions(): void;
    update(): void;
    exportState(includeStaticObjects?: boolean): {
        camera: {
            position: Point2D;
        };
        gameObjects: any[];
        components: any[];
    };
}
//# sourceMappingURL=GameWorld.d.ts.map