import { Face } from './../constants';
import { StickerPosition } from '../models/sticker-position';
import { Vec3, makeMatrix, translate, scale, rotate, project, Axis } from './math';

export type FaceStickers = StickerPosition[][];
export type CubeGeometry = { [face: string]: StickerPosition[][] };

export interface IGeneratorOptions {
  cubeSize: number;
  centerTranslation: Vec3;
  zPosition: Vec3;
  viewportRotations: [Axis, number][]
}

export function makeStickerPosition(face: Face, cubeSize: number, x: number, y: number): StickerPosition {
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

export function makeFaceStickers(face: Face, options: IGeneratorOptions): FaceStickers {
  let stickers: StickerPosition[][] = makeMatrix<StickerPosition>(options.cubeSize+1, options.cubeSize+1);

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