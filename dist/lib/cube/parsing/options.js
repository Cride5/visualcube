"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rotation_1 = require("./rotation");
var faceletColors_1 = require("./faceletColors");
var colorScheme_1 = require("./colorScheme");
var faceletDefinitions_1 = require("./faceletDefinitions");
/**
 * Utility methods for parsing the old query param style options
 */
function parseOptions(rawOptions) {
    var options = {};
    var params = parseQuery(rawOptions);
    Object.keys(params).forEach(function (key) {
        var paramValue = params[key];
        switch (key) {
            case 'pzl':
                options.cubeSize = parseInt(paramValue) || 3;
                break;
            case 'size':
                var size = parseInt(paramValue) || 250;
                options.width = size;
                options.height = size;
                break;
            case 'view':
                options.view = paramValue;
                break;
            case 'stage':
                options.mask = paramValue;
                break;
            case 'r':
                options.viewportRotations = rotation_1.parseRotationSequence(paramValue);
                break;
            case 'alg':
                options.algorithm = paramValue;
                break;
            case 'case':
                options.case = paramValue;
                break;
            case 'fc':
                options.stickerColors = faceletColors_1.parseFaceletColors(paramValue);
                break;
            case 'sch':
                options.colorScheme = colorScheme_1.parseColorScheme(paramValue);
                break;
            case 'bg':
                options.backgroundColor = paramValue;
                break;
            case 'cc':
                options.cubeColor = paramValue;
                break;
            case 'co':
                options.cubeOpacity = parseInt(paramValue) || 100;
                break;
            case 'fo':
                options.stickerOpacity = parseInt(paramValue) || 100;
                break;
            case 'dist':
                options.dist = parseInt(paramValue) || 5;
                break;
            case 'arw':
                options.arrows = paramValue;
                break;
            case 'fd':
                options.facelets = faceletDefinitions_1.parseFaceletDefinitions(paramValue);
                break;
            case 'ac':
                // TODO: Support default arrow color
                console.warn("Currently param 'ac' is unsupported");
                break;
        }
    });
    return options;
}
exports.parseOptions = parseOptions;
function parseQuery(url) {
    var queryString = url.indexOf('?') > -1 ? url.substr(url.indexOf('?') + 1) : url;
    var query = {};
    var pairs = queryString.split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}
