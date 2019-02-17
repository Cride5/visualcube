import { Axis } from '../../math'
import { AxisSymbolToAxis } from '../constants'

export function parseRotationSequence(rawSequence: string): [Axis, number][] {
  const rotationRegex = /([xyz]-?[0-9][0-9]?[0-9]?)/g
  let match
  let rotations: [Axis, number][] = []

  do {
    match = rotationRegex.exec(rawSequence)
    if (match) {
      let matchText: string = match[0]
      let axisSymbol = matchText.charAt(0)
      let value = matchText.substr(1)
      let axis = AxisSymbolToAxis[axisSymbol]
      rotations.push([axis, parseInt(value)])
    }
  } while (match)

  return rotations
}
