import { Point2D, Vector2D } from '../objects/Coordinates.js';
import { GameObject } from '../objects/GameObject.js';
import { Camera } from '../objects/Camera.js';
import { Viewport } from '../objects/Viewport.js';
import { HitBox } from '../objects/Hitbox.js';
import { Timer } from '../objects/Timer.js';

export class GameWorld {
  gameObjects: Map<number, GameObject> = new Map();
  camera: Camera | null = null;
  viewport: Viewport;
  game: any;
  timers: Timer[] = [];

  constructor(viewport?: Viewport) {
    this.viewport = viewport ?? new Viewport({ width: 800, height: 400 });
    
  }

  addTimer(durationSeconds: number, callback: () => void) {
    this.timers.push(new Timer(durationSeconds, callback));
  }

  addObject(object: GameObject) {
    this.gameObjects.set(object.id, object);
    object.init();
    if (object.children && object.children.length > 0) {
      for (const child of object.children) {
        this.addObject(child);
      }
    }
    return object;
  }

  checkCollisions() {
    const hitboxes: HitBox[] = [];
    for (const obj of this.gameObjects.values()) {
      for (const comp of obj.getComponents()) {
        if (comp instanceof HitBox) {
          hitboxes.push(comp);
        }
      }
    }
    for (let i = 0; i < hitboxes.length; i++) {
      for (let j = i + 1; j < hitboxes.length; j++) {
        const a = hitboxes[i];
        const b = hitboxes[j];
        if (a.isCollidingWith(b)) {
          a.isColliding = b.isColliding = true;
          a.onCollide?.(b);
          b.onCollide?.(a);
        } else {
          a.isColliding = b.isColliding = false;
        }
      }
    }
  }

  update() {
    for (const object of this.gameObjects.values()) {
      object.update();
    }
    this.checkCollisions();

    for (const timer of this.timers) {
      timer.update();
    }
  }

  exportBackLog: GameObject[] = [];

  exportState(
    includeStaticObjects: boolean = false
  ) {
    const visited = new Set();
    const flatObjects: any[] = [];

    const components = [];
    

    function flatten(obj) {
      if (!obj || visited.has(obj.id)) return;
      visited.add(obj.id);


      if (obj.isStatic === true // if only exports once
        && !includeStaticObjects)
        return
      let staticObjects = obj.export(includeStaticObjects);

      let keysWithId = []
      for (const [key, component] of obj.components) {
        if (component.id) 
          keysWithId.push(key);
      }

      staticObjects.components = keysWithId;
      flatObjects.push(staticObjects);
      
      const componentJson = obj.componentToJSON(includeStaticObjects);
      components.push(...componentJson);

      if (obj.children && obj.children.length > 0) {
        for (const child of obj.children)
          flatten(child);
      }
    }

    for (const obj of this.gameObjects.values()) {
      flatten(obj);
    }

    this.exportBackLog.length = 0;

    return {
      camera: {
        position: this.camera?.position
      },
      gameObjects: flatObjects,
      components: components
    };
  }
}
