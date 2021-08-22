"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var colors_1 = require("./../colors");
var masking_1 = require("./masking");
var simulation_1 = require("./simulation");
var algorithm_1 = require("./parsing/algorithm");
var constants_1 = require("./constants");
function makeStickerColors(options) {
    var stickerColors = options.stickerColors;
    var mask = options.mask ? masking_1.makeMasking(options.mask, options.cubeSize) : null;
    if (mask && options.maskAlg) {
        var maskCubeData_1 = new simulation_1.CubeData(options.cubeSize, mask);
        var alg_1 = algorithm_1.parseAlgorithm(options.maskAlg);
        alg_1.forEach(function (turn) {
            maskCubeData_1.turn(turn);
        });
        mask = maskCubeData_1.faces;
    }
    // Fill with color scheme if sticker colors not predefined.
    if (!stickerColors) {
        stickerColors = [].concat.apply([], constants_1.AllFaces.map(function (face) {
            return Array.apply(null, Array(options.cubeSize * options.cubeSize)).map(function () { return options.colorScheme[face]; });
        }));
    }
    var faceMappedStickers = constants_1.AllFaces.reduce(function (acc, face) {
        if (!acc[face])
            acc[face] = [];
        for (var i = 0; i < options.cubeSize; i++) {
            for (var j = 0; j < options.cubeSize; j++) {
                var faceIndex = constants_1.AllFaces.indexOf(face);
                var stickerNumber = i * options.cubeSize + j;
                var colorIndex = faceIndex * (options.cubeSize * options.cubeSize) + stickerNumber;
                if (stickerColors.length <= colorIndex) {
                    acc[face][options.cubeSize * i + j] = colors_1.ColorName.Black;
                }
                else {
                    acc[face][options.cubeSize * i + j] = stickerColors[colorIndex];
                }
                if (mask && !mask[face][options.cubeSize * i + j]) {
                    acc[face][options.cubeSize * i + j] = colors_1.ColorCode.DarkGray;
                }
            }
        }
        return acc;
    }, {});
    // Apply Algorithm
    var cubeData = new simulation_1.CubeData(options.cubeSize, faceMappedStickers);
    var alg = [];
    if (options.case) {
        alg = algorithm_1.parseCase(options.case);
    }
    else if (options.algorithm) {
        alg = algorithm_1.parseAlgorithm(options.algorithm);
    }
    alg.forEach(function (move) {
        cubeData.turn(move);
    });
    return [].concat.apply([], constants_1.AllFaces.map(function (face) { return cubeData.faces[face].slice(); }));
}
exports.makeStickerColors = makeStickerColors;
