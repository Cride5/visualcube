import { TurnType } from "../simulation";
import { TurnAbbreviation, AlgorithmUnit, possibleMoves } from "../constants";

export interface Turn {
  move: AlgorithmUnit,
  turnType: TurnType
}

/**
 * Takes in an algorithm string and parses the turns from it
 * algorithm string format should be moves separated by a single space
 * (ex. "U R2 L' x")
 */
export function parseAlgorithm(algorithm: string): Turn[] {
  if (!algorithm) {
    return [];
  }
  return algorithm.split(' ').map(move => {
    if (move.length > 2) {
      throw new Error(`Invalid move (${move}) in algorithm '${algorithm}'`)
    }
    return <Turn> {
      move: getMove(move),
      turnType: getTurnType(move)
    }
  });
}

function getMove(move: string): AlgorithmUnit {
  if (possibleMoves.indexOf(move.charAt(0)) < 0) {
    throw new Error(`invalid move (${move})`)
  }

  else return move.charAt(0) as AlgorithmUnit;
}

function getTurnType(move: string): TurnType {
  switch (move.charAt(1)) { // if string is only length 1 .charAt(1) will return empty string
    case TurnAbbreviation.Clockwise:
      return TurnType.Clockwise;
    case TurnAbbreviation.CounterClockwise:
      return TurnType.CounterClockwise;
    case TurnAbbreviation.Double:
      return TurnType.Double;
    default:
      throw new Error(`Invalid move modifier (${move.charAt(1)}) in move '${move}'`);
  };
}