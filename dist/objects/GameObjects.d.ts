import { Point2D, Vector2D } from './Coordinates.js';
import type { PongGame3 } from '../pong3.js';
import { Component } from './Component.js';
export declare class GameObject {
    game: PongGame3;
    id: number;
    static globalId: number;
    name: string;
    parent: GameObject | null;
    children: GameObject[];
    position: Point2D;
    rotation: number;
    scale: Vector2D;
    velocity: Vector2D;
    acceleration: Vector2D;
    maximumVelocity: Vector2D;
    components: Component[];
    onUpdate?: () => void;
    cache: any;
    test: any;
    constructor(params: Partial<GameObject>);
    addComponent(component: Component): Component;
    addChild(object: GameObject): void;
    update(): void;
    getWorldPosition(): Point2D;
    getWorldScale(): Vector2D;
    draw(ctx: CanvasRenderingContext2D): void;
}
//# sourceMappingURL=GameObjects.d.ts.map