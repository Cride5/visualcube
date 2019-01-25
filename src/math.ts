/**
 * Methods for manipulating points in 3d space (Vec3)
 */

export type Vec3 = [number, number, number]

export enum Axis {
  X = 0,
  Y = 1,
  Z = 2,
}

export function makeMatrix<T>(rows: number, cols: number): T[][] {
  let matrix: T[][] = []
  for (let r = 0; r < rows; r++) {
    matrix[r] = []
    for (let c = 0; c < cols; c++) {
      matrix[r][c] = null
    }
  }
  return matrix
}

export function translate(pos: Vec3, v: Vec3): Vec3 {
  return pos.map((value, index) => value + v[index]) as Vec3
}

export function scale(pos: Vec3, scalar: number): Vec3 {
  return pos.map(v => v * scalar) as Vec3
}

// Scale a point relative to position vector
export function transScale(pos: Vec3, v: Vec3, scalar: number): Vec3 {
  // Translate each facelet to cf
  let iv: Vec3 = v.map(x => -x) as Vec3
  return translate(scale(translate(pos, iv), scalar), v)
}

export function rotate(pos: Vec3, axis: Axis, radians: number): Vec3 {
  let newPosition: Vec3 = [...pos] as Vec3
  switch (axis) {
    case Axis.X:
      newPosition[2] = pos[2] * Math.cos(radians) - pos[1] * Math.sin(radians)
      newPosition[1] = pos[2] * Math.sin(radians) + pos[1] * Math.cos(radians)
      break
    case Axis.Y:
      newPosition[0] = pos[0] * Math.cos(radians) + pos[2] * Math.sin(radians)
      newPosition[2] = -pos[0] * Math.sin(radians) + pos[2] * Math.cos(radians)
      break
    case Axis.Z:
      newPosition[0] = pos[0] * Math.cos(radians) - pos[1] * Math.sin(radians)
      newPosition[1] = pos[0] * Math.sin(radians) + pos[1] * Math.cos(radians)
      break
  }
  return newPosition
}

export function project(pos: Vec3, d: number): Vec3 {
  return [
    (pos[0] * d) / pos[2],
    (pos[1] * d) / pos[2],
    pos[2], // Maintain z coordinate to allow use of rendering tricks
  ]
}

export function radians2Degrees(radians: number) {
  return (radians * 180) / Math.PI
}
