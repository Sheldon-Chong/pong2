import { Point2D, Vector2D } from './Coordinates.js';
import type { PongGame } from '../pong3.js';
import type { Viewport } from './Viewport.js';
import { Component } from './Component.js';
export declare class GameObject {
    game: PongGame;
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
    toUpdate: boolean;
    onUpdate?: () => void;
    cache: any;
    init(): void;
    updateToGame(): void;
    constructor(params: Partial<GameObject>);
    addComponent(component: Component): Component;
    addChild(object: GameObject): void;
    update(): void;
    getWorldPosition(added?: Vector2D): Point2D;
    getWorldScale(): Vector2D;
    componentToJSON(): Record<string, any>[];
    draw(viewport: Viewport): void;
    export(): any;
}
//# sourceMappingURL=GameObject.d.ts.map