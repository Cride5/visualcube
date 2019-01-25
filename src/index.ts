import * as SVG from 'svg.js'
import { makeCubeGeometry } from './cube/geometry'
import { Vec3, Axis } from './math'
import { renderCube } from './cube/drawing'
import { ICubeOptions } from './cube/options'
import { DefaultColorScheme, Masking, JapaneseColorScheme } from './cube/constants'
import { makeStickerColors } from './cube/stickers'
import { ColorName, ColorCode } from './constants'

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

export function cubeSVG(container: HTMLElement | string, extraOptions: any = {}) {
  let options = { ...defaultOptions, ...extraOptions }
  let geomety = makeCubeGeometry(options)
  options.stickerColors = makeStickerColors(options)

  renderCube(container, geomety, options)
}

export function cubePNG(container: HTMLElement, extraOptions: any = {}) {
  let element = document.createElement('div')
  cubeSVG(element, extraOptions)

  setTimeout(() => {
    let svgElement = element.querySelector('svg')
    let targetImage = document.createElement('img') // Where to draw the result
    container.appendChild(targetImage)
    let can = document.createElement('canvas') // Not shown on page
    let ctx = can.getContext('2d')
    let loader = new Image() // Not shown on page

    loader.width = can.width = targetImage.width = extraOptions.width || 128
    loader.height = can.height = targetImage.height = extraOptions.height || 128
    loader.onload = function() {
      ctx.drawImage(loader, 0, 0, loader.width, loader.height)
      targetImage.src = can.toDataURL()
    }
    var svgAsXML = new XMLSerializer().serializeToString(svgElement)
    loader.src = 'data:image/svg+xml,' + encodeURIComponent(svgAsXML)
  })
}
