export declare class Point2D {
    x: number;
    y: number;
    className: string;
    constructor(x: number, y: number);
    add(other: Vector2D): Point2D;
    subtract(other: Vector2D): Point2D;
    divide(other: Vector2D): Point2D;
    multiply(other: Vector2D): Point2D;
    getCenter(other: Point2D): Point2D;
    toVector2D(): Vector2D;
    clone(): Point2D;
    /**
     * Moves the point in a given direction (in radians) by a given distance.
     * @param direction Angle in radians.
     * @param distance Distance to move.
     * @returns New Point2D after moving.
     */
    move(direction: number, distance: number): Point2D;
}
export declare class Vector2D {
    x: number;
    y: number;
    constructor(x: number, y: number);
    add(other: Vector2D): Vector2D;
    subtract(other: Vector2D): Vector2D;
    divide(other: Vector2D): Vector2D;
    multiply(other: Vector2D | number): Vector2D;
    toPoint(): Point2D;
}
export declare function interpolate(pos: Point2D, pos2: Point2D, slowness: number): Point2D;
export declare function randomBetween(min: number, max: number): number;
//# sourceMappingURL=Coordinates.d.ts.map