import { Face, AllFaces, ColorName } from "./../constants";
import { FaceRotations, rotateFaces } from "./../models/face-rotations";
import * as SVG from "svg.js";
import { ICubeOptions, CubeGeometry, FaceStickers } from "./../geometry/cube";
import { Vec3, transScale } from "../geometry/math";

/**
 * Utility methods for rendering cube geometry using svg.js
 */

// Rotation vectors to track visibility of each face
const defaultFaceRotations: FaceRotations = {
  [Face.U]: [0, -1, 0],
  [Face.R]: [1, 0, 0],
  [Face.F]: [0, 0, -1],
  [Face.D]: [0, 1, 1],
  [Face.L]: [-1, 0, 0],
  [Face.B]: [0, 0, 1]
};

export function renderCube(containerId: string, geometry: CubeGeometry, options: ICubeOptions) {
  let faceRotations = rotateFaces(defaultFaceRotations, options.viewportRotations);
  let renderOrder = getRenderOrder(faceRotations);
  let svg = SVG(containerId).size(options.width, options.height);
  svg.viewbox(
    options.viewbox.x,
    options.viewbox.y,
    options.viewbox.width,
    options.viewbox.height
  );

  let hiddenFaces = renderOrder.filter(face => !faceVisible(face, faceRotations));
  let visibleFaces = renderOrder.filter(face => faceVisible(face, faceRotations));

  renderBackground(svg, options);
  // Render hidden faces if cube color has transparency
  if (options.cubeOpacity < 100) {
    let cubeOutlineGroup = getCubeOutlineGroup(svg, options);
    hiddenFaces.forEach(face => {
      renderFaceStickers(svg, face, geometry[face], options);
      renderCubeOutline(cubeOutlineGroup, geometry[face], options);
    })
  }

  let cubeOutlineGroup = getCubeOutlineGroup(svg, options);
  visibleFaces.forEach(face => {
    renderCubeOutline(cubeOutlineGroup, geometry[face], options);
    renderFaceStickers(svg, face, geometry[face], options);
  });
}

/**
 * Determines face render order based on z position. Faces further away
 * will render first so anything closer will be drawn on top.
 */
function getRenderOrder(faceRotations: FaceRotations): Face[] {
  let renderOrder = [...AllFaces].sort((a: Face, b: Face) => {
    return faceRotations[b][2] - faceRotations[a][2]
  });
  return renderOrder;
}

function renderBackground(svg: SVG.Doc, options: ICubeOptions) {
  let backgroundSvg = svg.rect(options.viewbox.width, options.viewbox.height);
  backgroundSvg.x(options.viewbox.x);
  backgroundSvg.y(options.viewbox.y);
  backgroundSvg.fill({
    color: options.backgroundColor
  });
}

function faceVisible(face: Face, rotations: FaceRotations) {
  console.log('face visible', face,rotations[face][2], rotations[face][2] < -0.105);
  return rotations[face][2] < -0.105;
}

function getCubeOutlineGroup(svg: SVG.Doc, options: ICubeOptions): SVG.G {
  let cubeOutlineGroup = svg.group();
  cubeOutlineGroup.opacity(options.cubeOpacity/100)
  cubeOutlineGroup.attr({
    'stroke-width': '0.1',
    'stroke-linejoin': 'round',
  })
  return cubeOutlineGroup
}

function renderCubeOutline(svg: SVG.G, face: FaceStickers, options: ICubeOptions): SVG.Polygon {
  const cubeSize =  face.length - 1;
  const width = options.outlineWidth;
  let outlinePoints = [
    [face[0][0][0] * width, face[0][0][1] * width],
    [face[cubeSize][0][0] * width, face[cubeSize][0][1] * width],
    [face[cubeSize][cubeSize][0] * width, face[cubeSize][cubeSize][1] * width],
    [face[0][cubeSize][0] * width, face[0][cubeSize][1] * width],
  ];
  let polygon = svg.polygon(outlinePoints);
  polygon.fill(options.cubeColor);
  polygon.stroke(options.cubeColor);
  return polygon
}

function renderFaceStickers(svg: SVG.Doc, face: Face, stickers: FaceStickers, options: ICubeOptions): SVG.G {
  const cubeSize = stickers.length -1;
  let group = svg.group();
  group.opacity(options.stickerOpacity/100);
  group.attr({
    'stoke-opacity': '0.5',
    'stroke-width': options.strokeWidth,
    'stroke-linejoin': 'round'
  })

  for (let i = 0; i < cubeSize; i++) {
    for (let j = 0; j < cubeSize; j++) {
      let centerPoint: Vec3 = [
        (stickers[j][i][0] + stickers[j+1][i+1][0])/2,
        (stickers[j][i][1] + stickers[j+1][i+1][1])/2,
        0
      ];

      // Scale points in towards centre
      let p1 = transScale(stickers[j][i], centerPoint, .85);
      let p2 = transScale(stickers[j+1][i], centerPoint, .85);
      let p3 = transScale(stickers[j+1][i+1], centerPoint, .85);
      let p4 = transScale(stickers[j][i+1], centerPoint, .85);

      let color = getStickerColor(face, i, j, options);
      console.log(face, i, j, color);
      renderSticker(group, p1, p2, p3, p4, color, options.cubeColor, false);
    }
  }

  return group;
}

function renderSticker(g: SVG.G, p1: Vec3, p2: Vec3, p3: Vec3, p4: Vec3, stickerColor: string, cubeColor: string, transparent?: boolean): SVG.Polygon {
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
function getStickerColor(face: Face, row: number, col: number, options: ICubeOptions): string {
  if (!Array.isArray(options.stickerColors)) {
    return options.colorScheme[face] || ColorName.Black;
  }

  const faceIndex = AllFaces.indexOf(face);
  const stickerNumber = (row * options.cubeSize) + col;
  const colorIndex = faceIndex * (options.cubeSize * options.cubeSize) + stickerNumber;

  if (options.stickerColors.length <= colorIndex) {
    return ColorName.Black;
  }

  return options.stickerColors[colorIndex];
}