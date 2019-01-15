import { Axis } from './../math';
import { Vec3 } from "../math";

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
  viewbox: { // SVG viewbox settings
    x: number;
    y: number;
    width: number;
    height: number;
  }
}