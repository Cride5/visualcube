import { ColorCode } from './../../colors';
import { ColorAbbreviationToCode, ColorNameToCode } from '../../constants'

export function parseColor(raw: string): string | ColorCode {
  let colorcodeRegex = /^[0-9a-fA-F]{6}|[0-9a-fA-F]{3}/

  // Append # for color codes
  if (colorcodeRegex.exec(raw)) {
    return `#${raw}`
  }

  if (ColorAbbreviationToCode[raw]) {
    return ColorAbbreviationToCode[raw]
  }

  if (ColorNameToCode[raw]) {
    return ColorNameToCode[raw]
  }

  // Default color
  return ColorCode.Gray
}
