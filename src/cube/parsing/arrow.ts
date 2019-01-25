import { StickerDefinition } from '../models/sticker'
import { Arrow } from '../models/arrow'
import { Face } from '../constants'
import { ColorCode, ColorName } from '../../constants'
import { parseColor } from './color'

const stickerPattern = '([URFDLB])([0-9]+)'
const colorPattern =
  '(black|dgrey|grey|silver|white|yellow|red|orange|blue|green|purple|pink|[0-9a-fA-F]{6}|[0-9a-fA-F]{3})'
const arrowPattern = `^(${stickerPattern})(${stickerPattern})(${stickerPattern})?(-s([0-9+]))?(-i([0-9+]))?(-${colorPattern})?`

export function parseArrows(raw: string): Arrow[] {
  if (typeof raw !== 'string') {
    return []
  }

  return raw
    .split(',')
    .map(part => parseArrow(part))
    .filter(arrow => !!arrow)
}

export function parseArrow(raw: string): Arrow {
  if (typeof raw !== 'string') {
    return null
  }

  let arrowRegex = new RegExp(arrowPattern)
  let match = arrowRegex.exec(raw)

  if (!match) {
    return null
  }

  return <Arrow>{
    s1: {
      face: Face[match[2]],
      n: parseInt(match[3]),
    },
    s2: {
      face: Face[match[5]],
      n: parseInt(match[6]),
    },
    s3: !match[7]
      ? undefined
      : {
          face: Face[match[8]],
          n: parseInt(match[9]),
        },
    color: match[15] ? parseColor(match[15]) : ColorCode.Gray,
    scale: match[11] ? parseInt(match[11]) : 10,
    influence: match[13] ? parseInt(match[13]) : 10,
  }
}
