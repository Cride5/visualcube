import { ICubeOptions } from './options';
/**
 * Utlity Methods for creating 2D coodinates for svg polygons
 */
import { Face } from './constants';
import { Vec3, Axis } from '../math';
export declare type FaceStickers = Vec3[][];
export declare type CubeGeometry = {
    [face: number]: Vec3[][];
};
/**
 * Rotation vectors by face
 */
export declare type FaceRotations = {
    [face: number]: Vec3;
};
/**
 * Applies set of rotations to all face rotation vectors.
 */
export declare function rotateFaces(faceRotations: FaceRotations, rotations: [Axis, number][]): FaceRotations;
export declare function makeStickerPosition(face: Face, cubeSize: number, x: number, y: number): Vec3;
/**
 * Creates 2D coordinates for stickers of a given face of the cube.
 */
export declare function makeFaceStickers(face: Face, options: ICubeOptions): FaceStickers;
/**
 * Creates geometry for rubiks cube stickers. Contains 2D coordinates
 * for drawing svg polygons
 */
export declare function makeCubeGeometry(options: ICubeOptions): CubeGeometry;
