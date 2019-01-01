import * as SVG from 'svg.js'
import { makeCubeGeometry } from './cube/geometry';
import { Vec3, Axis } from './math';
import { renderCube } from './cube/drawing';
import { ICubeOptions } from './cube/options';
import { DefaultColorScheme } from './cube/constants';

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

(SVG as any).on(document, 'DOMContentLoaded', function() {
  
  let options: ICubeOptions = {
    cubeColor: 'black',
    cubeSize: cubeSize,
    cubeOpacity: cubeOpacity,
    strokeWidth: strokeWidth,
    outlineWidth: outlineWidth,
    colorScheme: DefaultColorScheme,
    // stickerColors: [
    //   '#FF0000',
    //   '#00FF00',
    //   '#0000FF',
    //   '#00FFFF',
    //   '#FF00FF',
    //   '#FFFF00',
    // ],
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
    }
  };

  let geometry = makeCubeGeometry(options);

  renderCube('drawing', geometry, options);
})