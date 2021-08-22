"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = require("./color");
var constants_1 = require("../../constants");
var constants_2 = require("../constants");
function parseColorScheme(rawValue) {
    if (rawValue.indexOf(',') > -1) {
        return parseCommaSeparatedValues(rawValue);
    }
    else {
        return parseAbbreviations(rawValue);
    }
}
exports.parseColorScheme = parseColorScheme;
function parseAbbreviations(rawValue) {
    var scheme = {};
    if (rawValue.length < constants_2.AllFaces.length) {
        return constants_2.DefaultColorScheme;
    }
    constants_2.AllFaces.forEach(function (face, index) {
        if (rawValue.length > index) {
            scheme[face] = constants_1.ColorAbbreviationToCode[rawValue.charAt(index)];
        }
    });
    return scheme;
}
function parseCommaSeparatedValues(rawValue) {
    var scheme = {};
    // Parse as comma separated list of colors
    var rawColors = rawValue.split(',');
    if (rawColors.length < constants_2.AllFaces.length) {
        return constants_2.DefaultColorScheme;
    }
    constants_2.AllFaces.forEach(function (face, index) {
        if (rawColors.length > index) {
            var parsedColor = color_1.parseColor(rawColors[index]);
            var colorCode = constants_1.ColorNameToCode[parsedColor] || parsedColor;
            if (parsedColor) {
                scheme[face] = colorCode;
            }
        }
    });
    return scheme;
}
