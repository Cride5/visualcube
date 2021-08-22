import { StickerDefinition } from './sticker';
export declare class Arrow {
    s1: StickerDefinition;
    s2: StickerDefinition;
    s3?: StickerDefinition;
    scale: number;
    influence: number;
    color: string;
    constructor(s1: StickerDefinition, s2: StickerDefinition, color: string, s3?: StickerDefinition, scale?: number, influence?: number);
}
