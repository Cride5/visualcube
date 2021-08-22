"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var colors_1 = require("./../colors");
var constants_1 = require("./../constants");
var SVG = require("svg.js");
var geometry_1 = require("./geometry");
var math_1 = require("../math");
var constants_2 = require("./constants");
var arrow_1 = require("./parsing/arrow");
/**
 * Utility methods for rendering cube geometry using svg.js
 */
// Rotation vectors to track visibility of each face
var defaultFaceRotations = (_a = {},
    _a[constants_2.Face.U] = [0, -1, 0],
    _a[constants_2.Face.R] = [1, 0, 0],
    _a[constants_2.Face.F] = [0, 0, -1],
    _a[constants_2.Face.D] = [0, 1, 1],
    _a[constants_2.Face.L] = [-1, 0, 0],
    _a[constants_2.Face.B] = [0, 0, 1],
    _a);
function renderCube(container, geometry, options) {
    var faceRotations = geometry_1.rotateFaces(defaultFaceRotations, options.viewportRotations);
    var renderOrder = getRenderOrder(faceRotations);
    var svg = SVG(container).size(options.width, options.height);
    svg.viewbox(options.viewbox.x, options.viewbox.y, options.viewbox.width, options.viewbox.height);
    var hiddenFaces = renderOrder.filter(function (face) { return !faceVisible(face, faceRotations); });
    var visibleFaces = renderOrder.filter(function (face) { return faceVisible(face, faceRotations); });
    renderBackground(svg, options);
    // Render hidden faces if cube color has transparency
    if (options.cubeOpacity < 100) {
        var cubeOutlineGroup_1 = getCubeOutlineGroup(svg, options);
        hiddenFaces.forEach(function (face) {
            renderFaceStickers(svg, face, geometry[face], options);
            renderCubeOutline(cubeOutlineGroup_1, geometry[face], options);
        });
    }
    var cubeOutlineGroup = getCubeOutlineGroup(svg, options);
    visibleFaces.forEach(function (face) {
        renderCubeOutline(cubeOutlineGroup, geometry[face], options);
        renderFaceStickers(svg, face, geometry[face], options);
    });
    if (options.view === 'plan') {
        var ollGroup_1 = getOllLayerGroup(svg, options);
        [constants_2.Face.R, constants_2.Face.F, constants_2.Face.L, constants_2.Face.B].forEach(function (face) {
            renderOLLStickers(ollGroup_1, face, geometry[face], faceRotations, options);
        });
    }
    var arrowGroup = getArrowGroup(svg, geometry[0].length - 1);
    var arrowDefinitions = [];
    if (Array.isArray(options.arrows)) {
        arrowDefinitions = options.arrows;
    }
    else if (typeof options.arrows === 'string') {
        arrowDefinitions = arrow_1.parseArrows(options.arrows);
    }
    arrowDefinitions.forEach(function (arrow) {
        renderArrow(arrowGroup, geometry, arrow);
    });
}
exports.renderCube = renderCube;
/**
 * Determines face render order based on z position. Faces further away
 * will render first so anything closer will be drawn on top.
 */
