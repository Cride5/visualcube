"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var colors_1 = require("./../colors");
var math_1 = require("./../math");
var Face;
(function (Face) {
    Face[Face["U"] = 0] = "U";
    Face[Face["R"] = 1] = "R";
    Face[Face["F"] = 2] = "F";
    Face[Face["D"] = 3] = "D";
    Face[Face["L"] = 4] = "L";
    Face[Face["B"] = 5] = "B";
})(Face = exports.Face || (exports.Face = {}));
exports.AllFaces = [Face.U, Face.R, Face.F, Face.D, Face.L, Face.B];
var FaceRotationVectors = /** @class */ (function () {
    function FaceRotationVectors() {
    }
    FaceRotationVectors.U = [0, -1, 0];
    FaceRotationVectors.R = [1, 0, 0];
    FaceRotationVectors.F = [0, 0, -1];
    FaceRotationVectors.D = [0, 1, 0];
    FaceRotationVectors.L = [-1, 0, 0];
    FaceRotationVectors.B = [0, 0, 1];
    return FaceRotationVectors;
}());
exports.FaceRotationVectors = FaceRotationVectors;
exports.DefaultColorScheme = (_a = {},
    _a[Face.U] = colors_1.ColorCode.Yellow,
    _a[Face.R] = colors_1.ColorCode.Red,
    _a[Face.F] = colors_1.ColorCode.Blue,
    _a[Face.D] = colors_1.ColorCode.White,
    _a[Face.L] = colors_1.ColorCode.Orange,
    _a[Face.B] = colors_1.ColorCode.Green,
    _a);
exports.JapaneseColorScheme = (_b = {},
    _b[Face.U] = colors_1.ColorCode.Blue,
    _b[Face.R] = colors_1.ColorCode.Orange,
    _b[Face.F] = colors_1.ColorCode.Green,
    _b[Face.D] = colors_1.ColorCode.White,
    _b[Face.L] = colors_1.ColorCode.Red,
    _b[Face.B] = colors_1.ColorCode.Yellow,
    _b);
var AlgorithmUnit;
(function (AlgorithmUnit) {
    AlgorithmUnit["F"] = "F";
    AlgorithmUnit["U"] = "U";
    AlgorithmUnit["R"] = "R";
    AlgorithmUnit["L"] = "L";
    AlgorithmUnit["D"] = "D";
    AlgorithmUnit["B"] = "B";
    AlgorithmUnit["M"] = "M";
    AlgorithmUnit["E"] = "E";
    AlgorithmUnit["S"] = "S";
    AlgorithmUnit["X"] = "x";
    AlgorithmUnit["Y"] = "y";
    AlgorithmUnit["Z"] = "z";
})(AlgorithmUnit = exports.AlgorithmUnit || (exports.AlgorithmUnit = {}));
exports.AxisSymbolToAxis = {
    x: math_1.Axis.X,
    y: math_1.Axis.Y,
    z: math_1.Axis.Z,
};
exports.possibleMoves = [
    AlgorithmUnit.F,
    AlgorithmUnit.U,
    AlgorithmUnit.R,
    AlgorithmUnit.L,
    AlgorithmUnit.D,
    AlgorithmUnit.B,
    AlgorithmUnit.M,
    AlgorithmUnit.E,
    AlgorithmUnit.S,
    AlgorithmUnit.X,
    AlgorithmUnit.Y,
    AlgorithmUnit.Z,
];
exports.cubeRotations = [AlgorithmUnit.X, AlgorithmUnit.Y, AlgorithmUnit.Z];
var TurnAbbreviation;
(function (TurnAbbreviation) {
    TurnAbbreviation["Clockwise"] = "";
    TurnAbbreviation["CounterClockwise"] = "'";
    TurnAbbreviation["Double"] = "2";
})(TurnAbbreviation = exports.TurnAbbreviation || (exports.TurnAbbreviation = {}));
var Masking;
(function (Masking) {
    Masking["FL"] = "fl";
    Masking["F2L"] = "f2l";
    Masking["LL"] = "ll";
    Masking["CLL"] = "cll";
    Masking["ELL"] = "ell";
    Masking["OLL"] = "oll";
    Masking["OCLL"] = "ocll";
    Masking["OELL"] = "oell";
    Masking["COLL"] = "coll";
    Masking["OCELL"] = "ocell";
    Masking["WV"] = "wv";
    Masking["VH"] = "vh";
    Masking["ELS"] = "els";
    Masking["CLS"] = "cls";
    Masking["CMLL"] = "cmll";
    Masking["CROSS"] = "cross";
    Masking["F2L3"] = "f2l_3";
    Masking["F2L2"] = "f2l_2";
    Masking["F2LSM"] = "f2l_sm";
    Masking["F2L1"] = "f2l_1";
    Masking["F2B"] = "f2b";
    Masking["LINE"] = "line";
})(Masking = exports.Masking || (exports.Masking = {}));
var _a, _b;
