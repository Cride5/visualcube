import { FaceRotations } from './models/face-rotations';
import * as SVG from 'svg.js'
import { Face } from './constants';
import { outlineSvg, faceStickersSvg } from './utils';
import { makeFaceStickers, IGeneratorOptions, CubeGeometry } from './geometry/generator';
import { Vec3, rotate, Axis } from './geometry/math';

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
let cubeColor = 'black';

// Default rotation sequence
let viewportRotation: [Axis, number][] = [
  [Axis.Y, 45],
  [Axis.X, -34]
];

let cubeSize = 3;
let centerTranslation: Vec3 = [-cubeSize/2, -cubeSize/2, -cubeSize/2];
let zPosition: Vec3 = [0, 0, dist];

// Rotation vectors to track visibility of each face
let faceRotations: FaceRotations = {
  [Face.U]: [0, -1, 0],
  [Face.R]: [1, 0, 0],
  [Face.F]: [0, 0,-1],
  [Face.D]: [0, 1, 1],
  [Face.L]: [-1, 0, 0],
  [Face.B]: [0, 0, 1]
};

(SVG as any).on(document, 'DOMContentLoaded', function() {
  
  let geometry: CubeGeometry = {};
  let options: IGeneratorOptions = {
    cubeSize: cubeSize,
    centerTranslation: centerTranslation,
    zPosition: zPosition,
    viewportRotations: viewportRotation
  };

  [Face.U, Face.R, Face.L, Face.F, Face.D, Face.B].forEach(face => {
    geometry[face] = makeFaceStickers(face, options);
    // Rotate rotation vectors
    viewportRotation.forEach(rotation => {
      faceRotations[face] = rotate(faceRotations[face], rotation[0], Math.PI * rotation[1]/180);
    });
  });

  let draw = SVG('drawing').size(512, 512);
  draw.viewbox(ox, oy, vw, vh);

  // Draw background
  let backgroundSvg = draw.rect(vw, vh)
  backgroundSvg.x(ox);
  backgroundSvg.y(oy);
  backgroundSvg.fill({
    color: 'white'
  });

  // Create outline for each visible face
  let u = outlineSvg(draw, 'black', 100, outlineWidth, geometry[Face.U])
  let f = outlineSvg(draw, 'black', 100, outlineWidth, geometry[Face.F])
  let r = outlineSvg(draw, 'black', 100, outlineWidth, geometry[Face.R])

  // Create polygon for each visible facelet
  let fStickers = faceStickersSvg(draw, geometry[Face.F], 100, strokeWidth, 'blue', 'black')
  let uStickers = faceStickersSvg(draw, geometry[Face.U], 100, strokeWidth, 'yellow', 'black')
  let rStickers = faceStickersSvg(draw, geometry[Face.R], 100, strokeWidth, 'red', 'black')
  // let bStickers = faceStickersSvg(draw, geometry[Face.B], 100, strokeWidth, 'green', 'black')
  // let lStickers = faceStickersSvg(draw, geometry[Face.L], 100, strokeWidth, 'orange', 'black')
  // let dStickers = faceStickersSvg(draw, geometry[Face.D], 100, strokeWidth, 'yellow', 'black')

  // Create polygon for each visible facelet
  // $cube .= "\t<g style='opacity:".($fo/100).";stroke-opacity:0.5;stroke-width:$sw;stroke-linejoin:round'>\n";
  // for($ri = 3; $ri < 6; $ri++){
  //   if(face_visible($ro[$ri], $rv) || $co < 100)
  //     $cube .= facelet_svg($ro[$ri]);
  // }
  // $cube .= "\t</g>\n";

  // var draw = SVG('drawing').size(300, 300)
  // draw.rotate(45, 50, 50)
  // var rect = draw.rect(100, 100).attr({ fill: '#f06' })
})