function getRenderOrder(faceRotations) {
    var renderOrder = constants_2.AllFaces.slice().sort(function (a, b) {
        return faceRotations[b][2] - faceRotations[a][2];
    });
    return renderOrder;
}
function renderBackground(svg, options) {
    var backgroundSvg = svg.rect(options.viewbox.width, options.viewbox.height);
    backgroundSvg.x(options.viewbox.x);
    backgroundSvg.y(options.viewbox.y);
    if (!options.backgroundColor) {
        backgroundSvg.fill('none');
        backgroundSvg.opacity(0);
    }
    else {
        backgroundSvg.fill({
            color: options.backgroundColor,
        });
    }
}
function faceVisible(face, rotations) {
    return rotations[face][2] < -0.105;
}
function getCubeOutlineGroup(svg, options) {
    var cubeOutlineGroup = svg.group();
    cubeOutlineGroup.opacity(options.cubeOpacity / 100);
    cubeOutlineGroup.attr({
        'stroke-width': '0.1',
        'stroke-linejoin': 'round',
    });
    return cubeOutlineGroup;
}
function getOllLayerGroup(svg, options) {
    var group = svg.group();
    group.opacity(options.stickerOpacity / 100);
    group.attr({
        'stroke-opacity': '1',
        'stroke-width': 0.02,
        'stroke-linejoin': 'round',
    });
    return group;
}
function getArrowGroup(svg, cubeSize) {
    var arrowGroup = svg.group();
    arrowGroup.attr({
        opacity: 1,
        'stroke-opacity': 1,
        'stroke-width': 0.12 / cubeSize,
        'stroke-linecap': 'round',
    });
    return arrowGroup;
}
function renderCubeOutline(svg, face, options) {
    var cubeSize = face.length - 1;
    var width = options.outlineWidth;
    var outlinePoints = [
        [face[0][0][0] * width, face[0][0][1] * width],
        [face[cubeSize][0][0] * width, face[cubeSize][0][1] * width],
        [face[cubeSize][cubeSize][0] * width, face[cubeSize][cubeSize][1] * width],
        [face[0][cubeSize][0] * width, face[0][cubeSize][1] * width],
    ];
    var polygon = svg.polygon(outlinePoints);
    polygon.fill(options.cubeColor);
    polygon.stroke(options.cubeColor);
    return polygon;
}
function renderFaceStickers(svg, face, stickers, options) {
    var cubeSize = stickers.length - 1;
    var group = svg.group();
    group.opacity(options.stickerOpacity / 100);
    group.attr({
        'stoke-opacity': '0.5',
        'stroke-width': options.strokeWidth,
        'stroke-linejoin': 'round',
    });
    for (var i = 0; i < cubeSize; i++) {
        for (var j = 0; j < cubeSize; j++) {
            var centerPoint = [
                (stickers[j][i][0] + stickers[j + 1][i + 1][0]) / 2,
                (stickers[j][i][1] + stickers[j + 1][i + 1][1]) / 2,
                0,
            ];
            // Scale points in towards centre
            var p1 = math_1.transScale(stickers[j][i], centerPoint, 0.85);
            var p2 = math_1.transScale(stickers[j + 1][i], centerPoint, 0.85);
            var p3 = math_1.transScale(stickers[j + 1][i + 1], centerPoint, 0.85);
            var p4 = math_1.transScale(stickers[j][i + 1], centerPoint, 0.85);
            var color = getStickerColor(face, i, j, options);
            if (color !== colors_1.ColorName.Transparent) {
                renderSticker(group, p1, p2, p3, p4, color, options.cubeColor);
            }
        }
    }
    return group;
}
function renderSticker(g, p1, p2, p3, p4, stickerColor, cubeColor) {
    var stickerPoints = [[p1[0], p1[1]], [p2[0], p2[1]], [p3[0], p3[1]], [p4[0], p4[1]]];
    var polygon = g.polygon(stickerPoints);
    polygon.fill(stickerColor);
    polygon.stroke(cubeColor);
    return polygon;
}
/**
 * Starting with U, stickers are numbered from
 * their face starting with the top left corner
 * sticker.
 *
 * U Face
 * 1 | 2 | 3
 * ----------
 * 4 | 5 | 6
 * ----------
 * 7 | 8 | 9
 *
 * And so on for faces R, F, D, L, B.
 * So R's top left corner for a 3x3 cube would be # 10
 *
 * An individual sticker's color is obtained by indexing
 * into the array of sticker colors by the number the sticker is
 */
function getStickerColor(face, row, col, options) {
    var faceIndex = constants_2.AllFaces.indexOf(face);
    var stickerNumber = row * options.cubeSize + col;
    var colorIndex = faceIndex * (options.cubeSize * options.cubeSize) + stickerNumber;
    if (!Array.isArray(options.facelets) && Array.isArray(options.stickerColors)) {
        if (options.stickerColors.length <= colorIndex) {
            return colors_1.ColorName.Black;
        }
        return options.stickerColors[colorIndex];
    }
    else if (Array.isArray(options.facelets)) {
        if (options.facelets.length <= colorIndex) {
            return colors_1.ColorCode.DarkGray;
        }
        var fd = options.facelets[colorIndex];
        if (constants_1.FaceletToFace[fd] != null) {
            var face_1 = constants_1.FaceletToFace[fd];
            return options.colorScheme[face_1];
        }
        return constants_1.FaceletToColor[fd] || colors_1.ColorCode.DarkGray;
    }
    else {
        return options.colorScheme[face] || colors_1.ColorName.Black;
    }
}
// Renders the top rim of the R U L and B faces out from side of cube
function renderOLLStickers(group, face, stickers, rotations, options) {
    // Translation vector, to move faces out
    var v1 = math_1.scale(rotations[face], 0);
    var v2 = math_1.scale(rotations[face], 0.2);
    for (var i = 0; i < options.cubeSize; i++) {
        // find center point of sticker
        var centerPoint = [
            (stickers[i][0][0] + stickers[i + 1][1][0]) / 2,
            (stickers[i][0][1] + stickers[i + 1][1][1]) / 2,
            0,
        ];
        var p1 = math_1.translate(math_1.transScale(stickers[i][0], centerPoint, 0.94), v1);
        var p2 = math_1.translate(math_1.transScale(stickers[i + 1][0], centerPoint, 0.94), v1);
        var p3 = math_1.translate(math_1.transScale(stickers[i + 1][1], centerPoint, 0.94), v2);
        var p4 = math_1.translate(math_1.transScale(stickers[i][1], centerPoint, 0.94), v2);
        var stickerColor = getStickerColor(face, 0, i, options);
        if (stickerColor !== colors_1.ColorName.Transparent) {
            renderSticker(group, p1, p2, p3, p4, stickerColor, options.cubeColor);
        }
    }
}
exports.renderOLLStickers = renderOLLStickers;
/**
 * Generates svg for an arrow pointing from sticker s1 to s2
 */
