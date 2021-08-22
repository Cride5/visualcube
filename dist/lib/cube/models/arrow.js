"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Arrow = /** @class */ (function () {
    function Arrow(s1, s2, color, s3, scale, influence) {
        this.scale = 10; // Var range = 0 to 20, default 10
        this.influence = 10; // Var range = 0 to 50, default 10
        this.s1 = s1;
        this.s2 = s2;
        this.color = color;
        if (scale) {
            this.scale = scale;
        }
        if (influence) {
            this.influence = influence;
        }
        if (s3) {
            this.s3 = s3;
        }
    }
    return Arrow;
}());
exports.Arrow = Arrow;
