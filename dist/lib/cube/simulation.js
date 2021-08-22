"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var math_1 = require("./../math");
var constants_1 = require("./constants");
var TurnType;
(function (TurnType) {
    TurnType[TurnType["Clockwise"] = 0] = "Clockwise";
    TurnType[TurnType["CounterClockwise"] = 1] = "CounterClockwise";
    TurnType[TurnType["Double"] = 2] = "Double";
})(TurnType = exports.TurnType || (exports.TurnType = {}));
var faceIdentity = function (stickerNumber, cubeSize) { return stickerNumber; };
var counterClockwiseSticker = function (stickerNumber, cubeSize) {
    return (stickerNumber * cubeSize) % (cubeSize * cubeSize + 1);
};
var clockwiseSticker = function (stickerNumber, cubeSize) {
    var numStickers = cubeSize * cubeSize;
    return numStickers + 1 - counterClockwiseSticker(stickerNumber, cubeSize);
};
var doubleTurn = function (stickerNumber, cubeSize) {
    return cubeSize * cubeSize - stickerNumber + 1;
};
var OppositeTurn = (_a = {},
    _a[TurnType.Clockwise] = TurnType.CounterClockwise,
    _a[TurnType.CounterClockwise] = TurnType.Clockwise,
    _a[TurnType.Double] = TurnType.Double,
    _a);
// Faces that wrap around a given axis
var AxisMapping = (_b = {},
    _b[math_1.Axis.X] = [constants_1.Face.U, constants_1.Face.B, constants_1.Face.F, constants_1.Face.D],
    _b[math_1.Axis.Y] = [constants_1.Face.L, constants_1.Face.B, constants_1.Face.R, constants_1.Face.F],
    _b[math_1.Axis.Z] = [constants_1.Face.L, constants_1.Face.U, constants_1.Face.R, constants_1.Face.D],
    _b);
// Face's orientation related to other faces on a given axis
var AxisOrientation = (_c = {},
    _c[math_1.Axis.X] = (_d = {},
        _d[constants_1.Face.U] = faceIdentity,
        _d[constants_1.Face.B] = doubleTurn,
        _d[constants_1.Face.F] = faceIdentity,
        _d[constants_1.Face.D] = faceIdentity,
        _d[constants_1.Face.L] = null,
        _d[constants_1.Face.R] = null,
        _d),
    _c[math_1.Axis.Y] = (_e = {},
        _e[constants_1.Face.U] = null,
        _e[constants_1.Face.B] = counterClockwiseSticker,
        _e[constants_1.Face.F] = counterClockwiseSticker,
        _e[constants_1.Face.D] = null,
        _e[constants_1.Face.L] = counterClockwiseSticker,
        _e[constants_1.Face.R] = counterClockwiseSticker,
        _e),
    _c[math_1.Axis.Z] = (_f = {},
        _f[constants_1.Face.U] = counterClockwiseSticker,
        _f[constants_1.Face.B] = null,
        _f[constants_1.Face.F] = null,
        _f[constants_1.Face.D] = clockwiseSticker,
        _f[constants_1.Face.L] = faceIdentity,
        _f[constants_1.Face.R] = doubleTurn,
        _f),
    _c);
