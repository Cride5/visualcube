import { AllFaces, Face } from './constants';

export enum TurnType {
  Clockwise,
  CounterClockwise,
  Double
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
  private faces: { [face: number]: number[] } = {}
  private numStickers: number;
  private counterClockwiseSticker = (stickerNumber, cubeSize) => (stickerNumber * cubeSize) % ((cubeSize  * cubeSize) + 1);
  private clockwiseSticker = (stickerNumber, cubeSize) => {
    let numStickers = cubeSize * cubeSize;
    return (numStickers + 1) - this.counterClockwiseSticker(stickerNumber, cubeSize);
  }

  // Precalculated index mapping values for face rotations
  private clockwiseMapping: number[];
  private counterClockwiseMapping: number[];

  constructor(private cubeSize: number) {
    this.numStickers = this.cubeSize * this.cubeSize;
    let currentValue = 1;
    this.clockwiseMapping = [];
    this.counterClockwiseMapping = []
    AllFaces.forEach(face => {
      this.faces[face] = [];
      for (let i = 0; i < this.numStickers; i++) {
        this.faces[face].push(currentValue++);
      }
    });

    for (let i = 1; i <= this.numStickers; i++) {
      this.clockwiseMapping.push(this.clockwiseSticker(i, cubeSize));
      this.counterClockwiseMapping.push(this.counterClockwiseSticker(i, cubeSize));
    }

    this.rTurn();
    console.log(this.faces);
  }

  private rotateFace(face: Face, turn: TurnType) {
    // TODO more efficient rotation to not construct so many new arrays
    // Move values on face
    switch (turn) {
      case TurnType.Clockwise:
        console.log('clockwise');
        this.faces[face] = this.clockwiseMapping.map(newStickerNumber => this.faces[face][newStickerNumber - 1]);
        break;
      case TurnType.CounterClockwise:
        console.log('counter');
        this.faces[face] = this.counterClockwiseMapping.map(newStickerNumber => this.faces[face][newStickerNumber - 1]);
        break;
      case TurnType.Double:
        console.log('double');
        this.faces[face].reverse();
        break;
    }

    // Move values on adjacent faces


  }

  rTurn() {
    this.rotateFace(Face.R, TurnType.Clockwise);
  }
}