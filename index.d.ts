declare namespace SRVisualizer {
  export type Vec3 = [number, number, number];

  export const enum Axis {
    X = 0,
    Y = 1,
    Z = 2
  }

  export const enum Masking {
    FL = 'fl',
    F2L = 'f2l',
    LL = 'll',
    CLL = 'cll',
    ELL = 'ell',
    OLL = 'oll',
    OCLL = 'ocll',
    OELL = 'oell',
    COLL = 'coll',
    OCELL = 'ocell',
    WV = 'wv',
    VH = 'vh',
    ELS = 'els',
    CLS = 'cls',
    CMLL = 'cmll',
    CROSS = 'cross',
    F2L3 = 'f2l_3',
    F2L2 = 'f2l_2',
    F2LSM = 'f2l_sm',
    F2L1 = 'f2l_1',
    F2B = 'f2b',
    LINE = 'line'
  }

  export const enum Face {
    U = 0,
    R = 1,
    F = 2,
    D = 3,
    L = 4,
    B = 5,
  }

  export interface StickerDefinition {
    face: Face;
    n: number;
  }

  export interface Arrow {
    s1: StickerDefinition;
    s2: StickerDefinition;
    s3?: StickerDefinition;
    scale: number;
    influence: number;
    color: string;
  }

  export class CubeOptions {
    dist?: number;
    algorithm?: string;
    backgroundColor?: string;
    cubeColor?: string;
    outlineWidth?: number;
    strokeWidth?: number;
    cubeSize?: number;
    cubeOpacity?: number;
    stickerOpacity?: number;
    colorScheme?: { [face: number]: string };
    stickerColors?: string[];
    facelets?: string[];
    zPosition?: Vec3;
    viewportRotations?: [Axis, number][];
    view?: string;
    width?: number;
    height?: number;
    mask?: Masking;
    maskAlg?: string;
    arrows?: Arrow[] | string;
    viewbox?: {
      x: number;
      y: number;
      width: number;
      height: number;
    }
  }

  export function cubeSVG(container: HTMLElement | string, options: CubeOptions): void
  export function cubePNG(container: HTMLElement, options: CubeOptions): void
}

export = SRVisualizer