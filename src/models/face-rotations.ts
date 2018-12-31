import { Axis, rotate } from './../geometry/math';
import { AllFaces, Face } from './../constants';
import { Vec3 } from "../geometry/math";

/**
 * Rotation vectors by face
 */
export type FaceRotations = { [face: number]: Vec3 }

/**
 * Applies set of rotations to all face rotation vectors.
 */
export function rotateFaces(faceRotations: FaceRotations, rotations: [Axis, number][]): FaceRotations {
  return AllFaces.reduce((acc, face) => {
    rotations.forEach((rotation) => {
      if (!acc[face]) {
        acc[face] = [...faceRotations[face]]
      }
      acc[face] = rotate(acc[face], rotation[0], Math.PI * rotation[1]/180)
    });
    return acc;
  }, {})
}