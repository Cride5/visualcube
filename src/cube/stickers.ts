import { ICubeOptions } from './options'
import { makeMasking } from './masking'
import { CubeData } from './simulation'
import { parseAlgorithm, parseCase, Turn } from './parsing/algorithm'
import { AllFaces } from './constants'
import { ColorName, ColorCode } from '../constants'

export function makeStickerColors(options: ICubeOptions): string[] {
  let stickerColors = options.stickerColors
  let mask = options.mask ? makeMasking(options.mask, options.cubeSize) : null

  if (mask && options.maskAlg) {
    let maskCubeData = new CubeData(options.cubeSize, mask)
    let alg = parseAlgorithm(options.maskAlg)
    alg.forEach(turn => {
      maskCubeData.turn(turn)
    })
    mask = maskCubeData.faces
  }

  // Fill with color scheme if sticker colors not predefined.
  if (!stickerColors) {
    stickerColors = [].concat.apply(
      [],
      AllFaces.map(face => {
        return Array.apply(null, Array(options.cubeSize * options.cubeSize)).map(() => options.colorScheme[face])
      })
    )
  }

  let faceMappedStickers = AllFaces.reduce((acc, face) => {
    if (!acc[face]) acc[face] = []

    for (let i = 0; i < options.cubeSize; i++) {
      for (let j = 0; j < options.cubeSize; j++) {
        const faceIndex = AllFaces.indexOf(face)
        const stickerNumber = i * options.cubeSize + j
        const colorIndex = faceIndex * (options.cubeSize * options.cubeSize) + stickerNumber

        if (stickerColors.length <= colorIndex) {
          acc[face][options.cubeSize * i + j] = ColorName.Black
        } else {
          acc[face][options.cubeSize * i + j] = stickerColors[colorIndex]
        }

        if (mask && !mask[face][options.cubeSize * i + j]) {
          acc[face][options.cubeSize * i + j] = ColorCode.DarkGray
        }
      }
    }

    return acc
  }, {})

  // Apply Algorithm
  let cubeData = new CubeData(options.cubeSize, faceMappedStickers)

  let alg: Turn[] = []

  if (options.case) {
    alg = parseCase(options.case)
  } else if (options.algorithm) {
    alg = parseAlgorithm(options.algorithm)
  }

  alg.forEach(move => {
    cubeData.turn(move)
  })

  return [].concat.apply([], AllFaces.map(face => cubeData.faces[face].slice()))
}
