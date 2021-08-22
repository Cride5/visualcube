import { Axis } from './../math';
import { ICubeColorScheme } from './models/color-scheme';
export declare enum Face {
    U = 0,
    R = 1,
    F = 2,
    D = 3,
    L = 4,
    B = 5,
}
export declare const AllFaces: Face[];
export declare class FaceRotationVectors {
    static U: number[];
    static R: number[];
    static F: number[];
    static D: number[];
    static L: number[];
    static B: number[];
}
export declare const DefaultColorScheme: ICubeColorScheme;
export declare const JapaneseColorScheme: ICubeColorScheme;
export declare enum AlgorithmUnit {
    F = "F",
    U = "U",
    R = "R",
    L = "L",
    D = "D",
    B = "B",
    M = "M",
    E = "E",
    S = "S",
    X = "x",
    Y = "y",
    Z = "z",
}
export declare const AxisSymbolToAxis: {
    x: Axis;
    y: Axis;
    z: Axis;
};
export declare const possibleMoves: string[];
export declare const cubeRotations: string[];
export declare enum TurnAbbreviation {
    Clockwise = "",
    CounterClockwise = "'",
    Double = "2",
}
export declare enum Masking {
    FL = "fl",
    F2L = "f2l",
    LL = "ll",
    CLL = "cll",
    ELL = "ell",
    OLL = "oll",
    OCLL = "ocll",
    OELL = "oell",
    COLL = "coll",
    OCELL = "ocell",
    WV = "wv",
    VH = "vh",
    ELS = "els",
    CLS = "cls",
    CMLL = "cmll",
    CROSS = "cross",
    F2L3 = "f2l_3",
    F2L2 = "f2l_2",
    F2LSM = "f2l_sm",
    F2L1 = "f2l_1",
    F2B = "f2b",
    LINE = "line",
}
