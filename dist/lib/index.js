"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var colors_1 = require("./colors");
var geometry_1 = require("./cube/geometry");
var math_1 = require("./math");
var drawing_1 = require("./cube/drawing");
var constants_1 = require("./cube/constants");
var stickers_1 = require("./cube/stickers");
var options_1 = require("./cube/parsing/options");
var faceletDefinitions_1 = require("./cube/parsing/faceletDefinitions");
var constants_2 = require("./cube/constants");
exports.Masking = constants_2.Masking;
exports.Face = constants_2.Face;
var math_2 = require("./math");
exports.Axis = math_2.Axis;
var sticker_1 = require("./cube/models/sticker");
exports.StickerDefinition = sticker_1.StickerDefinition;
var arrow_1 = require("./cube/models/arrow");
exports.Arrow = arrow_1.Arrow;
var defaultOptions = {
    cubeSize: 3,
    width: 128,
    height: 128,
    viewportRotations: [[math_1.Axis.Y, 45], [math_1.Axis.X, -34]],
    colorScheme: constants_1.DefaultColorScheme,
    cubeColor: colors_1.ColorName.Black,
    cubeOpacity: 100,
    stickerOpacity: 100,
    dist: 5,
    outlineWidth: 0.94,
    strokeWidth: 0,
    viewbox: {
        x: -0.9,
        y: -0.9,
        width: 1.8,
        height: 1.8,
    },
};
function cubeSVG(container, extraOptions) {
    if (extraOptions === void 0) {
        extraOptions = {};
    }
    var options = getOptions(defaultOptions, extraOptions);
    var geomety = geometry_1.makeCubeGeometry(options);
    options.stickerColors = stickers_1.makeStickerColors(options);
    drawing_1.renderCube(container, geomety, options);
}
exports.cubeSVG = cubeSVG;
function cubePNG(container, extraOptions) {
    if (extraOptions === void 0) {
        extraOptions = {};
    }
    var element = document.createElement('div');
    var options = getOptions(defaultOptions, extraOptions);
    cubeSVG(element, options);
    setTimeout(function () {
        var svgElement = element.querySelector('svg');
        var targetImage = document.createElement('img'); // Where to draw the result
        container.appendChild(targetImage);
        var can = document.createElement('canvas'); // Not shown on page
        var ctx = can.getContext('2d');
        var loader = new Image(); // Not shown on page
        loader.width = can.width = targetImage.width = options.width || 128;
        loader.height = can.height = targetImage.height = options.height || 128;
        loader.onload = function () {
            ctx.drawImage(loader, 0, 0, loader.width, loader.height);
            targetImage.src = can.toDataURL();
        };
        var svgAsXML = new XMLSerializer().serializeToString(svgElement);
        loader.src = 'data:image/svg+xml,' + encodeURIComponent(svgAsXML);
    });
}
exports.cubePNG = cubePNG;
function getOptions(defaultOptions, extraOptions) {
    var parsedOptions;
    if (typeof extraOptions === 'string') {
        parsedOptions = options_1.parseOptions(extraOptions);
    }
    else {
        parsedOptions = extraOptions;
    }
    if (typeof parsedOptions.facelets === 'string') {
        parsedOptions.facelets = faceletDefinitions_1.parseFaceletDefinitions(parsedOptions.facelets);
    }
    return __assign({}, defaultOptions, parsedOptions);
}
