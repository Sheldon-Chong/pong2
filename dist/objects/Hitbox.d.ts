import { Component } from './Component.js';
import type { Viewport } from './Viewport.js';
export declare class HitBox extends Component {
    isColliding: boolean;
    onCollide?: (other: HitBox) => void;
    constructor(params?: Partial<HitBox>);
    init(): HitBox;
    draw(viewport: Viewport): void;
    isCollidingWith(other: HitBox): boolean;
}
//# sourceMappingURL=Hitbox.d.ts.map