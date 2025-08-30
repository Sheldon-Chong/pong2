import { GameObject } from './GameObjects.js';
import type { Viewport } from './Viewport.js';
export declare class HitBox extends GameObject {
    isColliding: boolean;
    constructor(params: Partial<HitBox>);
    draw(viewport: Viewport): void;
}
//# sourceMappingURL=Hitbox.d.ts.map