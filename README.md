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
| algorithm | Algorithm to apply | `[UDLRFBudlrfbMESxyz'2 ]*` (ex "R U R' U") | | String of turns separated by space. On larger cubes algorithms only apply to outer layers |
| backgroundColor | Background color of image | html color codes or names (ex. '#FFF' or 'white')  | white | |
| cubeColor | Color cube is drawn as | html color codes or names (ex. '#000' or 'black') | black | |
| cubeSize | Size of the cube | 1 to 17 | 5 | Values from N=(1 to 17) represent an NxNxN cube. Currently only regular cubes are modelled |
| cubeOpacity | Opacity of the cube inside | 0 to 100 | 100 | Setting this value causes the base cube to be transparent. It means facelets at the back of the cube will also be rendered. A value of 0 gives complete transparency. |
| stickerOpacity | Opacity of the stickers | 0 to 100 | 100 | Setting this value causes the facelets to be rendered with transparency |
| colorScheme | Opacity of the stickers | `{ [face: Face]: string }` | U -> yellow, R -> red, F -> blue, D-> white, L -> orange, B -> green | Mapping from face to color. Color can be RGB hex value, or html color name. `Face` is an enum exported from the library. (ex. Face.U, Face.R etc..) |
| stickerColors | define any custom colors you want | Array of colors (string value html color name or color code) | | The order of the colors specified represent the faces in this order: U R F D L B Cube size determines how many definitions you need to fill the cube. A 3x3 cube will need 54 elements in the array. |
| viewportRotations | Rotation Sequence | `[Axis, number][]` | `[[Axis.Y, 45],[Axis.X, -34]]` | Each entry in the sequence is an axis (x, y or z), followed by the number of degrees to rotate in a clockwise direction. Negative values are permitted. Any number of rotations is possible. `Axis` is an enum exported from the library containing values X, Y and Z |
| view | special view | "plan" |  | The view parameter allows special views to facilitate interpretation of different case aspects. This will override any custom viewport rotations passed in.
| width | svg width | whole numbers | 128 | Width the svg container will be |
| height | svg height | whole numbers | 128 | Height the svg container will be |
| mask | Stage mask | `fl | f2l | ll | cll | ell | oll | ocll | oell | coll | ocell | wv | vh | els | cls | cmll | cross | f2l_3 | f2l_2 | f2l_sm | f2l_1 | f2b | line` | | Sets parts of the cube to be masked from being colored. Stickers will be rendered gray, so image will focus particular stickers. |
| maskAlg | Algorithm to be performed on the mask | `[UDLRFBudlrfbMESxyz'2 ]*` | | Commonly used to perform a rotation on the mask. For example, if you want the picture to highlight the cross on the right side, you can set the mask to `cross`, and the maskAlg to `z'` Mask alg will not affect underlying stiker values. The `algorithm` parameter will not effect the masking. |
| arrows | Arrow definition | `Arrow[]` OR Comma separated list in the form: `<a_from><a_to>(<a_via>)?(-i[0-9+])?(-s[0-9+])?(-<color>)?` Where `<a_x>` is: `[URFDLB][0-N]+` And: `<color>` is an html color code or color name. | | Defines a list of arrows to be drawn on the cube. You can either pass in an array of `Arrow`, or a string value supported by the original author's version. Each arrow is defined with a minimum of two sticker identifiers to indicate where it should be drawn from and to. The optional third sticker identifier indicates which sticker it should pass through if a curved arrow is to be drawn. Arrows may be scaled so that they fall short, or past the centre of each facelet by specifying the s (scale) parameter after a dash. Where curved arrows are drawn the degree to which the arrow deviates from a straight path can be specified via the i (influence) parameter. Arrows may also optionally be assigned individual color, by using a - followed by a color code. Example: `U0U2,U2U8,U8U0,R6R2R0-s8-i5-yellow` |


### Still need to implement from Cride5's version
* Backward compatible parameters to Cride5's version. The options parameter used to generate the cube should be able to take in the raw string input used in the original version. For example, when defining arrows, instead of passing in a array of type `Arrow` you could pass in something like `U0U2,U2U8,U8U0,R6R2R0-s8-i5-yellow` This is in case anyone is trying to upgrade to use this library and doesn't want to re build all of their image configs.
* Case (backward algorithm)
* Facelet Definition (Defines the cube state in terms of facelet positions)
* Configurable 'dist' parameter
* Configurable default arrow color
* Transparent view
* Cookie configurable variables