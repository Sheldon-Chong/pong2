export var BlendMode;
(function (BlendMode) {
    BlendMode["SourceOver"] = "source-over";
    BlendMode["SourceIn"] = "source-in";
    BlendMode["SourceOut"] = "source-out";
    BlendMode["SourceAtop"] = "source-atop";
    BlendMode["DestinationOver"] = "destination-over";
    BlendMode["DestinationIn"] = "destination-in";
    BlendMode["DestinationOut"] = "destination-out";
    BlendMode["DestinationAtop"] = "destination-atop";
    BlendMode["Lighter"] = "lighter";
    BlendMode["Copy"] = "copy";
    BlendMode["Xor"] = "xor";
    BlendMode["Multiply"] = "multiply";
    BlendMode["Screen"] = "screen";
    BlendMode["Overlay"] = "overlay";
    BlendMode["Darken"] = "darken";
    BlendMode["Lighten"] = "lighten";
    BlendMode["ColorDodge"] = "color-dodge";
    BlendMode["ColorBurn"] = "color-burn";
    BlendMode["HardLight"] = "hard-light";
    BlendMode["SoftLight"] = "soft-light";
    BlendMode["Difference"] = "difference";
    BlendMode["Exclusion"] = "exclusion";
    BlendMode["Hue"] = "hue";
    BlendMode["Saturation"] = "saturation";
    BlendMode["Color"] = "color";
    BlendMode["Luminosity"] = "luminosity";
})(BlendMode || (BlendMode = {}));
// Shift the hue of an image by a specified value (in degrees)
export function shiftImageHue(img, hueShift) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    if (!ctx)
        return img;
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        // Convert RGB to HSL
        let r = data[i] / 255;
        let g = data[i + 1] / 255;
        let b = data[i + 2] / 255;
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        if (max === min) {
            h = s = 0;
        }
        else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        // Shift hue
        h = (h + hueShift / 360) % 1;
        // Convert HSL back to RGB
        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        function hue2rgb(p, q, t) {
            if (t < 0)
                t += 1;
            if (t > 1)
                t -= 1;
            if (t < 1 / 6)
                return p + (q - p) * 6 * t;
            if (t < 1 / 2)
                return q;
            if (t < 2 / 3)
                return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }
        data[i] = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
        data[i + 1] = Math.round(hue2rgb(p, q, h) * 255);
        data[i + 2] = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);
        // Alpha remains unchanged
    }
    ctx.putImageData(imageData, 0, 0);
    const newImg = new Image();
    newImg.src = canvas.toDataURL();
    return newImg;
}
import { Point2D, Vector2D } from './Coordinates.js';
export function createColoredImage(color, size) {
    const canvas = document.createElement('canvas');
    canvas.width = size.x;
    canvas.height = size.y;
    const ctx = canvas.getContext('2d');
    if (ctx) {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, size.x, size.y);
    }
    const img = new Image();
    img.src = canvas.toDataURL();
    return img;
}
//# sourceMappingURL=GameUtils.js.map