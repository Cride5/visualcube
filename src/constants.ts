import { IColorScheme } from './models/color-scheme';
export enum Face {
  U = 0,
  R = 1,
  F = 2,
  D = 3,
  L = 4,
  B = 5,
  // N = 6,
  // O = 7,
  // T = 8
}

export enum ColorCode {
  Black = '000000',
  DarkGray = '404040',
  Gray = '808080',
  Silver = 'BFBFBF',
  White = 'FFFFFF',
  Yellow = 'FEFE00',
  Red = 'EE0000',
  Orange = 'FFA100',
  Blue = '0000F2',
  Green = '00D800',
  Purple = 'A83DD9',
  Pink = 'F33D7B',
}

export enum ColorName {
  Black = 'black',
  DarkGray = 'darkGray',
  Gray = 'gray',
  Silver = 'silver',
  White = 'white',
  Yellow = 'yellow',
  Red = 'red',
  Orange = 'orange',
  Blue = 'blue',
  Green = 'green',
  Purple = 'purple',
  Pink = 'pink'
}

export enum ColorAbbreviation {
  Black = 'n',
  DarkGray = 'd',
  Gray = 'l',
  Silver = 's',
  White = 'w',
  Yellow = 'y',
  Red = 'r',
  Orange = 'o',
  Blue = 'b',
  Green = 'g',
  Purple = 'm',
  Pink = 'p',
  Transparent = 't'
}

export const ColorNameToCode: { [name:string]: ColorCode } = {
  [ColorName.Black]: ColorCode.Black,
  [ColorName.DarkGray]: ColorCode.DarkGray,
  [ColorName.Gray]: ColorCode.Gray,
  [ColorName.Silver]: ColorCode.Silver,
  [ColorName.White]: ColorCode.White,
  [ColorName.Yellow]: ColorCode.Yellow,
  [ColorName.Red]: ColorCode.Red,
  [ColorName.Orange]: ColorCode.Orange,
  [ColorName.Blue]: ColorCode.Blue,
  [ColorName.Green]: ColorCode.Green,
  [ColorName.Purple]: ColorCode.Purple,
  [ColorName.Pink]: ColorCode.Pink,
}

export const ColorAbbreviationToCode: { [name:string]: ColorCode } = {
  [ColorAbbreviation.Black]: ColorCode.Black,
  [ColorAbbreviation.DarkGray]: ColorCode.DarkGray,
  [ColorAbbreviation.Gray]: ColorCode.Gray,
  [ColorAbbreviation.Silver]: ColorCode.Silver,
  [ColorAbbreviation.White]: ColorCode.White,
  [ColorAbbreviation.Yellow]: ColorCode.Yellow,
  [ColorAbbreviation.Red]: ColorCode.Red,
  [ColorAbbreviation.Orange]: ColorCode.Orange,
  [ColorAbbreviation.Blue]: ColorCode.Blue,
  [ColorAbbreviation.Green]: ColorCode.Green,
  [ColorAbbreviation.Purple]: ColorCode.Purple,
  [ColorAbbreviation.Pink]: ColorCode.Pink,
  [ColorAbbreviation.Transparent]: null
}

export const DefaultColorScheme: IColorScheme = {
  u: ColorCode.Yellow,
  r: ColorCode.Red,
  f: ColorCode.Blue,
  d: ColorCode.White,
  l: ColorCode.Orange,
  b: ColorCode.Green
}

export class FaceRotationVectors {
  static U = [0, -1, 0];
  static R = [1, 0, 0];
  static F = [0 ,0, -1];
  static D = [0, 1, 0];
  static L = [-1, 0, 0];
  static B = [0, 0, 1];
}