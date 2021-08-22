import { ColorName } from './colors';
import { makeCubeGeometry } from './cube/geometry'
import { Axis } from './math'
import { renderCube } from './cube/drawing'
import { ICubeOptions } from './cube/options'
import { DefaultColorScheme, Masking as M } from './cube/constants'
import { makeStickerColors } from './cube/stickers'
import { parseOptions } from './cube/parsing/options'
import { parseFaceletDefinitions } from './cube/parsing/faceletDefinitions'

export { Masking, Face } from './cube/constants';
export { Axis } from './math';
export { StickerDefinition } from './cube/models/sticker';
export { Arrow } from './cube/models/arrow';
export { ICubeOptions } from './cube/options';

const defaultOptions: ICubeOptions = {
  cubeSize: 3,
  width: 128,
  height: 128,
  viewportRotations: [[Axis.Y, 45], [Axis.X, -34]],
  colorScheme: DefaultColorScheme,
  cubeColor: ColorName.Black,
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
}

export function cubeSVG(container: HTMLElement | string, extraOptions?: ICubeOptions) {
  if (extraOptions === void 0) { extraOptions = {}; }
  let options = getOptions(defaultOptions, extraOptions)
  let geomety = makeCubeGeometry(options)
  options.stickerColors = makeStickerColors(options)

  renderCube(container, geomety, options)
}

export function cubePNG(container: HTMLElement, extraOptions?: ICubeOptions) {
  if (extraOptions === void 0) { extraOptions = {}; }
  let element = document.createElement('div')
  let options = getOptions(defaultOptions, extraOptions)
  cubeSVG(element, options)

  setTimeout(() => {
    let svgElement = element.querySelector('svg')
    let targetImage = document.createElement('img') // Where to draw the result
    container.appendChild(targetImage)
    let can = document.createElement('canvas') // Not shown on page
    let ctx = can.getContext('2d')
    let loader = new Image() // Not shown on page

    loader.width = can.width = targetImage.width = options.width || 128
    loader.height = can.height = targetImage.height = options.height || 128
    loader.onload = function() {
      ctx.drawImage(loader, 0, 0, loader.width, loader.height)
      targetImage.src = can.toDataURL()
    }
    var svgAsXML = new XMLSerializer().serializeToString(svgElement)
    loader.src = 'data:image/svg+xml,' + encodeURIComponent(svgAsXML)
  })
}

function getOptions(defaultOptions: ICubeOptions, extraOptions: string | ICubeOptions): ICubeOptions {
  let parsedOptions: ICubeOptions
  if (typeof extraOptions === 'string') {
    parsedOptions = parseOptions(extraOptions)
  } else {
    parsedOptions = extraOptions
  }

  if (typeof parsedOptions.facelets === 'string') {
    parsedOptions.facelets = parseFaceletDefinitions(parsedOptions.facelets)
  }

  return { ...defaultOptions, ...parsedOptions }
}
