import { BlendMode } from './objects/Blendmodes';
import { Vector2D, Point2D } from './objects/Coordinates';
import { GameObject, exportCleanup } from './objects/GameObject';
import { Glow } from './objects/Glow';
import { HitBox } from './objects/Hitbox';
import { Sprite } from './objects/Sprite';
import { Team, SKINS } from './pong3';
import { PadelLabel } from './PadelLabel';
export class Padel extends GameObject {
    team;
    player;
    moveDownKey = "ArrowDown";
    moveUpKey = "ArrowUp";
    isMoving = false;
    sprite;
    teamWins(team) {
    }
    export(exportStatic = false) {
        const json = {
            STATIC_name: this.name,
            id: this.id,
            position: this.position.export(),
            STATIC_scale: this.scale,
            STATIC_rotation: this.rotation,
            STATIC_zIndex: this.zIndex,
            STATIC_children: this.children.map(child => child.id),
            STATIC_components: this.componentToJSON(),
        };
        return exportCleanup(json, exportStatic);
    }
    constructor(params) {
        super({
            position: params.position,
            game: params.game,
            name: "padel",
            scale: new Vector2D(60, 60),
            components: [
                new HitBox({})
            ]
        });
        Object.assign(this, params);
        const skinPath = SKINS[params.player?.skin || "ghost_dark"];
        this.sprite = this.addComponent(new Sprite({
            imagePath: skinPath,
            host: this
        }));
        this.addChild(new PadelLabel({
            text: this.player.name,
            position: new Point2D(0, -40),
            font: "15px Century Gothic",
            color: "#ffffff",
        }));
        this.maximumVelocity = new Vector2D(this.game.gameSettings.playerAcceleration, this.game.gameSettings.playerAcceleration).multiply(10);
        // add shadow
        this.sprite.glow = new Glow({
            Color: "#3731FE",
            Blur: 10,
            OffsetX: 0,
            OffsetY: 5,
            blendMode: BlendMode.Multiply
        });
        // this.hitbox = new HitBox(this);
        if (this.team === Team.TEAM1)
            this.sprite.flippedHorizontal = true;
        this.maximumVelocity = new Vector2D(this.game.gameSettings.playerAcceleration * 10, this.game.gameSettings.playerAcceleration * 10);
        this.onUpdate = () => {
            this.velocity.y *= 0.9;
            if (Math.abs(this.velocity.y) < 0.1)
                this.velocity.y = 0;
            try {
                for (const client of this.game.clientData) {
                    if (client.keysPressed.has("ArrowUp"))
                        this.acceleration.y = -this.game.gameSettings.playerAcceleration;
                    else if (client.keysPressed.has("ArrowDown"))
                        this.acceleration.y = this.game.gameSettings.playerAcceleration;
                    else
                        this.acceleration.y = 0;
                }
            }
            catch {
            }
            // let copied = this.sprite.clone();
            // copied.opacity = 0.1;
            // copied.blendMode = BlendMode.ColorDodge;
            // copied.gselow = null;
            // this.game.particles.particles.push(new Particle(this.game, 120, copied, this.position.clone(), (instance) => {
            //     instance.sprite.opacity *= 0.96;
            // }));
            // return true;
        };
        // this.addChild(new Arrow(this.game));
        // const eyeOffset = this.team === Team.TEAM1 ? 3 : -3;
        // const irisOffset = this.team === Team.TEAM1 ? 8 : -8;
        // this.addChild(new TrailSprite(this.game, this, new Sprite({
        //     imagePath: "./assets/skins/components/eyes.png",
        //     size: new Vector2D(38, 24),
        //     pos: new Point2D(eyeOffset, -3)
        // }), 160));
        // this.addChild(new TrailSprite(this.game, this, new Sprite({
        //     imagePath: "./assets/skins/components/iris.png",
        //     size: new Vector2D(30, 12),
        //     pos: new Point2D(irisOffset, -3)
        // }), 250));
    }
}
//# sourceMappingURL=Padel.js.map