"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./../constants");
var simulation_1 = require("../simulation");
var constants_2 = require("../constants");
var turnRegex = /([2-9]+)?([UuFfRrDdLlBbMESxyz])(w)?([2\'])?/g;
var Opposite = (_a = {},
    _a[simulation_1.TurnType.Clockwise] = simulation_1.TurnType.CounterClockwise,
    _a[simulation_1.TurnType.CounterClockwise] = simulation_1.TurnType.Clockwise,
    _a[simulation_1.TurnType.Double] = simulation_1.TurnType.Double,
    _a);
/**
 * Takes in an algorithm string and parses the turns from it
 * algorithm string format should be moves separated by a single space
 * (ex. "U R2 L' x")
 *
 * https://www.worldcubeassociation.org/regulations/#article-12-notation
 */
function parseAlgorithm(algorithm) {
    if (!algorithm) {
        return [];
    }
    var turns = [];
    var match;
    do {
        match = turnRegex.exec(algorithm);
        if (match) {
            var rawSlices = match[1];
            var rawFace = match[2];
            var outerBlockIndicator = match[3];
            var rawType = match[4] || constants_2.TurnAbbreviation.Clockwise; // Default to clockwise
            var isLowerCaseMove = rawFace === rawFace.toLowerCase() && constants_1.cubeRotations.indexOf(rawFace) === -1;
            if (isLowerCaseMove) {
                rawFace = rawFace.toUpperCase();
            }
            var turn = {
                move: getMove(rawFace),
                turnType: getTurnType(rawType),
                slices: isLowerCaseMove ? 2 : getSlices(rawSlices, outerBlockIndicator),
            };
            turns.push(turn);
        }
    } while (match);
    return turns;
}
exports.parseAlgorithm = parseAlgorithm;
function parseCase(algorithm) {
    return parseAlgorithm(algorithm)
        .map(function (turn) {
        return {
            turnType: Opposite[turn.turnType],
            move: turn.move,
            slices: turn.slices,
        };
    })
        .reverse();
}
exports.parseCase = parseCase;
function getSlices(rawSlices, outerBlockIndicator) {
    if (outerBlockIndicator && !rawSlices) {
        return 2;
    }
    else if (!outerBlockIndicator && rawSlices) {
        throw new Error("Invalid move: Cannot specify num slices if outer block move indicator 'w' is not present");
    }
    else if (!outerBlockIndicator && !rawSlices) {
        return 1;
    }
    else {
        return parseInt(rawSlices);
    }
}
function getMove(rawFace) {
    if (constants_2.possibleMoves.indexOf(rawFace) < 0) {
        throw new Error("Invalid move (" + rawFace + "): Possible turn faces are [U R F L D B M E S x y z]");
    }
    else
        return rawFace;
}
function getTurnType(rawType) {
    switch (rawType) {
        case constants_2.TurnAbbreviation.Clockwise:
            return simulation_1.TurnType.Clockwise;
        case constants_2.TurnAbbreviation.CounterClockwise:
            return simulation_1.TurnType.CounterClockwise;
        case constants_2.TurnAbbreviation.Double:
            return simulation_1.TurnType.Double;
        default:
            throw new Error("Invalid move modifier (" + rawType + ")");
    }
}
var _a;
