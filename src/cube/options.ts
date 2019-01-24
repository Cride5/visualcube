import { Axis } from './../math';
import { Vec3 } from "../math";
import { Arrow } from './models/arrow';
import { Masking } from './constants';

export interface ICubeOptions {
  dist: number;
  algorithm?: string;
  backgroundColor?: string;
  cubeColor: string;
  outlineWidth: number;
  strokeWidth: number;
  cubeSize: number;
  cubeOpacity: number;
  stickerOpacity: number;
  colorScheme: { [face: number]: string };
  stickerColors?: string[];
  viewportRotations: [Axis, number][];
  view?: string;
  width: number;
  height: number;
  mask?: Masking;
  maskAlg?: string;
  arrows?: Arrow[] | string;
  viewbox: { // SVG viewbox settings
    x: number;
    y: number;
    width: number;
    height: number;
  }
}