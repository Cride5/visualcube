# VisualCube TS
Fork of [VisualCube](https://github.com/Cride5/visualcube), a great Rubik's cube svg image generator. This version is a javascript library that can be used to embed Rubik's cube images in a page, without pre-rendering an image server side.

Most of the original Author's logic remains the same. It has just been moved around into files to help it be a bit more readable. Some typing has also been added.

Logic to determine sticker color and apply algorithms was mostly added as part of this project to work with the original structure. Code for the simulator to apply algorithms is unique to this project and was not ported over from the original php version.

### Installation
Install the package using npm
```bash
npm install --save sr-visualizer
```

### Usage
Import the module
```javascript
import * as SRVisualizer from 'sr-visualizer'
```

Render a cube by calling `cube()` and passing in an html element, OR an element ID. This will render a default SVG cube inside that element.
```javascript
SRVisualizer.cube('element-id')
```

Default options can be overridden by passing in options to cube. For example you can render higher order cubes. Detailed description for all options will be provided below.
```javascript
SRVisualizer.cube('element-id', {
  cubeSize: 4, // 4x4 cube
  width: 500,  // width/height of the svg
  height: 500
})
```

### Examples

#### Default
```javascript
cube('example')
```
![default cube](https://raw.githubusercontent.com/tdecker91/visualcube/master/assets/default.png)

#### Plan View
```javascript
cube('example', {
  view: 'plan'
})
```

![plan view](https://raw.githubusercontent.com/tdecker91/visualcube/master/assets/plan.png)

#### Color Schemes 
showcasing japanese color scheme
```javascript
import {cube, Face} from 'sr-visualizer'

cube('example', {
  algorithm: 'M2 E2 S2',
  colorScheme: {
    [Face.U]: '#0000F2',
    [Face.R]: '#FFA100',
    [Face.F]: '#00D800',
    [Face.D]: '#FFFFFF',
    [Face.L]: '#EE0000',
    [Face.B]: '#FEFE00'
  }
})
```

![color scheme](https://raw.githubusercontent.com/tdecker91/visualcube/master/assets/colorscheme.png)

#### Transparency
```javascript
import {cube, Face} from 'sr-visualizer'

cube('example', {
  cubeOpacity: 12,
  stickerOpacity: 50
})
```

![opacity](https://raw.githubusercontent.com/tdecker91/visualcube/master/assets/opacity.png)

#### Masking
only showing the last layer
```javascript
import {cube, Masking} from 'sr-visualizer'

cube('example', {
  mask: Masking.LL
})
```

![mask](https://raw.githubusercontent.com/tdecker91/visualcube/master/assets/lastlayermask.png)

#### Rotation
```javascript
import {cube, Axis} from 'sr-visualizer'

cube('example', {
  viewportRotations: [
    [Axis.X, -34]
  ]
})
```

![rotation](https://raw.githubusercontent.com/tdecker91/visualcube/master/assets/rotation.png)

#### Big Cubes
```javascript
cube('example', {
  cubeSize: 17,
  stickerColors: [...]
})
```

![big](https://raw.githubusercontent.com/tdecker91/visualcube/master/assets/bigcube.png)

#### Arrows
```javascript
cube('example', {
  arrows: 'U0U2,U2U8,U8U0,R6R2R0-s8-i5-yellow'
})
```

![arrows](https://raw.githubusercontent.com/tdecker91/visualcube/master/assets/arrows.png)

### Documentation
Here is a table of the supported options

| key | description | value range | default | comment |
| --- | ----------- | ----------- | ------- | ------- |
| dist | Projection Distance | 1 to 100 | 5 | |
| algorithm | Algorithm to apply | [UDLRFBudlrfbMESxyz'2 ]* (ex "R U R' U") | | String of turns separated by space. On larger cubes algorithms only apply to outer layers |
| backgroundColor | Background color of image | html color codes or names (ex. '#FFF' or 'white')  | white | |
| cubeColor | Color cube is drawn as | html color codes or names (ex. '#000' or 'black') | black | |
| cubeSize | Size of the cube | 1 to 17 | 5 | Values from N=(1 to 17) represent an NxNxN cube. Currently only regular cubes are modelled |


### Still need to implement from Cride5's version
* Backward compatible parameters to Cride5's version. The options parameter used to generate the cube should be able to take in the raw string input used in the original version. For example, when defining arrows, instead of passing in a array of type `Arrow` you could pass in something like `U0U2,U2U8,U8U0,R6R2R0-s8-i5-yellow` This is in case anyone is trying to upgrade to use this library and doesn't want to re build all of their image configs.
* Case (backward algorithm)
* Facelet Definition (Defines the cube state in terms of facelet positions)
* Configurable 'dist' parameter
* Configurable default arrow color
* Transparent view
* Cookie configurable variables