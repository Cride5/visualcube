/**
 * Utlity Methods for creating 2D coodinates for svg polygons
 */

import { Face, AllFaces } from '../constants';
import { Vec3, makeMatrix, translate, scale, rotate, project, Axis } from './math';

export type FaceStickers = Vec3[][];
export type CubeGeometry = { [face: number]: Vec3[][] };

export interface ICubeOptions {
  backgroundColor: string;
  cubeColor: string;
  outlineWidth: number;
  strokeWidth: number;
  cubeSize: number;
  cubeOpacity: number;
  stickerOpacity: number;
  colorScheme: { [face: number]: string };
  stickerColors?: string[];
  centerTranslation: Vec3;
  zPosition: Vec3;
  viewportRotations: [Axis, number][];
  width: number;
  height: number;
  viewbox: { // SVG viewbox settings
    x: number;
    y: number;
    width: number;
    height: number;
  }
}

export function makeStickerPosition(face: Face, cubeSize: number, x: number, y: number): Vec3 {
  switch (face) {
    case Face.U: return [x, 0, cubeSize - y];
    case Face.R: return [cubeSize, y, x];
    case Face.F: return [x, y, 0];
    case Face.D: return [x, cubeSize, y];
    case Face.L: return [0, y, cubeSize - x];
    case Face.B: return [cubeSize - x, y, cubeSize];
    default: throw new Error(`Unknown cube face: '${face}'`);
  }
}

/**
 * Creates 2D coordinates for stickers of a given face of the cube.
 */
export function makeFaceStickers(face: Face, options: ICubeOptions): FaceStickers {
  let stickers: Vec3[][] = makeMatrix<Vec3>(options.cubeSize+1, options.cubeSize+1);

  for(let row = 0; row <= options.cubeSize; row++) {
    for (let col = 0; col <= options.cubeSize; col++) {
      let sticker = makeStickerPosition(face, options.cubeSize, row, col);

      // Now scale and tranform point to ensure size/pos independent of dim
      sticker = translate(sticker, options.centerTranslation);
      sticker = scale(sticker, 1/options.cubeSize);

      // Rotate cube as per perameter settings
      options.viewportRotations.forEach(rotation => {
        sticker = rotate(sticker, rotation[0], Math.PI * rotation[1]/180);
      });

      // Move cube away from viewer
      sticker = translate(sticker, options.zPosition);
      // Finally project the 3D points onto 2D
      sticker = project(sticker, options.zPosition[2]);

      stickers[row][col] = sticker;
    }
  }

  return stickers;
}

/**
 * Creates geometry for rubiks cube stickers. Contains 2D coordinates
 * for drawing svg polygons
 */
export function makeCubeGeometry(options: ICubeOptions): CubeGeometry {
  return AllFaces.reduce((acc, face) => {
    acc[face] = makeFaceStickers(face, options);
    return acc;
  }, {} as CubeGeometry)
}