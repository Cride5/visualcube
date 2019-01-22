import { CubeData } from './cube/simulation';
import * as SVG from 'svg.js'
import { makeCubeGeometry } from './cube/geometry';
import { Vec3, Axis } from './math';
import { renderCube } from './cube/drawing';
import { ICubeOptions } from './cube/options';
import { DefaultColorScheme, AllFaces, Masking } from './cube/constants';
import { ColorName, ColorCode } from './constants';
import { parseAlgorithm } from './cube/parsing/algorithm';
import { makeMasking } from './cube/masking';

// $DEFAULTS = Array(
//   'fmt'   => 'svg',
//   'pzl'   => '3',
//   'size'  => '128',
//   'view'  => '',
//   'stage' => '',
//   'r'     => 'y45x-34',
//   'alg'   => '',
//   'case'  => '',
//   'fd'    => '',
//   'fc'    => '',
//   'sch'   => 'yrbwog',
//   'bg'    => 'white',
//   'cc'    => 'black',
//   'co'    => '100',
//   'fo'    => '100',
//   'dist'  => '5',
// );

// Outline width
let outlineWidth = 0.94;

// Stroke width
let strokeWidth = 0;

// Viewport
let ox = -0.9;
let oy = -0.9;
let vw = 1.8;
let vh = 1.8;
let dist = 5;

let cubeOpacity = 100;

// Default rotation sequence
let viewportRotation: [Axis, number][] = [
  [Axis.Y, 45],
  [Axis.X, -34],
];

let cubeSize = 3;
let centerTranslation: Vec3 = [-cubeSize/2, -cubeSize/2, -cubeSize/2];
let zPosition: Vec3 = [0, 0, dist];

function makeStickerColors(options: ICubeOptions): string[] {
  let stickerColors = options.stickerColors;
  let mask = options.mask ? makeMasking(options.mask, options.cubeSize) : null;

  if (mask && options.maskAlg) {
    let maskCubeData = new CubeData(options.cubeSize, mask);
    let alg = parseAlgorithm(options.maskAlg);
    alg.forEach(turn => {
      maskCubeData.turn(turn);
    })
    mask = maskCubeData.faces;
  }
  
  // Fill with color scheme if sticker colors not predefined.
  if (!stickerColors) {
    stickerColors = [].concat.apply([], AllFaces.map(face => {
      return Array.apply(null, Array(options.cubeSize * options.cubeSize)).map(() => options.colorScheme[face])
    }));
  }

  let faceMappedStickers = AllFaces.reduce((acc, face) => {
    if (!acc[face]) acc[face] = [];

    for (let i = 0; i < options.cubeSize; i++) {
      for (let j = 0; j < options.cubeSize; j++) {
        const faceIndex = AllFaces.indexOf(face);
        const stickerNumber = (i * options.cubeSize) + j;
        const colorIndex = faceIndex * (options.cubeSize * options.cubeSize) + stickerNumber;

        if (stickerColors.length <= colorIndex) {
          acc[face][(options.cubeSize * i) + j] = ColorName.Black;
        } else {
          acc[face][(options.cubeSize * i) + j] = stickerColors[colorIndex];
        }

        if (mask && !mask[face][(options.cubeSize * i) + j]) {
          acc[face][(options.cubeSize * i) + j] = ColorCode.DarkGray;
        }
      }
    }

    return acc;
  }, {});

  // Apply Algorithm
  let cubeData = new CubeData(options.cubeSize, faceMappedStickers);
  let alg = parseAlgorithm(options.algorithm);

  alg.forEach(move => {
    cubeData.turn(move);
  });

  return [].concat.apply([], AllFaces.map(face => cubeData.faces[face].slice()));
}

(SVG as any).on(document, 'DOMContentLoaded', function() {

  let options: ICubeOptions = {
    algorithm: '',
    cubeColor: 'black',
    cubeSize: cubeSize,
    cubeOpacity: cubeOpacity,
    strokeWidth: strokeWidth,
    outlineWidth: outlineWidth,
    colorScheme: DefaultColorScheme,
    stickerOpacity: 100,
    centerTranslation: centerTranslation,
    zPosition: zPosition,
    viewportRotations: viewportRotation,
    backgroundColor: 'white',
    width: 512,
    height: 512,
    viewbox: {
      x: ox,
      y: oy,
      width: vw,
      height: vh
    },
    mask: Masking.LL,
    // arrows: 'U0U2,U2U8,U8U0,R6R2R0-s8-i5-yellow'
  };

  let geometry = makeCubeGeometry(options);
  options.stickerColors = makeStickerColors(options); // Colors of stickers after algorithms / masking applies

  renderCube('drawing', geometry, options);
})