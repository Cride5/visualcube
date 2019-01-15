import { Axis } from './../math';
import { AllFaces, Face, AlgorithmUnit } from './constants';
import { Turn } from './algorithm';

export enum TurnType {
  Clockwise,
  CounterClockwise,
  Double
}

// Given sticker N return sticker number after rotation
type FaceRotation = (stickerNumber: number, cubeSize: number) => number;

const faceIdentity: FaceRotation = (stickerNumber: number, cubeSize: number) => stickerNumber;
const counterClockwiseSticker: FaceRotation = (stickerNumber, cubeSize) => (stickerNumber * cubeSize) % ((cubeSize  * cubeSize) + 1);
const clockwiseSticker: FaceRotation = (stickerNumber, cubeSize) => {
  let numStickers = cubeSize * cubeSize;
  return (numStickers + 1) - counterClockwiseSticker(stickerNumber, cubeSize);
}
const doubleTurn: FaceRotation = (stickerNumber, cubeSize) => {
  return ((cubeSize * cubeSize) - stickerNumber) + 1;
}

// Faces that wrap around a given axis
const AxisMapping = {
  [Axis.X]: [Face.U, Face.B, Face.F, Face.D],
  [Axis.Y]: [Face.L, Face.B, Face.R, Face.F],
  [Axis.Z]: [Face.L, Face.U, Face.R, Face.D]
}

// Face's orientation related to other faces on a given axis
const AxisOrientation: { [axis: number]: {[face: number]: FaceRotation }} = {
  [Axis.X]: {
    [Face.U]: faceIdentity,
    [Face.B]: doubleTurn,
    [Face.F]: faceIdentity,
    [Face.D]: faceIdentity,
    [Face.L]: null,
    [Face.R]: null
  },
  [Axis.Y]: {
    [Face.U]: null,
    [Face.B]: counterClockwiseSticker,
    [Face.F]: counterClockwiseSticker,
    [Face.D]: null,
    [Face.L]: counterClockwiseSticker,
    [Face.R]: counterClockwiseSticker
  },
  [Axis.Z]: {
    [Face.U]: counterClockwiseSticker,
    [Face.B]: null,
    [Face.F]: null,
    [Face.D]: clockwiseSticker,
    [Face.L]: faceIdentity,
    [Face.R]: doubleTurn
  }
}

export class CubeData {

  /**
   *  Data to store face value
   *  data saved in flat array [1, 2, 3, 4, 5, 6, 7, 8, 9]
   *  maps to cube stickers like this
   * 
   *  U Face
   *  1 | 2 | 3
   *  ----------
   *  4 | 5 | 6
   *  ----------
   *  7 | 8 | 9
   * 
   *  Stickers are numbered in that manner starting with the U face
   *  continuing with this order U, R, F, D, L, B
   * 
   *  Because each face has a differen't orientation it may not be clear
   *  how the back faces are numbered. Below is an example 3x3 mapping
   * 
   *  Example numbers of 3x3 cube. nxn cubes follow the same pattern
   * 
   *        B
   *      L U R
   *        F
   *        D
   *                  | 54  | 53  | 52  |
   *                   -----------------
   *                  | 51  | 50  | 49  |
   *                   -----------------
   *                  | 48  | 47  | 46  |
   * -----------------                   -----------------
   *  43  | 40  | 37     1  |  2  |  3    12  | 15  | 18  
   * ----------------- ----------------- -----------------
   *  44  | 41  | 38     4  |  5  |  6    11  | 14  | 17  
   * ----------------- ----------------- -----------------
   *  45  | 42  | 39     7  |  8  |  9    10  | 13  | 16  
   * -----------------                   -----------------
   *                  | 19  | 20  | 21  |
   *                   -----------------
   *                  | 22  | 23  | 24  |
   *                   -----------------
   *                  | 25  | 26  | 27  |
   *                   
   *                  | 28  | 29  | 30  |
   *                   -----------------
   *                  | 31  | 32  | 33  |
   *                   -----------------
   *                  | 34  | 35  | 36  |
   */
  public faces: { [face: number]: any[] } = {}
  private numStickers: number;

  // Precalculated index mapping values for face rotations
  private clockwiseMapping: number[];
  private counterClockwiseMapping: number[];
  private doubleMapping: number[];


  constructor(private cubeSize: number, initialValues?: { [face: number]: any[] }) {
    this.numStickers = this.cubeSize * this.cubeSize;
    this.clockwiseMapping = [];
    this.counterClockwiseMapping = [];
    this.doubleMapping = [];

    this.faces = initialValues;

    if (!this.faces) {
      this.initValues();
    }

    for (let i = 1; i <= this.numStickers; i++) {
      this.clockwiseMapping.push(clockwiseSticker(i, cubeSize));
      this.counterClockwiseMapping.push(counterClockwiseSticker(i, cubeSize));
      this.doubleMapping.push(doubleTurn(i, cubeSize));
    }
  }

  private initValues() {
    let currentValue = 1;
    AllFaces.forEach(face => {
      this.faces[face] = [];
      for (let i = 0; i < this.numStickers; i++) {
        this.faces[face].push(currentValue++);
      }
    });
  }

