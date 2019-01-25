import { StickerDefinition } from './sticker'

export class Arrow {
  s1: StickerDefinition
  s2: StickerDefinition
  s3?: StickerDefinition // optional third sticker if drawing curved arrow
  scale: number = 10 // Var range = 0 to 20, default 10
  influence: number = 10 // Var range = 0 to 50, default 10
  color: string

  constructor(
    s1: StickerDefinition,
    s2: StickerDefinition,
    color: string,
    s3?: StickerDefinition,
    scale?: number,
    influence?: number
  ) {
    this.s1 = s1
    this.s2 = s2
    this.color = color
    if (scale) {
      this.scale = scale
    }
    if (influence) {
      this.influence = influence
    }
    if (s3) {
      this.s3 = s3
    }
  }
}
