"use strict";
/**
 * Methods for manipulating points in 3d space (Vec3)
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Axis;
(function (Axis) {
    Axis[Axis["X"] = 0] = "X";
    Axis[Axis["Y"] = 1] = "Y";
    Axis[Axis["Z"] = 2] = "Z";
})(Axis = exports.Axis || (exports.Axis = {}));
function makeMatrix(rows, cols) {
    var matrix = [];
    for (var r = 0; r < rows; r++) {
        matrix[r] = [];
        for (var c = 0; c < cols; c++) {
            matrix[r][c] = null;
        }
    }
    return matrix;
}
exports.makeMatrix = makeMatrix;
function translate(pos, v) {
    return pos.map(function (value, index) { return value + v[index]; });
}
exports.translate = translate;
function scale(pos, scalar) {
    return pos.map(function (v) { return v * scalar; });
}
exports.scale = scale;
// Scale a point relative to position vector
function transScale(pos, v, scalar) {
    // Translate each facelet to cf
    var iv = v.map(function (x) { return -x; });
    return translate(scale(translate(pos, iv), scalar), v);
}
exports.transScale = transScale;
function rotate(pos, axis, radians) {
    var newPosition = pos.slice();
    switch (axis) {
        case Axis.X:
            newPosition[2] = pos[2] * Math.cos(radians) - pos[1] * Math.sin(radians);
            newPosition[1] = pos[2] * Math.sin(radians) + pos[1] * Math.cos(radians);
            break;
        case Axis.Y:
            newPosition[0] = pos[0] * Math.cos(radians) + pos[2] * Math.sin(radians);
            newPosition[2] = -pos[0] * Math.sin(radians) + pos[2] * Math.cos(radians);
            break;
        case Axis.Z:
            newPosition[0] = pos[0] * Math.cos(radians) - pos[1] * Math.sin(radians);
            newPosition[1] = pos[0] * Math.sin(radians) + pos[1] * Math.cos(radians);
            break;
    }
    return newPosition;
}
exports.rotate = rotate;
function project(pos, d) {
    return [
        (pos[0] * d) / pos[2],
        (pos[1] * d) / pos[2],
        pos[2],
    ];
}
exports.project = project;
function radians2Degrees(radians) {
    return (radians * 180) / Math.PI;
}
exports.radians2Degrees = radians2Degrees;
