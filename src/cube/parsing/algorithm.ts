import { TurnType } from '../simulation'
import { TurnAbbreviation, AlgorithmUnit, possibleMoves } from '../constants'

export interface Turn {
  move: AlgorithmUnit;
  turnType: TurnType;
  slices: number;
}

const turnRegex = /([2-9]+)?([UFRDLBMESxyz])(w)?([2\'])?/

/**
 * Takes in an algorithm string and parses the turns from it
 * algorithm string format should be moves separated by a single space
 * (ex. "U R2 L' x")
 * 
 * https://www.worldcubeassociation.org/regulations/#article-12-notation
 */
export function parseAlgorithm(algorithm: string): Turn[] {
  if (!algorithm) {
    return []
  }
  return algorithm.split(' ').filter(move => move).map(move => {
    let match = turnRegex.exec(move);
    if (!match) {
      throw new Error(`Invalid move (${move}) in algorithm '${algorithm}'`)
    }
    let rawSlices: string = match[1];
    let rawFace = match[2];
    let outerBlockIndicator = match[3];
    let rawType = match[4] || TurnAbbreviation.Clockwise; // Default to clockwise

    return <Turn>{
      move: getMove(rawFace),
      turnType: getTurnType(rawType),
      slices: getSlices(rawSlices, outerBlockIndicator)
    }
  })
}

function getSlices(rawSlices, outerBlockIndicator): number {
  if (outerBlockIndicator && !rawSlices) {
    return 2;
  } else if (!outerBlockIndicator && rawSlices) {
    throw new Error(`Invalid move: Cannot specify num slices if outer block move indicator 'w' is not present`)
  } else if (!outerBlockIndicator && !rawSlices) {
    return 1;
  } else {
    return parseInt(rawSlices);
  }
}

function getMove(rawFace: string): AlgorithmUnit {
  if (possibleMoves.indexOf(rawFace) < 0) {
    throw new Error(`Invalid move (${rawFace}): Possible turn faces are [U R F L D B M E S]`)
  } else return rawFace as AlgorithmUnit
}

function getTurnType(rawType: string): TurnType {
  switch (rawType) {
    case TurnAbbreviation.Clockwise:
      return TurnType.Clockwise
    case TurnAbbreviation.CounterClockwise:
      return TurnType.CounterClockwise
    case TurnAbbreviation.Double:
      return TurnType.Double
    default:
      throw new Error(`Invalid move modifier (${rawType})`)
  }
}
