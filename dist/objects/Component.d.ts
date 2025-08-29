import { GameObject } from './GameObjects.js';
export declare class Component {
    name: string;
    renderable: boolean;
    enabled: boolean;
    host: GameObject | null;
    constructor(params: Partial<Component>);
    init(): Component;
}
//# sourceMappingURL=Component.d.ts.map