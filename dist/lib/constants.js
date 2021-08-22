"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var colors_1 = require("./colors");
var constants_1 = require("./cube/constants");
var FaceletDefinition;
(function (FaceletDefinition) {
    FaceletDefinition["Up"] = "u";
    FaceletDefinition["Down"] = "d";
    FaceletDefinition["Left"] = "l";
    FaceletDefinition["Right"] = "r";
    FaceletDefinition["Back"] = "b";
    FaceletDefinition["Front"] = "f";
    FaceletDefinition["Transparent"] = "t";
    FaceletDefinition["Oriented"] = "o";
    FaceletDefinition["Blank"] = "n";
})(FaceletDefinition = exports.FaceletDefinition || (exports.FaceletDefinition = {}));
exports.ColorNameToCode = (_a = {},
    _a[colors_1.ColorName.Black] = colors_1.ColorCode.Black,
    _a[colors_1.ColorName.DarkGray] = colors_1.ColorCode.DarkGray,
    _a[colors_1.ColorName.Gray] = colors_1.ColorCode.Gray,
    _a[colors_1.ColorName.Silver] = colors_1.ColorCode.Silver,
    _a[colors_1.ColorName.White] = colors_1.ColorCode.White,
    _a[colors_1.ColorName.Yellow] = colors_1.ColorCode.Yellow,
    _a[colors_1.ColorName.Red] = colors_1.ColorCode.Red,
    _a[colors_1.ColorName.Orange] = colors_1.ColorCode.Orange,
    _a[colors_1.ColorName.Blue] = colors_1.ColorCode.Blue,
    _a[colors_1.ColorName.Green] = colors_1.ColorCode.Green,
    _a[colors_1.ColorName.Purple] = colors_1.ColorCode.Purple,
    _a[colors_1.ColorName.Pink] = colors_1.ColorCode.Pink,
    _a);
exports.ColorAbbreviationToCode = (_b = {},
    _b[colors_1.ColorAbbreviation.Black] = colors_1.ColorCode.Black,
    _b[colors_1.ColorAbbreviation.DarkGray] = colors_1.ColorCode.DarkGray,
    _b[colors_1.ColorAbbreviation.Gray] = colors_1.ColorCode.Gray,
    _b[colors_1.ColorAbbreviation.Silver] = colors_1.ColorCode.Silver,
    _b[colors_1.ColorAbbreviation.White] = colors_1.ColorCode.White,
    _b[colors_1.ColorAbbreviation.Yellow] = colors_1.ColorCode.Yellow,
    _b[colors_1.ColorAbbreviation.Red] = colors_1.ColorCode.Red,
    _b[colors_1.ColorAbbreviation.Orange] = colors_1.ColorCode.Orange,
    _b[colors_1.ColorAbbreviation.Blue] = colors_1.ColorCode.Blue,
    _b[colors_1.ColorAbbreviation.Green] = colors_1.ColorCode.Green,
    _b[colors_1.ColorAbbreviation.Purple] = colors_1.ColorCode.Purple,
    _b[colors_1.ColorAbbreviation.Pink] = colors_1.ColorCode.Pink,
    _b[colors_1.ColorAbbreviation.Transparent] = colors_1.ColorCode.Transparent,
    _b);
exports.FaceletAbbreviateToDefinition = {
    u: FaceletDefinition.Up,
    f: FaceletDefinition.Front,
    r: FaceletDefinition.Right,
    d: FaceletDefinition.Down,
    l: FaceletDefinition.Left,
    b: FaceletDefinition.Back,
    t: FaceletDefinition.Transparent,
    o: FaceletDefinition.Oriented,
    n: FaceletDefinition.Blank,
};
exports.FaceletToFace = (_c = {},
    _c[FaceletDefinition.Up] = constants_1.Face.U,
    _c[FaceletDefinition.Down] = constants_1.Face.D,
    _c[FaceletDefinition.Left] = constants_1.Face.L,
    _c[FaceletDefinition.Right] = constants_1.Face.R,
    _c[FaceletDefinition.Front] = constants_1.Face.F,
    _c[FaceletDefinition.Back] = constants_1.Face.B,
    _c);
exports.FaceletToColor = (_d = {},
    _d[FaceletDefinition.Oriented] = colors_1.ColorName.Gray,
    _d[FaceletDefinition.Blank] = colors_1.ColorCode.DarkGray,
    _d[FaceletDefinition.Transparent] = colors_1.ColorName.Transparent,
    _d);
var _a, _b, _c, _d;
