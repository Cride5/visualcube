# VisualCube TS
Fork of [VisualCube](https://github.com/Cride5/visualcube), a great Rubik's cube svg image generator. This version is a javascript library that can be used to embed Rubik's cube images in a page, without pre-rendering an image server side.

### Installation Instructions
TBD

### Features 
* Cube dimensions from 1x1x1 to NxNxN. Currently capped at 17x17 for performance.
* Algorithm Support
* Fully 3D cube visualisation
* Cube and facelet transparency
* Custom colour schemes and background
* Arrow overlays

### To Implement
* Backward compatible parameters to Cride5's version. The options parameter used to generate the cube should be able to take in the raw string input used in the original version. For example, when defining arrows, instead of passing in a array of type `Arrow` you could pass in something like `U0U2,U2U8,U8U0,R6R2R0-s8-i5-yellow` This is in case anyone is trying to upgrade to use this library and doesn't want to re build all of their image configs.

### Still need to implement from Cride5's version
* Case (backward algorithm)
* Facelet Definition (Defines the cube state in terms of facelet positions)
* Configurable 'dist' parameter
* Configurable default arrow color
* Transparent view
* Cookie configurable variables