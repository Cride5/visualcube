"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var colors_1 = require("./../../colors");
var constants_1 = require("../constants");
var color_1 = require("./color");
var stickerPattern = '([URFDLB])([0-9]+)';
var colorPattern = '(black|dgrey|grey|silver|white|yellow|red|orange|blue|green|purple|pink|[0-9a-fA-F]{6}|[0-9a-fA-F]{3})';
var arrowPattern = "^(" + stickerPattern + ")(" + stickerPattern + ")(" + stickerPattern + ")?(-s([0-9+]))?(-i([0-9+]))?(-" + colorPattern + ")?";
function parseArrows(raw) {
    if (typeof raw !== 'string') {
        return [];
    }
    return raw
        .split(',')
        .map(function (part) { return parseArrow(part); })
        .filter(function (arrow) { return !!arrow; });
}
exports.parseArrows = parseArrows;
function parseArrow(raw) {
    if (typeof raw !== 'string') {
        return null;
    }
    var arrowRegex = new RegExp(arrowPattern);
    var match = arrowRegex.exec(raw);
    if (!match) {
        return null;
    }
    return {
        s1: {
            face: constants_1.Face[match[2]],
            n: parseInt(match[3]),
        },
        s2: {
            face: constants_1.Face[match[5]],
            n: parseInt(match[6]),
        },
        s3: !match[7]
            ? undefined
            : {
                face: constants_1.Face[match[8]],
                n: parseInt(match[9]),
            },
        color: match[15] ? color_1.parseColor(match[15]) : colors_1.ColorCode.Gray,
        scale: match[11] ? parseInt(match[11]) : 10,
        influence: match[13] ? parseInt(match[13]) : 10,
    };
}
exports.parseArrow = parseArrow;
