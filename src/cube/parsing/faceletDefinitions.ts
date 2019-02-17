import { FaceletDefinition, FaceletAbbreviateToDefinition } from '../../constants'

export function parseFaceletDefinitions(rawValue: string): FaceletDefinition[] {
  let colors = []
  for (let i = 0; i < rawValue.length; i++) {
    colors.push(FaceletAbbreviateToDefinition[rawValue.charAt(i)])
  }
  return colors
}
