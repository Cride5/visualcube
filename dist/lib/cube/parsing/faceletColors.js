"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = require("./color");
var constants_1 = require("../../constants");
function parseFaceletColors(rawValue) {
    var colors = [];
    if (rawValue.indexOf(',') > -1) {
        // Parse as comma separated colors
        rawValue.split(',').forEach(function (value) {
            var parsed = color_1.parseColor(value);
            if (parsed) {
                colors.push(parsed);
            }
        });
    }
    else {
        // parse as abbreviations (ex 'yyyyyyyyyrrrrrrrrrbbbbbbbbb....')
        for (var i = 0; i < rawValue.length; i++) {
            colors.push(constants_1.ColorAbbreviationToCode[rawValue.charAt(i)]);
        }
    }
    return colors;
}
exports.parseFaceletColors = parseFaceletColors;
