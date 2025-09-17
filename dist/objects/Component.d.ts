import type { GameObject } from './GameObject.js';
export declare class Component {
    static globalId: number;
    id: number;
    name: string;
    renderable: boolean;
    enabled: boolean;
    host: GameObject | null;
    onUpdate?: () => void;
    constructor(params: Partial<Component>);
    init(): Component;
    update(): void;
    export(): this;
}
//# sourceMappingURL=Component.d.ts.map