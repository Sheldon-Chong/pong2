import { Component } from './Component.js';
import type { Viewport } from './Viewport.js';
export declare class HitBox extends Component {
    isColliding: boolean;
    constructor(params?: Partial<HitBox>);
    init(): HitBox;
    draw(viewport: Viewport): void;
}
//# sourceMappingURL=Hitbox.d.ts.map