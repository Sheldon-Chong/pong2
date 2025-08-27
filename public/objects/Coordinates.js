export class Point2D {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(other) { return new Point2D(this.x + other.x, this.y + other.y); }
    subtract(other) { return new Point2D(this.x - other.x, this.y - other.y); }
    divide(other) { return new Point2D(this.x / other.x, this.y / other.y); }
    multiply(other) { return new Point2D(this.x * other.x, this.y * other.y); }
    getCenter(other) { return this.add(other.toVector2D()).divide(new Vector2D(2, 2)); }
    toVector2D() { return new Vector2D(this.x, this.y); }
    clone() { return new Point2D(this.x, this.y); }
    /**
     * Moves the point in a given direction (in radians) by a given distance.
     * @param direction Angle in radians.
     * @param distance Distance to move.
     * @returns New Point2D after moving.
     */
    move(direction, distance) {
        // Ensure direction is between 0 and 360 degrees, then convert to radians
        const normalizedDirection = ((direction % 360) + 360) % 360;
        const radians = normalizedDirection * (Math.PI / 180);
        const dx = Math.cos(radians) * distance;
        const dy = Math.sin(radians) * distance;
        return new Point2D(this.x + dx, this.y + dy);
    }
}
export class Vector2D {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(other) { return new Vector2D(this.x + other.x, this.y + other.y); }
    subtract(other) { return new Vector2D(this.x - other.x, this.y - other.y); }
    divide(other) { return new Vector2D(this.x / other.x, this.y / other.y); }
    multiply(other) {
        if (typeof other === "number")
            return new Vector2D(this.x * other, this.y * other);
        return new Vector2D(this.x * other.x, this.y * other.y);
    }
    toPoint() { return new Point2D(this.x, this.y); }
}
export function interpolate(pos, pos2, slowness) {
    return new Point2D(pos.x + (pos2.x - pos.x) / slowness, pos.y + (pos2.y - pos.y) / slowness);
}
export function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}
