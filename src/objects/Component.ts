import { GameObject } from './GameObjects.js';

export class Component {
    name: string = "";
    renderable: boolean = false;
    enabled: boolean = true;
    host: GameObject | null;

    constructor(params: Partial<Component>) {
        Object.assign(this, params);
    }

    init(): Component {
        return this;   
    }
}