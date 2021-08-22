import { ICubeOptions } from './cube/options';
export { Masking, Face } from './cube/constants';
export { Axis } from './math';
export { StickerDefinition } from './cube/models/sticker';
export { Arrow } from './cube/models/arrow';
export { ICubeOptions } from './cube/options';
export declare function cubeSVG(container: HTMLElement | string, extraOptions?: ICubeOptions): void;
export declare function cubePNG(container: HTMLElement, extraOptions?: ICubeOptions): void;
