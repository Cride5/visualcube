"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
function parseRotationSequence(rawSequence) {
    var rotationRegex = /([xyz]-?[0-9][0-9]?[0-9]?)/g;
    var match;
    var rotations = [];
    do {
        match = rotationRegex.exec(rawSequence);
        if (match) {
            var matchText = match[0];
            var axisSymbol = matchText.charAt(0);
            var value = matchText.substr(1);
            var axis = constants_1.AxisSymbolToAxis[axisSymbol];
            rotations.push([axis, parseInt(value)]);
        }
    } while (match);
    return rotations;
}
exports.parseRotationSequence = parseRotationSequence;
