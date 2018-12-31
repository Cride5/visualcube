import { Face } from './constants';
import { FaceStickers } from './geometry/generator';
import { FaceRotations } from './models/face-rotations';
import * as SVG from 'svg.js';
import { Vec3, transScale } from './geometry/math';

export function faceVisible(face: Face, rotations: FaceRotations) {
  return rotations[face][2] < -0.105;
}

export function outlineSvg(svg: SVG.Doc, color: string, opacity: number, width: number, face: FaceStickers): SVG.Polygon {
  const cubeSize =  face.length - 1;
  let outlinePoints = [
    [face[0][0][0] * width, face[0][0][1] * width],
    [face[cubeSize][0][0] * width, face[cubeSize][0][1] * width],
    [face[cubeSize][cubeSize][0] * width, face[cubeSize][cubeSize][1] * width],
    [face[0][cubeSize][0] * width, face[0][cubeSize][1] * width],
  ];
  let polygon = svg.polygon(outlinePoints);
  polygon.fill(color);
  polygon.stroke(color);
  polygon.attr({
    'stroke-width': '0.1',
    'stroke-linejoin': 'round',
    'opacity': `${opacity/100}`
  })
  return polygon
}

export function faceStickersSvg(svg: SVG.Doc, face: FaceStickers, opacity: number, strokeWidth: number, stickerColor: string, cubeColor: string, transparent?: boolean): SVG.G {
  const cubeSize = face.length -1;
  let group = svg.group();
  group.opacity(opacity/100);
  group.attr({
    'stoke-opacity': '0.5',
    'stroke-width': strokeWidth,
    'stroke-linejoin': 'round'
  })

  for (let i = 0; i < cubeSize; i++) {
    for (let j = 0; j < cubeSize; j++) {
      let centerPoint: Vec3 = [
        (face[j][i][0] + face[j+1][i+1][0])/2,
        (face[j][i][1] + face[j+1][i+1][1])/2,
        0
      ];
      console.log(face[j][i], centerPoint);

      // Scale points in towards centre
      let p1 = transScale(face[j][i], centerPoint, .85);
      let p2 = transScale(face[j+1][i], centerPoint, .85);
      let p3 = transScale(face[j+1][i+1], centerPoint, .85);
      let p4 = transScale(face[j][i+1], centerPoint, .85);

      stickerSvg(group, p1, p2, p3, p4, stickerColor, cubeColor, transparent);
    }
  }

  return group;
}

function stickerSvg(g: SVG.G, p1: Vec3, p2: Vec3, p3: Vec3, p4: Vec3, stickerColor: string, cubeColor: string, transparent?: boolean): SVG.Polygon {
  let stickerPoints = [
    [p1[0], p1[1]],
    [p2[0], p2[1]],
    [p3[0], p3[1]],
    [p4[0], p4[1]],
  ];
  let polygon = g.polygon(stickerPoints);
  polygon.fill(stickerColor);
  polygon.stroke(cubeColor);
  if (transparent) {
    polygon.opacity(0);
  }
  return polygon;
}