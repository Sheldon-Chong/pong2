import { GameObject } from './GameObject.js';

export class Component {
    name: string = "";
    renderable: boolean = false;
    enabled: boolean = true;
    host: GameObject | null;

	public onUpdate?: () => void;

    constructor(params: Partial<Component>) {
        Object.assign(this, params);
    }

    init(): Component {
        return this;   
    }

    update() {
        if (this.onUpdate)
            this.onUpdate();
    }
}