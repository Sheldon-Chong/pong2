import { Point2D, Vector2D } from './Coordinates.js';
import type { PongGame } from '../game/pong.js';
import type { Viewport } from './Viewport.js';
import { Component } from './Component.js';
export declare function exportCleanup<T extends Record<string, any>>(obj: T, exportStatic?: boolean): T;
export declare class GameObject {
    game: PongGame;
    static globalId: number;
    name: string;
    id: number;
    parent: GameObject | null;
    children: GameObject[];
    position: Point2D;
    rotation: number;
    scale: Vector2D;
    velocity: Vector2D;
    acceleration: Vector2D;
    maximumVelocity: Vector2D;
    onUpdate?: () => void;
    zIndex: number;
    variables: {};
    cache: any;
    isStatic: boolean;
    init(): void;
    updateToGame(): void;
    components: Map<number, Component> | Component[];
    constructor(params: Partial<GameObject>);
    addComponent(component: Component): Component;
    getComponents(): Component[];
    addChild(object: GameObject): void;
    update(): void;
    clientUpdate(): void;
    getWorldPosition(added?: Vector2D): Point2D;
    getWorldScale(): Vector2D;
    componentToJSON(exportStatic?: boolean): any[];
    draw(viewport: Viewport): void;
    export(exportStatic?: boolean): Record<string, any>;
}
//# sourceMappingURL=GameObject.d.ts.map