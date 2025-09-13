import { GameObject } from './GameObject.js';
import { Viewport } from './Viewport.js';
export declare class Label extends GameObject {
    text: string;
    font: string;
    color: string;
    className: string;
    constructor(params: Partial<Label>);
    draw(viewport: Viewport): void;
    export(exportStatic?: boolean): any;
}
//# sourceMappingURL=Label.d.ts.map