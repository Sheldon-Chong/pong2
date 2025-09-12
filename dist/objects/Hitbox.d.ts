import { Component } from './Component.js';
import type { Viewport } from './Viewport.js';
export declare class HitBox extends Component {
    isColliding: boolean;
    onCollide?: (other: HitBox) => void;
    constructor(params?: Partial<HitBox>);
    init(): HitBox;
    draw(viewport: Viewport): void;
    isCollidingWith(other: HitBox): boolean;
    toJSON(exportStatic?: boolean): {
        id: number;
        name: string;
    };
}
//# sourceMappingURL=Hitbox.d.ts.map