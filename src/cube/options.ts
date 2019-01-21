import { Axis } from './../math';
import { Vec3 } from "../math";
import { Arrow } from './arrow';

export interface ICubeOptions {
  algorithm?: string;
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
  view?: string;
  width: number;
  height: number;
  arrows?: Arrow[],
  viewbox: { // SVG viewbox settings
    x: number;
    y: number;
    width: number;
    height: number;
  }
}