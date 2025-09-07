import { GameObject } from './GameObject.js';
import { Viewport } from './Viewport.js';
export declare class Label extends GameObject {
    text: string;
    font: string;
    color: string;
    classType: string;
    constructor(params: any);
    draw(viewport: Viewport): void;
    export(): any;
}
//# sourceMappingURL=Label.d.ts.map