import { GameObject } from './GameObjects.js';
import { Viewport } from './Viewport.js';
export declare class Label extends GameObject {
    text: string;
    font: string;
    color: string;
    constructor(params: any);
    draw(viewport: Viewport): void;
}
//# sourceMappingURL=Label.d.ts.map