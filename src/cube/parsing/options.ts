import { ICubeOptions } from '../options'
import { parseRotationSequence } from './rotation'
import { parseFaceletColors } from './faceletColors'
import { parseColorScheme } from './colorScheme'
import { parseFaceletDefinitions } from './faceletDefinitions'

/**
 * Utility methods for parsing the old query param style options
 */

export function parseOptions(rawOptions: string): ICubeOptions {
  let options: ICubeOptions = {} as any
  let params = parseQuery(rawOptions)

  Object.keys(params).forEach(key => {
    let paramValue = params[key]
    switch (key) {
      case 'pzl':
        options.cubeSize = parseInt(paramValue) || 3
        break
      case 'size':
        let size = parseInt(paramValue) || 250
        options.width = size
        options.height = size
        break
      case 'view':
        options.view = paramValue
        break
      case 'stage':
        options.mask = paramValue
        break
      case 'r':
        options.viewportRotations = parseRotationSequence(paramValue)
        break
      case 'alg':
        options.algorithm = paramValue
        break
      case 'case':
        options.case = paramValue
        break
      case 'fc':
        options.stickerColors = parseFaceletColors(paramValue)
        break
      case 'sch':
        options.colorScheme = parseColorScheme(paramValue)
        break
      case 'bg':
        options.backgroundColor = paramValue
        break
      case 'cc':
        options.cubeColor = paramValue
        break
      case 'co':
        options.cubeOpacity = parseInt(paramValue) || 100
        break
      case 'fo':
        options.stickerOpacity = parseInt(paramValue) || 100
        break
      case 'dist':
        options.dist = parseInt(paramValue) || 5
        break
      case 'arw':
        options.arrows = paramValue
        break
      case 'fd':
        options.facelets = parseFaceletDefinitions(paramValue)
        break
      case 'ac':
        // TODO: Support default arrow color
        console.warn("Currently param 'ac' is unsupported")
        break
    }
  })
  return options
}

function parseQuery(url) {
  let queryString = url.indexOf('?') > -1 ? url.substr(url.indexOf('?') + 1) : url
  var query = {}
  var pairs = queryString.split('&')
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split('=')
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '')
  }
  return query
}
