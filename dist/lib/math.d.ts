/**
 * Methods for manipulating points in 3d space (Vec3)
 */
export declare type Vec3 = [number, number, number];
export declare enum Axis {
    X = 0,
    Y = 1,
    Z = 2,
}
export declare function makeMatrix<T>(rows: number, cols: number): T[][];
export declare function translate(pos: Vec3, v: Vec3): Vec3;
export declare function scale(pos: Vec3, scalar: number): Vec3;
export declare function transScale(pos: Vec3, v: Vec3, scalar: number): Vec3;
export declare function rotate(pos: Vec3, axis: Axis, radians: number): Vec3;
export declare function project(pos: Vec3, d: number): Vec3;
export declare function radians2Degrees(radians: number): number;
