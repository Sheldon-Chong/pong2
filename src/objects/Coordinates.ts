export class Point2D {
    constructor(
        public x: number,
        public y: number,
    ) {}

    add(other: Vector2D)      { return new Point2D(this.x + other.x, this.y+ other.y); }
    subtract(other: Vector2D) { return new Point2D(this.x - other.x, this.y - other.y); }
    divide(other: Vector2D)   { return new Point2D(this.x / other.x, this.y / other.y); }
    multiply(other: Vector2D)   { return new Point2D(this.x * other.x, this.y * other.y); }

    getCenter(other: Point2D): Point2D { return this.add(other.toVector2D()).divide(new Vector2D(2,2)); }

    toVector2D() { return new Vector2D(this.x, this.y); }
    clone(): Point2D { return new Point2D(this.x, this.y); }

    /**
     * Moves the point in a given direction (in radians) by a given distance.
     * @param direction Angle in radians.
     * @param distance Distance to move.
     * @returns New Point2D after moving.
     */
    move(direction: number, distance: number): Point2D {
        // Ensure direction is between 0 and 360 degrees, then convert to radians
        const normalizedDirection = ((direction % 360) + 360) % 360;
        const radians = normalizedDirection * (Math.PI / 180);
        const dx = Math.cos(radians) * distance;
        const dy = Math.sin(radians) * distance;
        return new Point2D(this.x + dx, this.y + dy);
    }
}

export class Vector2D {
    constructor(
        public x: number,
        public y: number,
    ) {}

    add(other: Vector2D)      { return new Vector2D(this.x + other.x, this.y + other.y); }
    subtract(other: Vector2D) { return new Vector2D(this.x - other.x, this.y - other.y); }
    divide(other: Vector2D)   { return new Vector2D(this.x / other.x, this.y / other.y); }
    multiply(other: Vector2D | number) {
        if (typeof other === "number") 
            return new Vector2D(this.x * other, this.y * other);
        return new Vector2D(this.x * other.x, this.y * other.y);
    }

    toPoint(): Point2D { return new Point2D(this.x, this.y) }

}

export function interpolate(pos: Point2D, pos2: Point2D, slowness: number):Point2D {
    return new Point2D(pos.x + (pos2.x - pos.x) / slowness, pos.y + (pos2.y - pos.y) / slowness);
}


export function randomBetween(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

