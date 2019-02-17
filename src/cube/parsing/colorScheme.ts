import { ICubeColorScheme } from '../models/color-scheme'
import { parseColor } from './color'
import { ColorCode, ColorNameToCode, ColorAbbreviationToCode } from '../../constants'
import { AllFaces, DefaultColorScheme } from '../constants'

export function parseColorScheme(rawValue: string): ICubeColorScheme {
  if (rawValue.indexOf(',') > -1) {
    return parseCommaSeparatedValues(rawValue)
  } else {
    return parseAbbreviations(rawValue)
  }
}

function parseAbbreviations(rawValue) {
  let scheme: ICubeColorScheme = {}
  if (rawValue.length < AllFaces.length) {
    return DefaultColorScheme
  }

  AllFaces.forEach((face, index) => {
    if (rawValue.length > index) {
      scheme[face] = ColorAbbreviationToCode[rawValue.charAt(index)]
    }
  })

  return scheme
}

function parseCommaSeparatedValues(rawValue) {
  let scheme: ICubeColorScheme = {}

  // Parse as comma separated list of colors
  let rawColors = rawValue.split(',')
  if (rawColors.length < AllFaces.length) {
    return DefaultColorScheme
  }
  AllFaces.forEach((face, index) => {
    if (rawColors.length > index) {
      let parsedColor = parseColor(rawColors[index])
      let colorCode: ColorCode = ColorNameToCode[parsedColor] || (parsedColor as ColorCode)
      if (parsedColor) {
        scheme[face] = colorCode
      }
    }
  })

  return scheme
}
