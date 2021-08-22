import { TurnType } from '../simulation';
import { AlgorithmUnit } from '../constants';
export interface Turn {
    move: AlgorithmUnit;
    turnType: TurnType;
    slices: number;
}
/**
 * Takes in an algorithm string and parses the turns from it
 * algorithm string format should be moves separated by a single space
 * (ex. "U R2 L' x")
 *
 * https://www.worldcubeassociation.org/regulations/#article-12-notation
 */
export declare function parseAlgorithm(algorithm: string): Turn[];
export declare function parseCase(algorithm: string): Turn[];