var CubeData = /** @class */ (function () {
    function CubeData(cubeSize, initialValues) {
        this.cubeSize = cubeSize;
        /**
         *  Data to store face value
         *  data saved in flat array [1, 2, 3, 4, 5, 6, 7, 8, 9]
         *  maps to cube stickers like this
         *
         *  U Face
         *  1 | 2 | 3
         *  ----------
         *  4 | 5 | 6
         *  ----------
         *  7 | 8 | 9
         *
         *  Stickers are numbered in that manner starting with the U face
         *  continuing with this order U, R, F, D, L, B
         *
         *  Because each face has a differen't orientation it may not be clear
         *  how the back faces are numbered. Below is an example 3x3 mapping
         *
         *  Example numbers of 3x3 cube. nxn cubes follow the same pattern
         *
         *        B
         *      L U R
         *        F
         *        D
         *                  | 54  | 53  | 52  |
         *                   -----------------
         *                  | 51  | 50  | 49  |
         *                   -----------------
         *                  | 48  | 47  | 46  |
         * -----------------                   -----------------
         *  43  | 40  | 37     1  |  2  |  3    12  | 15  | 18
         * ----------------- ----------------- -----------------
         *  44  | 41  | 38     4  |  5  |  6    11  | 14  | 17
         * ----------------- ----------------- -----------------
         *  45  | 42  | 39     7  |  8  |  9    10  | 13  | 16
         * -----------------                   -----------------
         *                  | 19  | 20  | 21  |
         *                   -----------------
         *                  | 22  | 23  | 24  |
         *                   -----------------
         *                  | 25  | 26  | 27  |
         *
         *                  | 28  | 29  | 30  |
         *                   -----------------
         *                  | 31  | 32  | 33  |
         *                   -----------------
         *                  | 34  | 35  | 36  |
         */
        this.faces = {};
        this.numStickers = this.cubeSize * this.cubeSize;
        this.clockwiseMapping = [];
        this.counterClockwiseMapping = [];
        this.doubleMapping = [];
        this.faces = initialValues;
        if (!this.faces) {
            this.initValues();
        }
        for (var i = 1; i <= this.numStickers; i++) {
            this.clockwiseMapping.push(clockwiseSticker(i, cubeSize));
            this.counterClockwiseMapping.push(counterClockwiseSticker(i, cubeSize));
            this.doubleMapping.push(doubleTurn(i, cubeSize));
        }
    }
    CubeData.prototype.initValues = function () {
        var _this = this;
        var currentValue = 1;
        constants_1.AllFaces.forEach(function (face) {
            _this.faces[face] = [];
            for (var i = 0; i < _this.numStickers; i++) {
                _this.faces[face].push(currentValue++);
            }
        });
    };
    /**
     * Rotates values on an outer face of the rubiks cubes
     */
    CubeData.prototype.rotateFace = function (face, turn) {
        var _this = this;
        // TODO more efficient rotation to not construct so many new arrays
        switch (turn) {
            case TurnType.Clockwise:
                this.faces[face] = this.clockwiseMapping.map(function (newStickerNumber) { return _this.faces[face][newStickerNumber - 1]; });
                break;
            case TurnType.CounterClockwise:
                this.faces[face] = this.counterClockwiseMapping.map(function (newStickerNumber) { return _this.faces[face][newStickerNumber - 1]; });
                break;
            case TurnType.Double:
                this.faces[face].reverse();
                break;
        }
    };
    /**
     * Rotates layer values around a given axis
     */
    CubeData.prototype.axisRotation = function (offset, range, axis, faceOrder, forward, double) {
        var _this = this;
        if (forward === void 0) { forward = true; }
        if (double === void 0) { double = false; }
        if (!forward) {
            faceOrder.reverse();
        }
        // Copy original values to avoid clobbering values when modifying stickers
        var originalValues = faceOrder.map(function (face) { return _this.faces[face].slice(); });
        // Copy values
        for (var i = 0; i < this.cubeSize; i++) {
            for (var r = 0; r < range; r++) {
                var stickerIndex = this.cubeSize * i + (offset + r);
                for (var j = 0; j < faceOrder.length; j++) {
                    var face = faceOrder[j];
                    var nextFace = double ? faceOrder[(j + 2) % faceOrder.length] : faceOrder[(j + 1) % faceOrder.length];
                    var valueIndex = AxisOrientation[axis][face](stickerIndex + 1, this.cubeSize) - 1;
                    var nextFaceValueIndex = AxisOrientation[axis][nextFace](stickerIndex + 1, this.cubeSize) - 1;
                    this.faces[face][valueIndex] =
                        originalValues[(double ? j + 2 : j + 1) % originalValues.length][nextFaceValueIndex];
                }
            }
        }
    };
    /**
     * Rotate layers around the x axis of the cube
     */
    CubeData.prototype.xLayersRotation = function (offset, forward, double, range) {
        if (forward === void 0) { forward = true; }
        if (double === void 0) { double = false; }
        if (range === void 0) { range = 1; }
        var faceOrder = [constants_1.Face.U, constants_1.Face.F, constants_1.Face.D, constants_1.Face.B];
        this.axisRotation(offset, range, math_1.Axis.X, faceOrder, forward, double);
    };
    /**
     * Rotate layers around the y axis of the cube
     */
    CubeData.prototype.yLayersRotation = function (offset, forward, double, range) {
        if (forward === void 0) { forward = true; }
        if (double === void 0) { double = false; }
        if (range === void 0) { range = 1; }
        var faceOrder = [constants_1.Face.L, constants_1.Face.F, constants_1.Face.R, constants_1.Face.B];
        this.axisRotation(offset, range, math_1.Axis.Y, faceOrder, forward, double);
    };
    /**
     * Rotate layers around the z axis of the cube
     */
    CubeData.prototype.zLayersRotation = function (offset, forward, double, range) {
        if (forward === void 0) { forward = true; }
        if (double === void 0) { double = false; }
        if (range === void 0) { range = 1; }
        var faceOrder = [constants_1.Face.U, constants_1.Face.L, constants_1.Face.D, constants_1.Face.R];
        this.axisRotation(offset, range, math_1.Axis.Z, faceOrder, forward, double);
    };
    /**
     * Restricts the number of slices used in outer block moves to the cube size
     */
    CubeData.prototype.safeSlices = function (n) {
        return n > this.cubeSize ? this.cubeSize : n;
    };
    CubeData.prototype.rTurn = function (turnType, slices) {
        if (slices === void 0) { slices = 1; }
        this.rotateFace(constants_1.Face.R, turnType);
        var offset = this.cubeSize - slices;
        this.xLayersRotation(offset, turnType === TurnType.Clockwise, turnType === TurnType.Double, slices);
    };
    CubeData.prototype.lTurn = function (turnType, slices) {
        if (slices === void 0) { slices = 1; }
        this.rotateFace(constants_1.Face.L, turnType);
        this.xLayersRotation(0, turnType === TurnType.CounterClockwise, turnType === TurnType.Double, slices);
    };
    CubeData.prototype.uTurn = function (turnType, slices) {
        if (slices === void 0) { slices = 1; }
        this.rotateFace(constants_1.Face.U, turnType);
        this.yLayersRotation(0, turnType === TurnType.Clockwise, turnType === TurnType.Double, slices);
    };
    CubeData.prototype.dTurn = function (turnType, slices) {
        if (slices === void 0) { slices = 1; }
        this.rotateFace(constants_1.Face.D, turnType);
        var offset = this.cubeSize - slices;
        this.yLayersRotation(offset, turnType === TurnType.CounterClockwise, turnType === TurnType.Double, slices);
    };
    CubeData.prototype.fTurn = function (turnType, slices) {
        if (slices === void 0) { slices = 1; }
        this.rotateFace(constants_1.Face.F, turnType);
        var offset = this.cubeSize - slices;
        this.zLayersRotation(offset, turnType === TurnType.Clockwise, turnType === TurnType.Double, slices);
    };
    CubeData.prototype.bTurn = function (turnType, slices) {
        if (slices === void 0) { slices = 1; }
        this.rotateFace(constants_1.Face.B, turnType);
        this.zLayersRotation(0, turnType === TurnType.CounterClockwise, turnType === TurnType.Double, slices);
    };
    CubeData.prototype.mTurn = function (turnType) {
        if (this.cubeSize < 2)
            return;
        this.xLayersRotation(1, turnType === TurnType.CounterClockwise, turnType === TurnType.Double, this.cubeSize - 2);
    };
    CubeData.prototype.eTurn = function (turnType) {
        if (this.cubeSize < 2)
            return;
        this.yLayersRotation(1, turnType === TurnType.CounterClockwise, turnType === TurnType.Double, this.cubeSize - 2);
    };
    CubeData.prototype.sTurn = function (turnType) {
        if (this.cubeSize < 2)
            return;
        this.zLayersRotation(1, turnType === TurnType.Clockwise, turnType === TurnType.Double, this.cubeSize - 2);
    };
    CubeData.prototype.xTurn = function (turnType) {
        this.rotateFace(constants_1.Face.R, turnType);
        this.rotateFace(constants_1.Face.L, OppositeTurn[turnType]);
        this.xLayersRotation(0, turnType === TurnType.Clockwise, turnType === TurnType.Double, this.cubeSize);
    };
    CubeData.prototype.yTurn = function (turnType) {
        this.rotateFace(constants_1.Face.U, turnType);
        this.rotateFace(constants_1.Face.D, OppositeTurn[turnType]);
        this.yLayersRotation(0, turnType === TurnType.Clockwise, turnType === TurnType.Double, this.cubeSize);
    };
    CubeData.prototype.zTurn = function (turnType) {
        this.rotateFace(constants_1.Face.F, turnType);
        this.rotateFace(constants_1.Face.B, OppositeTurn[turnType]);
        this.zLayersRotation(0, turnType === TurnType.Clockwise, turnType === TurnType.Double, this.cubeSize);
    };
    CubeData.prototype.turn = function (turn) {
        var slices = this.safeSlices(turn.slices);
        switch (turn.move) {
            case constants_1.AlgorithmUnit.F:
                this.fTurn(turn.turnType, slices);
                break;
            case constants_1.AlgorithmUnit.B:
                this.bTurn(turn.turnType, slices);
                break;
            case constants_1.AlgorithmUnit.U:
                this.uTurn(turn.turnType, slices);
                break;
            case constants_1.AlgorithmUnit.D:
                this.dTurn(turn.turnType, slices);
                break;
            case constants_1.AlgorithmUnit.R:
                this.rTurn(turn.turnType, slices);
                break;
            case constants_1.AlgorithmUnit.L:
                this.lTurn(turn.turnType, slices);
                break;
            case constants_1.AlgorithmUnit.M:
                this.mTurn(turn.turnType);
                break;
            case constants_1.AlgorithmUnit.E:
                this.eTurn(turn.turnType);
                break;
            case constants_1.AlgorithmUnit.S:
                this.sTurn(turn.turnType);
                break;
            case constants_1.AlgorithmUnit.X:
                this.xTurn(turn.turnType);
                break;
            case constants_1.AlgorithmUnit.Y:
                this.yTurn(turn.turnType);
                break;
            case constants_1.AlgorithmUnit.Z:
                this.zTurn(turn.turnType);
                break;
            default:
                throw new Error("Unrecognized move in turn " + JSON.stringify(turn));
        }
    };
    return CubeData;
}());
exports.CubeData = CubeData;
var _a, _b, _c, _d, _e, _f;
