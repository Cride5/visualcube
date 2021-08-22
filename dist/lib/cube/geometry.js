"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Utlity Methods for creating 2D coodinates for svg polygons
 */
var constants_1 = require("./constants");
var math_1 = require("../math");
/**
 * Applies set of rotations to all face rotation vectors.
 */
function rotateFaces(faceRotations, rotations) {
    return constants_1.AllFaces.reduce(function (acc, face) {
        rotations.forEach(function (rotation) {
            if (!acc[face]) {
                acc[face] = faceRotations[face].slice();
            }
            acc[face] = math_1.rotate(acc[face], rotation[0], (Math.PI * rotation[1]) / 180);
        });
        return acc;
    }, {});
}
exports.rotateFaces = rotateFaces;
function makeStickerPosition(face, cubeSize, x, y) {
    switch (face) {
        case constants_1.Face.U:
            return [x, 0, cubeSize - y];
        case constants_1.Face.R:
            return [cubeSize, y, x];
        case constants_1.Face.F:
            return [x, y, 0];
        case constants_1.Face.D:
            return [x, cubeSize, y];
        case constants_1.Face.L:
            return [0, y, cubeSize - x];
        case constants_1.Face.B:
            return [cubeSize - x, y, cubeSize];
        default:
            throw new Error("Unknown cube face: '" + face + "'");
    }
}
exports.makeStickerPosition = makeStickerPosition;
/**
 * Creates 2D coordinates for stickers of a given face of the cube.
 */
function makeFaceStickers(face, options) {
    var stickers = math_1.makeMatrix(options.cubeSize + 1, options.cubeSize + 1);
    for (var row = 0; row <= options.cubeSize; row++) {
        var _loop_1 = function (col) {
            var sticker = makeStickerPosition(face, options.cubeSize, row, col);
            // Now scale and tranform point to ensure size/pos independent of dim
            var centerTranslation = [-options.cubeSize / 2, -options.cubeSize / 2, -options.cubeSize / 2];
            sticker = math_1.translate(sticker, centerTranslation);
            sticker = math_1.scale(sticker, 1 / options.cubeSize);
            // Rotate cube as per perameter settings
            options.viewportRotations.forEach(function (rotation) {
                sticker = math_1.rotate(sticker, rotation[0], (Math.PI * rotation[1]) / 180);
            });
            // Move cube away from viewer
            sticker = math_1.translate(sticker, [0, 0, options.dist]);
            // Finally project the 3D points onto 2D
            sticker = math_1.project(sticker, options.dist);
            stickers[row][col] = sticker;
        };
        for (var col = 0; col <= options.cubeSize; col++) {
            _loop_1(col);
        }
    }
    return stickers;
}
exports.makeFaceStickers = makeFaceStickers;
/**
 * Creates geometry for rubiks cube stickers. Contains 2D coordinates
 * for drawing svg polygons
 */
function makeCubeGeometry(options) {
    if (options.view === 'plan') {
        options.viewportRotations = [[math_1.Axis.X, -90]];
    }
    return constants_1.AllFaces.reduce(function (acc, face) {
        acc[face] = makeFaceStickers(face, options);
        return acc;
    }, {});
}
exports.makeCubeGeometry = makeCubeGeometry;
