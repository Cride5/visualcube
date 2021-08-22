import { ColorCode, ColorName } from './colors';
import { Face } from './cube/constants';
export declare enum FaceletDefinition {
    Up = "u",
    Down = "d",
    Left = "l",
    Right = "r",
    Back = "b",
    Front = "f",
    Transparent = "t",
    Oriented = "o",
    Blank = "n",
}
export declare const ColorNameToCode: {
    [name: string]: ColorCode;
};
export declare const ColorAbbreviationToCode: {
    [name: string]: ColorCode;
};
export declare const FaceletAbbreviateToDefinition: {
    [facelet: string]: FaceletDefinition;
};
export declare const FaceletToFace: {
    [facelet: string]: Face;
};
export declare const FaceletToColor: {
    [FaceletDefinition.Oriented]: ColorName;
    [FaceletDefinition.Blank]: ColorCode;
    [FaceletDefinition.Transparent]: ColorName;
};
