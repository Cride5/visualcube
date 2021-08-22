"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var colors_1 = require("./../../colors");
var constants_1 = require("../../constants");
function parseColor(raw) {
    var colorcodeRegex = /^[0-9a-fA-F]{6}|[0-9a-fA-F]{3}/;
    // Append # for color codes
    if (colorcodeRegex.exec(raw)) {
        return "#" + raw;
    }
    if (constants_1.ColorAbbreviationToCode[raw]) {
        return constants_1.ColorAbbreviationToCode[raw];
    }
    if (constants_1.ColorNameToCode[raw]) {
        return constants_1.ColorNameToCode[raw];
    }
    // Default color
    return colors_1.ColorCode.Gray;
}
exports.parseColor = parseColor;
