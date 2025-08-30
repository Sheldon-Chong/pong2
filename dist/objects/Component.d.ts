import { GameObject } from './GameObject.js';
export declare class Component {
    name: string;
    renderable: boolean;
    enabled: boolean;
    host: GameObject | null;
    onUpdate?: () => void;
    constructor(params: Partial<Component>);
    init(): Component;
    update(): void;
}
//# sourceMappingURL=Component.d.ts.map