  /**
   * Rotates values on an outer face of the rubiks cubes
   */
  private rotateFace(face: Face, turn: TurnType) {
    // TODO more efficient rotation to not construct so many new arrays
    switch (turn) {
      case TurnType.Clockwise:
        this.faces[face] = this.clockwiseMapping.map(newStickerNumber => this.faces[face][newStickerNumber - 1]);
        break;
      case TurnType.CounterClockwise:
        this.faces[face] = this.counterClockwiseMapping.map(newStickerNumber => this.faces[face][newStickerNumber - 1]);
        break;
      case TurnType.Double:
        this.faces[face].reverse();
        break;
    }
  }

  /**
   * Rotates layer values around a given axis
   */
  private axisRotation(offset: number, range: number, axis: Axis, faceOrder: Face[], forward: boolean = true, double: boolean = false) {
    if (!forward) {
      faceOrder.reverse();
    }

    // Copy original values to avoid clobbering values when modifying stickers
    let originalValues = faceOrder.map(face => this.faces[face].slice());

    // Copy values
    for (let i = 0; i < this.cubeSize; i++) {
      for (let r = 0; r < range; r++) {
        const stickerIndex = (this.cubeSize * i) + (offset + r);
        for (let j = 0; j < faceOrder.length; j++) {
          const face = faceOrder[j];
          const nextFace = double ? faceOrder[(j+2) % faceOrder.length] : faceOrder[(j+1) % faceOrder.length];
          const valueIndex = AxisOrientation[axis][face](stickerIndex+1, this.cubeSize) - 1;
          const nextFaceValueIndex = AxisOrientation[axis][nextFace](stickerIndex+1, this.cubeSize) - 1;
          this.faces[face][valueIndex] = originalValues[(double ? j + 2 : j + 1) % originalValues.length][nextFaceValueIndex];
        }
      }
    }
  }

  /**
   * Rotate layers around the x axis of the cube
   */
  private xLayersRotation(offset: number, forward: boolean = true, double: boolean = false, range: number = 1) {
    let faceOrder = [Face.U, Face.F, Face.D, Face.B];
    this.axisRotation(offset, range, Axis.X, faceOrder, forward, double);
  }

  /**
   * Rotate layers around the y axis of the cube
   */
  private yLayersRotation(offset: number, forward: boolean = true, double: boolean = false, range: number = 1) {
    let faceOrder = [Face.L, Face.F, Face.R, Face.B];
    this.axisRotation(offset, range, Axis.Y, faceOrder, forward, double);
  }

  /**
   * Rotate layers around the z axis of the cube
   */
  private zLayersRotation(offset: number, forward: boolean = true, double: boolean = false, range: number = 1) {
    let faceOrder = [Face.U, Face.L, Face.D, Face.R];
    this.axisRotation(offset, range, Axis.Z, faceOrder, forward, double);
  }

  rTurn(turnType: TurnType) {
    this.rotateFace(Face.R, turnType);
    this.xLayersRotation(2, turnType === TurnType.Clockwise, turnType === TurnType.Double);
  }

  lTurn(turnType: TurnType) {
    this.rotateFace(Face.L, turnType);
    this.xLayersRotation(0, turnType === TurnType.CounterClockwise, turnType === TurnType.Double);
  }

  uTurn(turnType: TurnType) {
    this.rotateFace(Face.U, turnType);
    this.yLayersRotation(0, turnType === TurnType.Clockwise, turnType === TurnType.Double);
  }

  dTurn(turnType: TurnType) {
    this.rotateFace(Face.D, turnType);
    this.yLayersRotation(this.cubeSize - 1, turnType === TurnType.CounterClockwise, turnType === TurnType.Double);
  }

  fTurn(turnType: TurnType) {
    this.rotateFace(Face.F, turnType);
    this.zLayersRotation(this.cubeSize - 1, turnType === TurnType.Clockwise, turnType === TurnType.Double);
  }

  bTurn(turnType: TurnType) {
    this.rotateFace(Face.B, turnType);
    this.zLayersRotation(0, turnType === TurnType.CounterClockwise, turnType === TurnType.Double);
  }

  mTurn(turnType: TurnType) {
    if (this.cubeSize < 2) return;
    this.xLayersRotation(1, turnType === TurnType.CounterClockwise, turnType === TurnType.Double, this.cubeSize - 2);
  }

  eTurn(turnType: TurnType) {
    if (this.cubeSize < 2) return;
    this.yLayersRotation(1, turnType === TurnType.CounterClockwise, turnType === TurnType.Double);
  }

  sTurn(turnType: TurnType) {
    if (this.cubeSize < 2) return;
    this.zLayersRotation(1, turnType === TurnType.Clockwise, turnType === TurnType.Double);
  }

  turn(turn: Turn) {
    switch (turn.move) {
      case AlgorithmUnit.F:
        this.fTurn(turn.turnType);
      break;
      case AlgorithmUnit.B:
        this.bTurn(turn.turnType);
      break;
      case AlgorithmUnit.U:
        this.uTurn(turn.turnType);
      break;
      case AlgorithmUnit.D:
        this.dTurn(turn.turnType);
      break;
      case AlgorithmUnit.R:
        this.rTurn(turn.turnType);
      break;
      case AlgorithmUnit.L:
        this.lTurn(turn.turnType);
      break;
      case AlgorithmUnit.M:
        this.mTurn(turn.turnType);
      break;
      case AlgorithmUnit.E:
        this.eTurn(turn.turnType);
      break;
      case AlgorithmUnit.S:
        this.sTurn(turn.turnType);
      break;
      default:
        throw new Error(`Unrecognized move in turn ${JSON.stringify(turn)}`);
    }
  }
}