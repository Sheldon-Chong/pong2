import { GameObject } from './GameObjects.js';

export class Component {
    name: string = "";
    renderable: boolean = false;
    enabled: boolean = true;
    parent: GameObject | null;

    constructor(params: Partial<Component>) {
        Object.assign(this, params);
    }

    init(): Component {
        return this;   
    }
}