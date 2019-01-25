import { Masking, Face, AllFaces } from './constants'

type FaceValues = { [face: number]: any[] }
type MaskingFunctions = {
  [masking: string]: {
    [face: number]: (row: number, col: number, cubeSize: number) => boolean
  }
}

const maskingFunctions: MaskingFunctions = {
  [Masking.FL]: {
    [Face.U]: (row, col, cubeSize) => false,
    [Face.D]: (row, col, cubeSize) => true,
    [Face.R]: (row, col, cubeSize) => row == cubeSize - 1,
    [Face.L]: (row, col, cubeSize) => row == cubeSize - 1,
    [Face.F]: (row, col, cubeSize) => row == cubeSize - 1,
    [Face.B]: (row, col, cubeSize) => row == cubeSize - 1,
  },
  [Masking.F2L]: {
    [Face.U]: (row, col, cubeSize) => false,
    [Face.D]: (row, col, cubeSize) => true,
    [Face.R]: (row, col, cubeSize) => row > 0,
    [Face.L]: (row, col, cubeSize) => row > 0,
    [Face.F]: (row, col, cubeSize) => row > 0,
    [Face.B]: (row, col, cubeSize) => row > 0,
  },
  [Masking.LL]: {
    [Face.U]: (row, col, cubeSize) => true,
    [Face.D]: (row, col, cubeSize) => false,
    [Face.R]: (row, col, cubeSize) => row == 0,
    [Face.L]: (row, col, cubeSize) => row == 0,
    [Face.F]: (row, col, cubeSize) => row == 0,
    [Face.B]: (row, col, cubeSize) => row == 0,
  },
  [Masking.CLL]: {
    [Face.U]: (row, col, cubeSize) =>
      (row > 0 && col > 0 && row < cubeSize - 1 && col < cubeSize - 1) || // is center
      ((row == 0 || row == cubeSize - 1) && (col == 0 || col == cubeSize - 1)),
    [Face.D]: (row, col, cubeSize) => false,
    [Face.R]: (row, col, cubeSize) => row == 0 && (col == 0 || col == cubeSize - 1),
    [Face.L]: (row, col, cubeSize) => row == 0 && (col == 0 || col == cubeSize - 1),
    [Face.F]: (row, col, cubeSize) => row == 0 && (col == 0 || col == cubeSize - 1),
    [Face.B]: (row, col, cubeSize) => row == 0 && (col == 0 || col == cubeSize - 1),
  },
  [Masking.ELL]: {
    [Face.U]: (row, col, cubeSize) => !((row == 0 || row == cubeSize - 1) && (col == 0 || col == cubeSize - 1)),
    [Face.D]: (row, col, cubeSize) => false,
    [Face.R]: (row, col, cubeSize) => row == 0 && col > 0 && col < cubeSize - 1,
    [Face.L]: (row, col, cubeSize) => row == 0 && col > 0 && col < cubeSize - 1,
    [Face.F]: (row, col, cubeSize) => row == 0 && col > 0 && col < cubeSize - 1,
    [Face.B]: (row, col, cubeSize) => row == 0 && col > 0 && col < cubeSize - 1,
  },
  [Masking.OLL]: {
    [Face.U]: (row, col, cubeSize) => true,
    [Face.D]: (row, col, cubeSize) => false,
    [Face.R]: (row, col, cubeSize) => false,
    [Face.L]: (row, col, cubeSize) => false,
    [Face.F]: (row, col, cubeSize) => false,
    [Face.B]: (row, col, cubeSize) => false,
  },
  [Masking.OCLL]: {
    [Face.U]: (row, col, cubeSize) =>
      (row > 0 && col > 0 && row < cubeSize - 1 && col < cubeSize - 1) || // is center
      ((row == 0 || row == cubeSize - 1) && (col == 0 || col == cubeSize - 1)),
    [Face.D]: (row, col, cubeSize) => false,
    [Face.R]: (row, col, cubeSize) => false,
    [Face.L]: (row, col, cubeSize) => false,
    [Face.F]: (row, col, cubeSize) => false,
    [Face.B]: (row, col, cubeSize) => false,
  },
  [Masking.OELL]: {
    [Face.U]: (row, col, cubeSize) => !((row == 0 || row == cubeSize - 1) && (col == 0 || col == cubeSize - 1)),
    [Face.D]: (row, col, cubeSize) => false,
    [Face.R]: (row, col, cubeSize) => false,
    [Face.L]: (row, col, cubeSize) => false,
    [Face.F]: (row, col, cubeSize) => false,
    [Face.B]: (row, col, cubeSize) => false,
  },
  [Masking.COLL]: {
    [Face.U]: (row, col, cubeSize) => true,
    [Face.D]: (row, col, cubeSize) => false,
    [Face.R]: (row, col, cubeSize) => row == 0 && (col == 0 || col == cubeSize - 1),
    [Face.L]: (row, col, cubeSize) => row == 0 && (col == 0 || col == cubeSize - 1),
    [Face.F]: (row, col, cubeSize) => row == 0 && (col == 0 || col == cubeSize - 1),
    [Face.B]: (row, col, cubeSize) => row == 0 && (col == 0 || col == cubeSize - 1),
  },
  [Masking.OCELL]: {
    [Face.U]: (row, col, cubeSize) => true,
    [Face.D]: (row, col, cubeSize) => false,
    [Face.R]: (row, col, cubeSize) => row == 0 && col > 0 && col < cubeSize - 1,
    [Face.L]: (row, col, cubeSize) => row == 0 && col > 0 && col < cubeSize - 1,
    [Face.F]: (row, col, cubeSize) => row == 0 && col > 0 && col < cubeSize - 1,
    [Face.B]: (row, col, cubeSize) => row == 0 && col > 0 && col < cubeSize - 1,
  },
  [Masking.WV]: {
    [Face.U]: (row, col, cubeSize) => true,
    [Face.D]: (row, col, cubeSize) => true,
    [Face.R]: (row, col, cubeSize) => row > 0,
    [Face.L]: (row, col, cubeSize) => row > 0,
    [Face.F]: (row, col, cubeSize) => row > 0,
    [Face.B]: (row, col, cubeSize) => row > 0,
  },
  [Masking.VH]: {
    [Face.U]: (row, col, cubeSize) => !((row == 0 || row == cubeSize - 1) && (col == 0 || col == cubeSize - 1)),
    [Face.D]: (row, col, cubeSize) => true,
    [Face.R]: (row, col, cubeSize) => row > 0,
    [Face.L]: (row, col, cubeSize) => row > 0,
    [Face.F]: (row, col, cubeSize) => row > 0,
    [Face.B]: (row, col, cubeSize) => row > 0,
  },
  [Masking.ELS]: {
    [Face.U]: (row, col, cubeSize) => !((row == 0 || row == cubeSize - 1) && (col == 0 || col == cubeSize - 1)),
    [Face.D]: (row, col, cubeSize) => (row == 0 ? col < cubeSize - 1 : true),
    [Face.R]: (row, col, cubeSize) => row > 0 && (row == cubeSize - 1 ? col > 0 : true),
    [Face.L]: (row, col, cubeSize) => row > 0,
    [Face.F]: (row, col, cubeSize) => row > 0 && (row == cubeSize - 1 ? col < cubeSize - 1 : true),
    [Face.B]: (row, col, cubeSize) => row > 0,
  },
  [Masking.CLS]: {
    [Face.U]: (row, col, cubeSize) => true,
    [Face.D]: (row, col, cubeSize) => true,
    [Face.R]: (row, col, cubeSize) => row > 0,
    [Face.L]: (row, col, cubeSize) => row > 0,
    [Face.F]: (row, col, cubeSize) => row > 0,
    [Face.B]: (row, col, cubeSize) => row > 0,
  },
  [Masking.CMLL]: {
    [Face.U]: (row, col, cubeSize) => (row == 0 || row == cubeSize - 1) && (col == 0 || col == cubeSize - 1),
    [Face.D]: (row, col, cubeSize) => true,
    [Face.R]: (row, col, cubeSize) => row > 0 || col == 0 || col == cubeSize - 1,
    [Face.L]: (row, col, cubeSize) => row > 0 || col == 0 || col == cubeSize - 1,
    [Face.F]: (row, col, cubeSize) => col == 0 || col == cubeSize - 1,
    [Face.B]: (row, col, cubeSize) => col == 0 || col == cubeSize - 1,
  },
  [Masking.CROSS]: {
    [Face.U]: (row, col, cubeSize) => false,
    [Face.D]: (row, col, cubeSize) => !((row == 0 || row == cubeSize - 1) && (col == 0 || col == cubeSize - 1)),
    [Face.R]: (row, col, cubeSize) => row > 0 && col > 0 && col < cubeSize - 1,
    [Face.L]: (row, col, cubeSize) => row > 0 && col > 0 && col < cubeSize - 1,
    [Face.F]: (row, col, cubeSize) => row > 0 && col > 0 && col < cubeSize - 1,
    [Face.B]: (row, col, cubeSize) => row > 0 && col > 0 && col < cubeSize - 1,
  },
  [Masking.F2L3]: {
    [Face.U]: (row, col, cubeSize) => false,
    [Face.D]: (row, col, cubeSize) =>
      (row == 0 && col == cubeSize - 1) || !((row == 0 || row == cubeSize - 1) && (col == 0 || col == cubeSize - 1)),
    [Face.R]: (row, col, cubeSize) => row > 0 && col < cubeSize - 1,
    [Face.L]: (row, col, cubeSize) => row > 0 && col > 0 && col < cubeSize - 1,
    [Face.F]: (row, col, cubeSize) => row > 0 && col > 0,
    [Face.B]: (row, col, cubeSize) => row > 0 && col > 0 && col < cubeSize - 1,
  },
  [Masking.F2L2]: {
    [Face.U]: (row, col, cubeSize) => false,
    [Face.D]: (row, col, cubeSize) => row > 0 || (col > 0 && col < cubeSize - 1),
    [Face.R]: (row, col, cubeSize) => row > 0 && col > 0,
    [Face.L]: (row, col, cubeSize) => row > 0 && col < cubeSize - 1,
    [Face.F]: (row, col, cubeSize) => row > 0 && col > 0 && col < cubeSize - 1,
    [Face.B]: (row, col, cubeSize) => row > 0,
  },
  [Masking.F2LSM]: {
    [Face.U]: (row, col, cubeSize) => false,
    [Face.D]: (row, col, cubeSize) =>
      !((row == 0 || row == cubeSize - 1) && (col == 0 || col == cubeSize - 1)) ||
      (col == 0 && row == cubeSize - 1) ||
      (row == 0 && col == cubeSize - 1),
    [Face.R]: (row, col, cubeSize) => row > 0 && col < cubeSize - 1,
    [Face.L]: (row, col, cubeSize) => row > 0 && col < cubeSize - 1,
    [Face.F]: (row, col, cubeSize) => row > 0 && col > 0,
    [Face.B]: (row, col, cubeSize) => row > 0 && col > 0,
  },
  [Masking.F2L1]: {
    [Face.U]: (row, col, cubeSize) => false,
    [Face.D]: (row, col, cubeSize) => row !== 0 || col !== cubeSize - 1,
    [Face.R]: (row, col, cubeSize) => row > 0 && col > 0,
    [Face.L]: (row, col, cubeSize) => row > 0,
    [Face.F]: (row, col, cubeSize) => row > 0 && col < cubeSize - 1,
    [Face.B]: (row, col, cubeSize) => row > 0,
  },
  [Masking.F2B]: {
    [Face.U]: (row, col, cubeSize) => false,
    [Face.D]: (row, col, cubeSize) => col == 0 || col == cubeSize - 1,
    [Face.R]: (row, col, cubeSize) => row > 0,
    [Face.L]: (row, col, cubeSize) => row > 0,
    [Face.F]: (row, col, cubeSize) => row > 0 && (col == 0 || col == cubeSize - 1),
    [Face.B]: (row, col, cubeSize) => row > 0 && (col == 0 || col == cubeSize - 1),
  },
  [Masking.LINE]: {
    [Face.U]: (row, col, cubeSize) => false,
    [Face.D]: (row, col, cubeSize) => col > 0 && col < cubeSize - 1,
    [Face.R]: (row, col, cubeSize) => false,
    [Face.L]: (row, col, cubeSize) => false,
    [Face.F]: (row, col, cubeSize) => row > 0 && col > 0 && col < cubeSize - 1,
    [Face.B]: (row, col, cubeSize) => row > 0 && col > 0 && col < cubeSize - 1,
  },
}

export function makeMasking(masking: Masking, cubeSize: number): FaceValues {
  if (!maskingFunctions[masking]) {
    throw new Error(`invalid masking ${masking}`)
  }

  let numStickers = cubeSize * cubeSize
  let faceValues = {
    [Face.U]: [],
    [Face.F]: [],
    [Face.R]: [],
    [Face.D]: [],
    [Face.L]: [],
    [Face.B]: [],
  }

  for (let i = 0; i < numStickers; i++) {
    let row = Math.floor(i / cubeSize)
    let col = i % cubeSize

    AllFaces.forEach(face => {
      faceValues[face].push(maskingFunctions[masking][face](row, col, cubeSize))
    })
  }

  return faceValues
}