function renderArrow(group, geometry, arrow) {
    var cubeSize = geometry[0].length - 1;
    // Find center point for each facelet
    var p1y = Math.floor(arrow.s1.n / cubeSize);
    var p1x = arrow.s1.n % cubeSize;
    var p1 = [
        (geometry[arrow.s1.face][p1x][p1y][0] + geometry[arrow.s1.face][p1x + 1][p1y + 1][0]) / 2,
        (geometry[arrow.s1.face][p1x][p1y][1] + geometry[arrow.s1.face][p1x + 1][p1y + 1][1]) / 2,
        0,
    ];
    var p2y = Math.floor(arrow.s2.n / cubeSize);
    var p2x = arrow.s2.n % cubeSize;
    var p2 = [
        (geometry[arrow.s1.face][p2x][p2y][0] + geometry[arrow.s1.face][p2x + 1][p2y + 1][0]) / 2,
        (geometry[arrow.s1.face][p2x][p2y][1] + geometry[arrow.s1.face][p2x + 1][p2y + 1][1]) / 2,
        0,
    ];
    // Find midpoint between p1 and p2
    var center = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2, 0];
    // Shorten arrows towards midpoint according to config
    p1 = math_1.transScale(p1, center, arrow.scale / 10);
    p2 = math_1.transScale(p2, center, arrow.scale / 10);
    var p3;
    if (arrow.s3) {
        var p3y = Math.floor(arrow.s3.n / cubeSize);
        var p3x = arrow.s3.n % cubeSize;
        p3 = [
            (geometry[arrow.s1.face][p3x][p3y][0] + geometry[arrow.s1.face][p3x + 1][p3y + 1][0]) / 2,
            (geometry[arrow.s1.face][p3x][p3y][1] + geometry[arrow.s1.face][p3x + 1][p3y + 1][1]) / 2,
            0,
        ];
        p3 = math_1.transScale(p3, center, arrow.influence / 5);
    }
    // Calculate arrow rotation
    var p_ = p3 ? p3 : p1;
    var rotation = p_[1] > p2[1] ? 270 : 90;
    if (p2[0] - p_[0] != 0) {
        rotation = math_1.radians2Degrees(Math.atan((p2[1] - p_[1]) / (p2[0] - p_[0])));
        rotation = p_[0] > p2[0] ? rotation + 180 : rotation;
    }
    // Draw line
    var lineSvg = group.path("M " + p1[0] + "," + p1[1] + " " + (p3 ? 'Q ' + p3[0] + ',' + p3[1] : 'L') + " " + p2[0] + "," + p2[1]);
    lineSvg.fill('none');
    lineSvg.stroke({
        color: arrow.color,
        opacity: 1,
    });
    // Draw arrow head
    var headSvg = group.path('M 5.77,0.0 L -2.88,5.0 L -2.88,-5.0 L 5.77,0.0 z');
    headSvg.attr({
        transform: "translate(" + p2[0] + "," + p2[1] + ") scale(" + 0.033 / cubeSize + ") rotate(" + rotation + ")",
    });
    headSvg.style({
        fill: arrow.color,
    });
    headSvg.attr({
        'stroke-width': 0,
        'stroke-linejoin': 'round',
    });
}
exports.renderArrow = renderArrow;
var _a;
