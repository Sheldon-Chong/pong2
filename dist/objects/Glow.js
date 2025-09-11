export class Glow {
    className = "glow";
    Color = "red";
    Blur = 20;
    OffsetX = 0;
    OffsetY = 0;
    blendMode = "source-over";
    constructor(params) {
        console.log("glow created");
        Object.assign(this, params);
    }
}
//# sourceMappingURL=Glow.js.map