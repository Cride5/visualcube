import * as SVG from 'svg.js';
import { CubeGeometry, FaceStickers, FaceRotations } from './geometry';
import { Face } from './constants';
import { ICubeOptions } from './options';
import { Arrow } from './models/arrow';
export declare function renderCube(container: HTMLElement | string, geometry: CubeGeometry, options: ICubeOptions): void;
export declare function renderOLLStickers(group: SVG.G, face: Face, stickers: FaceStickers, rotations: FaceRotations, options: ICubeOptions): void;
/**
 * Generates svg for an arrow pointing from sticker s1 to s2
 */
export declare function renderArrow(group: SVG.G, geometry: CubeGeometry, arrow: Arrow): void;
