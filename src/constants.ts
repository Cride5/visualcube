import { Face } from '..'

export enum ColorCode {
  Black = '#000000',
  DarkGray = '#404040',
  Gray = '#808080',
  Silver = '#BFBFBF',
  White = '#FFFFFF',
  Yellow = '#FEFE00',
  Red = '#EE0000',
  Orange = '#FFA100',
  Blue = '#0000F2',
  Green = '#00D800',
  Purple = '#A83DD9',
  Pink = '#F33D7B',
  Transparent = 'transparent',
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
  Pink = 'pink',
  Transparent = 'transparent',
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
  Transparent = 't',
}

export enum FaceletDefinition {
  Up = 'u',
  Down = 'd',
  Left = 'l',
  Right = 'r',
  Back = 'b',
  Front = 'f',
  Transparent = 't',
  Oriented = 'o',
  Blank = 'n',
}

export const ColorNameToCode: { [name: string]: ColorCode } = {
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

export const ColorAbbreviationToCode: { [name: string]: ColorCode } = {
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
  [ColorAbbreviation.Transparent]: ColorCode.Transparent,
}

export const FaceletAbbreviateToDefinition: { [facelet: string]: FaceletDefinition } = {
  u: FaceletDefinition.Up,
  f: FaceletDefinition.Front,
  r: FaceletDefinition.Right,
  d: FaceletDefinition.Down,
  l: FaceletDefinition.Left,
  b: FaceletDefinition.Back,
  t: FaceletDefinition.Transparent,
  o: FaceletDefinition.Oriented,
  n: FaceletDefinition.Blank,
}

export const FaceletToFace: { [facelet: string]: Face } = {
  [FaceletDefinition.Up]: Face.U,
  [FaceletDefinition.Down]: Face.D,
  [FaceletDefinition.Left]: Face.L,
  [FaceletDefinition.Right]: Face.R,
  [FaceletDefinition.Front]: Face.F,
  [FaceletDefinition.Back]: Face.B,
}

export const FaceletToColor = {
  [FaceletDefinition.Oriented]: ColorName.Gray,
  [FaceletDefinition.Blank]: ColorCode.DarkGray,
  [FaceletDefinition.Transparent]: ColorName.Transparent,
}
