import * as SVG from 'svg.js'
import { makeCubeGeometry } from './cube/geometry';
import { Vec3, Axis } from './math';
import { renderCube } from './cube/drawing';
import { ICubeOptions } from './cube/options';
import { DefaultColorScheme, Masking } from './cube/constants';
import { makeStickerColors } from './cube/stickers';
import { ColorName } from './constants';

const defaultOptions: ICubeOptions = {
  cubeSize: 3,
  width: 128,
  height: 128,
  viewportRotations: [
    [Axis.Y, 45],
    [Axis.X, -34],
  ],
  colorScheme: DefaultColorScheme,
  backgroundColor: ColorName.White,
  cubeColor: ColorName.Black,
  cubeOpacity: 100,
  stickerOpacity: 100,
  dist: 5,
  outlineWidth: .94,
  strokeWidth: 0,
  viewbox: {
    x: -0.9,
    y: -0.9,
    width: 1.8,
    height: 1.8,
  }
};

export function cube(container: HTMLElement | string, extraOptions: ICubeOptions) {
  let options = {...defaultOptions, ...extraOptions};
  let geomety = makeCubeGeometry(options);
  options.stickerColors = makeStickerColors(options);

  renderCube(container, geomety, options);
}

// (SVG as any).on(document, 'DOMContentLoaded', function() {

//   let options = {
//     algorithm: 'M2',
//     mask: Masking.LL,
//     width: 512,
//     height: 512,
//   }

//   let allOptions = {...defaultOptions, ...options};

//   let geometry = makeCubeGeometry(allOptions);
//   allOptions.stickerColors = makeStickerColors(allOptions); // Colors of stickers after algorithms / masking applies

//   renderCube('drawing', geometry, allOptions);
// })