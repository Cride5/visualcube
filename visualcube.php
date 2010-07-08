<?php
/*
	File: visualcube.php
	Date: 02 Apr 2010
	Author(s): Conrad Rider (www.crider.co.uk)
	Contributors: Shotaro Makisumi <smakisumi@gmail.com>, Jaume Casado Ruiz <minterior@gmail.com>
	Description: Main script to generate cube images

	This file is part of VisualCube.

	VisualCube is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	VisualCube is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.

	You should have received a copy of the GNU Lesser General Public License
	along with Foobar.  If not, see <http://www.gnu.org/licenses/>.
	
	Copyright (C) 2010 Conrad Rider
	
	TODO:
	* Permutation Arrows
	* Other puzzles
	
	CHANGES: (Version 0.3.0 to 0.4.0)
	* Algs applicable to NxNxN cubes
	* Wider range of stage masks, with the ability to rotate them
	* Style variables configurable via cookies
*/

	//  -----------------[ Script Configuration ]-----------------

	// Database Configuration (for image caching)
	$DB_NAME="DATABASE_NAME";
	$DB_USERNAME="DATABASE_USERNAME";
	$DB_PASSWORD="DATABASE_PASSWORD";
	
	// Maximum cube dimension to render (pzl)
	$MAX_PZL_DIM = 10;
	
	// Whether to allow cookie config of style variables (r, sch, bg, cc, co, fo, dist)
	$ENABLE_COOKIES = true;

	// Whether image caching is enabled. NOTE: if enabled a cron
	// job will need to be set up to prune the database
	$ENABLE_CACHE = true; 
	
	// Maximum size of image to be cached
	$CACHE_IMG_SIZE_LIMIT = 10000; // 10Kb
	
	// Causes cube svg to be outputted as XML for inspection
	$DEBUG = false;
	// Do not display errors
	if (!$DEBUG) error_reporting(0);

	// Default rendering values
	$DEFAULTS = Array(
		'fmt'   => 'gif',
		'pzl'   => '3',
		'size'  => '128',
		'view'  => '',
		'stage' => '',
		'r'     => 'y45x-34',
		'alg'   => '',
		'case'  => '',
		'fd'    => '',
		'fc'    => '',
		'sch'   => 'yrbwog',
		'bg'    => 'white',
		'cc'    => 'black',
		'co'    => '100',
		'fo'    => '100',
		'dist'  => '5',
	);
	
	
	// ----------------------[ API Page ]-----------------------
	
	// If no format specified, display API page
	if(!array_key_exists('fmt', $_REQUEST)){
	
	
		// XML definition
		$HTML_DEF = '<?xml version="1.0" encoding="iso-8859-1"?>'."\n".
		    '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"'."\n".
		    '   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">'."\n";

		// Start page render
		echo $HTML_DEF;
?>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
	<head>
		<title>VisualCube (v0.5.0)</title>
		<meta name="description"        content="Rubiks cube visualiser"/>
		<meta name="keywords"           content="visualcube, visual cube, imagecube, image cube, cube vis, viscube, visual rubiks, imgcube, cube image, cube gif, cub png, cube jpeg"/>
		<meta name="resource-type"      content="document"/>
		<meta name="language"           content="English"/>
		<meta name="rating"             content="general"/>
		<meta name="robots"             content="all"/>
		<meta name="expires"            content="never"/>
		<meta name="revisit-after"      content="14 days"/>
		<meta name="distribution"       content="global"/>
		<meta name="author"             content="Conrad Rider"/>
		<meta name="copyright"          content="Copyright © 2009-2010 Conrad Rider"/>
		<meta http-equiv="Content-Type" content="text/html; iso-8859-1"/>
		<script type="text/javascript">
			//<![CDATA[
			function setCookie(cname, value){
				var days = 365;
				var date = new Date();
				date.setTime(date.getTime()+(days*24*60*60*1000));
				var expires = "; expires="+date.toGMTString();
				document.cookie = cname + "=" + value + expires + "; path=/";
			}
			//]]>
		</script>
		<style media="screen" type="text/css">
			@import url("common.css");
			table{
				border-spacing:0px; 
				border-top:1px solid silver;
				border-left:1px solid silver;
				border-right:0;
				border-bottom:1px solid silver;
				background-color:#FAFAFA; 
				
			}
			th{
				background-color:#DDDDDD; 
				border-right:1px solid silver;
				text-align:center;
			}
			h2{
				margin-top:10px;
			}
			td{
				vertical-align:top;
				border-top:1px solid grey; 
				border-right: 1px solid silver;
				padding:10px;
			}
			em{
				font-style:normal;
				font-weight:bold;
			}
			#examples img{
				border:0;
				float:none;
			}
			#content_v{
				margin:10px 50px;
				text-align:left;
			}
			#header_v{
				margin:10px 50px;
				text-align:left;
				
			}
			#header_v img{
				float:right;
				border:none;
			}
			#cookie_list{
				width:250px;
			}
			#cookie_list li{
				margin-bottom:20px;
			}
			#cookie_list input{
				float:right;
				width:60px;
			}
		</style>
	</head>
	<body>
		<div id="nav_box">
			cube.crider.co.uk
			<ul>
				<li><a href="/">ZZ Tutorial</a></li>
				<li><a href="beginner.html">Beginner Tutorial</a></li>
				<li><a href="http://www.ctimer.co.uk">cTimer</a></li>
				<li><a href="http://www.ctimer.co.uk/wee">weeTimer</a></li>
				<li><em>VisualCube</em></li>
				<li><a href="algtrans.html">Algorithm Translator</a></li>
				<li><a href="coracle.html">Coracle Lookahead Drill</a></li>
				<li><a href="scrambler.html">Random State Scrambler</a></li>
				<li><a href="http://www.crider.co.uk">Author's Homepage</a></li>
			</ul>
		</div>
		<div id="header_v">
			<a href="http://validator.w3.org/check?uri=referer" title="Valid XHTML 1.0 Strict">
				<img src="http://www.w3.org/Icons/valid-xhtml10" alt="Valid XHTML 1.0 Strict" width="88" height="31" style="margin-right:200px"/>
			</a>
			<h1>VisualCube</h1>
			Generate custom Rubik's cube visualisations from your browser address bar.
			<br/><br/>
		</div>
		<div id="content_v">
			<h2>Instructions</h2>
			Simply point your browser to visualcube.png to create a cube image.<br/>
			A range of parameters can be set to customise the cube visualisation.<br/>
			Click the link below for an example:<br/><br/>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<a href="visualcube.png?size=150&amp;pzl=2&amp;alg=R2F2R2">cube.crider.co.uk/visualcube.png?size=150&amp;pzl=2&amp;alg=R2F2R2</a>
			<br/><br/><br/>
			<h2>Examples</h2>
			The following images were generated by VisualCube.
			<br/><br/>
			<div id="examples">
				<a href="visualcube.php?fmt=gif&amp;size=200&amp;alg=S2M2E2">
					<img src="visualcube_0.gif" alt="Example 0"/></a>
				<a href="visualcube.php?fmt=gif&amp;size=200&amp;view=plan&amp;case=RUR'U'R'U2RUR'UR2U2R'y2&amp;arw=U1U5,U5U1,U3U7,U7U3">
					<img src="visualcube_1.gif" alt="Example 1"/></a>
				<a href="visualcube.php?fmt=gif&amp;size=200&amp;co=30&amp;co=12&amp;fo=50">
					<img src="visualcube_2.gif" alt="Example 2"/></a>
				<a href="visualcube.php?fmt=gif&amp;size=200&amp;r=y45x34&amp;cc=n&amp;fo=100&amp;co=35&amp;fd=tototototttttttttttttofotfttdtodotdtttttttttttttobotbt">
					<img src="visualcube_3.gif" alt="Example3"/></a>
				<a href="visualcube.php?fmt=gif&amp;size=200&amp;pzl=7&amp;cc=grey&amp;r=z-15x-105&amp;sch=yyyyyy&amp;fc=ynyyynynnnynnnyyyyyyyyynnnyynyynyynnnyyynnynnnnny">
					<img src="visualcube_4.gif" alt="Example4"/></a>
			</div>
			Click each cube to see how it was generated..
			<br/><br/><br/>
			<h2>Features</h2>
			<ul>
				<li>Fully 3D cube visualisation</li>
				<li>Cube dimensions from 1x1x1 to NxNxN</li>
				<li>Algorithm support</li>
				<li>Complete orientation control</li>
				<li>Multiple image formats</li>
				<li>Custom image size</li>
				<li>Cube and facelet transparency</li>
				<li>Custom colour schemes</li>
				<li>Custom background colour</li>
				<li>Image caching for speedy access</li>
				<li>Cookie configurable variables</li>
			</ul>
			<br/>
			<h2>To Do</h2>
			<div>
				The following features/bug fixes are planned for the future (ordered by priority).
				<ul>
					<li>More special views added to the 'view' variable (permutation arrows for example)</li>
					<li>Visualisation of other puzzles inc square-1, megaminx and pyraminx</li>
				</ul>
				<br/><br/>
			</div>
			<h2>Source Code</h2>
			<div> The source code for this script is available under the GNU Lesser General Public License at
			<a href="https://sourceforge.net/projects/vcube/">sourceforge.net/projects/vcube</a>.</div>
			<br/><br/>
			<h2>Parameters</h2>
			<table>
				<tr><th>Variable</th><th>Description</th><th>Value Range</th><th>Default</th><th>Comment</th></tr>
				<tr><td><em>.</em></td><td>script extension</td><td> .png | .gif | .jpg | .svg | .tiff | .ico </td><td>.<?php echo $DEFAULTS['fmt']; ?></td>
					<td>The extension used in the script url dictates the format of the image generated. For example:
					visiting <a href="visualcube.jpg">/visualcube.jpg</a>
					will create a jpeg image.</td></tr>
				<tr><td><em>fmt</em></td><td>Image Format</td><td> png | gif | jpg | svg | tiff | ico </td><td><?php echo $DEFAULTS['fmt']; ?></td>
					<td>Used as an alternative to using an image extension as above.</td></tr>
				<tr><td><em>pzl</em></td><td>Puzzle Type</td><td>1 to <?php echo $MAX_PZL_DIM; ?></td><td><?php echo $DEFAULTS['pzl']; ?></td>
					<td>Values from N=(1 to <?php echo $MAX_PZL_DIM; ?>) represent an NxNxN cube. Currently only regular cubes are modelled</td></tr>
				<tr><td><em>size</em></td><td>Size of generated image</td><td>0 to 1024</td><td><?php echo $DEFAULTS['size']; ?></td><td>
					Images produced are square, so size specifies both width and height of the final image in pixels.</td></tr>
				<tr><td><em>view</em></td><td>Special View</td><td>plan|trans</td><td><?php echo $DEFAULTS['view']; ?>&nbsp;</td>
					<td>The view parameter allows special views to facilitate interpretation of different case aspects.
					<br/><em>plan</em> rotates cube to expose U face, while showing the sides of the top layer<br/>
					<em>trans</em> sets the cube base colour to transparent, and hides any masked or undefined faces</td></tr>
				<tr><td><em>stage</em></td><td>Stage Mask</td><td> ( fl | f2l | ll | cll | ell | oll | ocll | oell | coll | ocell | wv |
					 vh | els | cls | cmll | cross | f2l_3 | f2l_2 | f2l_sm | f2l_1 | f2b | line | 2x2x2 | 2x2x3 )-?[xyz2']*
					 </td><td><?php echo $DEFAULTS['stage']; ?>&nbsp;</td>
					<td>Sets parts of the cube to be masked from being coloured. The stage identifier is optionally followed by a rotation algorithm. For example: <em>stage=cross-x2</em> would rotate the cross mask so that the cross appears on the U-layer rather than the D-layer</td></tr>
				<tr><td><em>r</em></td><td>Rotation Sequence</td><td>([xyz]-?[0-9][0-9]?[0-9]?)+</td><td><?php echo $DEFAULTS['r']; ?></td>
					<td>Each entry in the sequence is an axis (x, y or z), followed by the
					number of degrees to rotate in a clockwise direction. Negative values are permitted.
					Any number of rotations is possible.</td></tr>
				<tr><th colspan="5">State Definitions</th></tr>
				<tr><td><em>alg</em></td><td>Algorithm to apply</td><td>[UDLRFBudlrfbMESxyz'2 ]*</td><td><?php echo $DEFAULTS['alg']; ?>&nbsp;</td>
					<td>The system applies the algorithm to the cube and displays the resulting state.<br/><br/>
					<em>NOTE:</em> Currently unavailable for 4x4 cubes or above</td></tr>
				<tr><td><em>case</em></td><td>Algorithm to solve case</td><td>[UDLRFBudlrfbMESxyz'2 ]*</td><td><?php echo $DEFAULTS['case']; ?>&nbsp;</td>
					<td>The system displays the cube state which is solved by applying the algorithm
					(algorithm inverse).<br/><br/>
					<em>NOTE:</em> Currently unavailable for 4x4 cubes or above</td></tr>
				<tr><td><em>fd</em></td><td>Facelet Definition</td><td>[udlrfbnot]*</td>
					<td><?php echo $DEFAULTS['fd'] != '' ? insert_space($DEFAULTS['fd'], $DEFAULTS['pzl']) :
					'uuuuuuuuu rrrrrrrrr fffffffff ddddddddd lllllllll bbbbbbbbb'; ?></td>
					<td>Defines the cube state in terms of facelet positions.
					u stands for a 'U' facelet (and likewise with rfdlb).
					Defining a cube state using this method means the cube will be coloured
					according to the scheme defined by the <em>sch</em> variable.
					Three special characters are used to indicate the following:<br/>
					<em>n</em>: This is a blank face (coloured grey)<br/>
					<em>o</em>: This is an 'oriented' face (coloured silver)<br/>
					<em>t</em>: This is a transparent face, and will not appear on the cube
					</td></tr>
				<tr><td><em>fc</em></td><td>Facelet Colours</td><td>[ndlswyrobgmpt]*</td>
					<td><?php echo $DEFAULTs['fc'] != '' ? insert_space($DEFAULTS['fc'], $DEFAULTS['pzl']) :
					'yyyyyyyyy rrrrrrrrr bbbbbbbbb wwwwwwwww ooooooooo ggggggggg'; ?></td>
					<td>Defines the cube state in terms of facelet colours,
					as an alternative to using fd. fc
					takes precedence over fd if both are defined.<br/><br/>
					See the 'sch' variable below for an explanation of the colour codes.
					</td></tr>
				<tr><th colspan="5">Cube Style</th></tr>
				<tr><td><em>sch</em></td><td>Colour Scheme</td>
					<td>[ndlswyrobgmp]*6 <br/><br/>OR<br/><br/>
					Comma separated list containing 6x one of:<br/>
					black | dgrey | grey | silver | white | yellow | red | orange | blue
					| green | purple | pink | [0-9a-fA-F]*3 | [0-9a-fA-F]*6
					</td><td><?php echo $DEFAULTS['sch']; ?></td>
					<td>The order of the colours specified represent the faces in this order:<br/><br/>
					U R F D L B
					<br/><br/>The letters used in shorthand notation map to the generic
					face colours as follows: n=black (noir), d=dark grey, l=light grey,
					s=silver (lighter grey), w=white, y=yellow, r=red, o=orange, b=blue, g=green,
					m=purple (magenta), p=pink, t=transparent<br/><br/>
					Where longhand notation is used, 3 or 6-digit hex codes can be used to specify
					the exact colour. for example C80000 would be a dark red colour.
					</td></tr>
				<tr><td><em>bg</em></td><td>Background Colour of image</td><td>[ndlswyrobgmpt] <br/><br/>OR<br/><br/>
					black | dgrey | grey | silver | white | yellow | red | orange | blue
					| green | purple | pink | [0-9a-fA-F]*3 | [0-9a-fA-F]*6
					</td>
					<td><?php echo $DEFAULTS['bg']; ?></td><td>The value <em>t</em> represents transparent, and is only valid for png and gif images.</td></tr>
				<tr><td><em>cc</em></td><td>Cube Colour</td><td>see above</td><td><?php echo $DEFAULTS['cc']; ?></td><td>This is the cube's base colour.</td></tr>
				<tr><td><em>co</em></td><td>Cube Opacity</td><td>0 to 99</td><td><?php echo $DEFAULTS['co']; ?></td>
					<td>Setting this value causes the base cube to be transparent.
					It means facelets at the back of the cube will also be rendered.
					A value of 0 gives complete transparency.</td></tr>
				<tr><td><em>fo</em></td><td>Facelet Opacity</td><td>0 to 99</td><td><?php echo $DEFAULTS['fo']; ?></td>
					<td>Setting this value causes the facelets to be rendered with transparency.</td></tr>
				<tr><td><em>dist</em></td><td>Projection Distance</td><td>1 to 100</td><td><?php echo $DEFAULTS['dist']; ?></td>
					<td>Controls the distance of the cube from the perspective of the viewer.</td></tr>
				<tr><th colspan="5">Added Features</th></tr>
				<tr><td><em>arw</em></td><td>Arrow Definition</td>
					<td>Comma separated list in the form:<br/><br/>
						&lt;a_from&gt;&lt;a_to&gt;(&lt;a_via&gt;)?(-i[0-9+])?(-s[0-9+])?(-&lt;colour&gt;)?<br/><br/>
						Where &lt;a_x&gt; is: [URFDLB][0-9]+<br/><br/>
						And: &lt;colour&gt; is as defined in the 'sch' variable.</td>
					<td>-i10-s10</td>
					<td>Defines a list of arrows to be drawn on the cube.<br/><br/>
					Each arrow is defined with a minimum of two sticker identifiers to indicate
					where it should be drawn from and to. The optional third sticker identifier
					indicates which sticker it should pass through if a curved arrow is to be drawn.
					Arrows may be scaled so that they fall short, or past the centre of each facelet
					by specifying the <em>s</em> (scale) parameter after a dash.
					Where curved arrows are drawn the degree to which the arrow deviates from a straight
					path can be specified via the <em>i</em> (influence) parameter.
					Arrows may also optionally be assigned individual colours, by using a -
					followed by a colour code.
					<br/><br/>Example:&nbsp;&nbsp;&nbsp;arw=U0U2,U2U8,U8U0,R6R2R0-s8-i5-yellow
					<br/><br/>
					The above example draws 4 arrows. The first three use default colour and scale
					and point to stickers on the U-face. The fourth arrow 
					points from sticker #6 to sticker #2 on the R-face, and is curved
					so that it passes through sticker #0. The arrow is slightly shortened to 8/10
					of its full length, and the influence of the pass through sticker in generating
					the curve is set to 5/10.
					</td></tr>
				<tr><td><em>ac</em></td><td>Default Arrow Colour</td><td>[ndlswyrobgmp] <br/><br/>OR<br/><br/>
					black | dgrey | grey | silver | white | yellow | red | orange | blue
					| green | purple | pink | [0-9a-fA-F]*3 | [0-9a-fA-F]*6
					</td>
					<td>grey</td><td>Arrows will be this colour by default, unless overridden by a
					colour specified for each arrow in the arw variable.</td></tr>
			</table>
			<br/><br/><?php if($ENABLE_COOKIES){ ?>
			<h2>Cookie Configuration</h2>
			The desired values for cookie configurable variables can be set below. <br/>
			Refer to the table above for acceptable values.
			<ul id="cookie_list">
				<li><input type="text" value="<?php echo $_COOKIE['vc_r']?>"
					onkeyup="setCookie('vc_r', this.value)"/>Rotation Sequence (r):</li>
				<li><input type="text" value="<?php echo $_COOKIE['vc_sch']?>"
					onkeyup="setCookie('vc_sch', this.value)"/>Colour Scheme (sch):</li>
				<li><input type="text" value="<?php echo $_COOKIE['vc_bg']?>"
					onkeyup="setCookie('vc_bg', this.value)"/>Background Colour (bg):</li>
				<li><input type="text" value="<?php echo $_COOKIE['vc_cc']?>"
					onkeyup="setCookie('vc_cc', this.value)"/>Cube Colour (cc):</li>
				<li><input type="text" value="<?php echo $_COOKIE['vc_co']?>"
					onkeyup="setCookie('vc_co', this.value)"/>Cube Opacity (co):</li>
				<li><input type="text" value="<?php echo $_COOKIE['vc_fo']?>"
					onkeyup="setCookie('vc_fo', this.value)"/>Facelet Opacity (fo):</li>
				<li><input type="text" value="<?php echo $_COOKIE['vc_dist']?>"
					onkeyup="setCookie('vc_dist', this.value)"/>Projection Distance (dist):</li>
			</ul><?php } ?>
		</div>
		<div id="footer">
			Copyright &copy; 2010 <a href="http://www.crider.co.uk">Conrad Rider</a>.
			<br/>Cube images generated by VisualCube are free to copy and distribute
		</div>
	</body>
</html>
<?	

	// Otherwise render a cube
	}else{
		// Check cache for image and return if it exists in cache
		if($ENABLE_CACHE){
			// Connect to db
			mysql_connect("localhost", $DB_USERNAME, $DB_PASSWORD);
			@mysql_select_db($DB_NAME) or die("Unable to select database");

			$hash = md5($_SERVER['QUERY_STRING']);
			$imgdata = get_arrays("SELECT fmt, req, rcount, img FROM vcache WHERE hash='$hash'");
			// Verify query strings are equal (deals with unlikely, but possible hash collisions)
			if($imgdata && count($imgdata) > 0 && $imgdata[0]['req'] == $_SERVER['QUERY_STRING']){
				display_img($imgdata[0]['img'], $imgdata[0]['fmt']);
				// Increment access count
				mysql_query("UPDATE vcache SET rcount=".($imgdata[0]['rcount'] + 1)." WHERE hash='$hash'");
				// Disconnect from db
				mysql_close();
				return;
			}
		}
		
		
		// Otherwise generate image
		
		
		// -----------------[ Constants ]-----------------
	
		// Faces
		$U = 0; $R = 1; $F = 2; $D = 3; $L = 4; $B = 5; $N = 6; $O = 7; $T = 8;

	
		// Colour constants
		$BLACK  = '000000';
		$DGREY  = '404040';
		$GREY   = '808080';
		$SILVER = 'BFBFBF';
		$WHITE  = 'FFFFFF';
		$YELLOW = 'FEFE00';
		$RED    = 'EE0000';//'FE0000';
		$ORANGE = 'FFA100';//'FE8600';
		$BLUE   = '0000F2';
		$GREEN  = '00D800';//'00F300';
		$PURPLE = 'A83DD9';
		$PINK   = 'F33D7B';
	
		// Other colour schemes
		// Array('FFFF00', 'FF0000', '0000FF', 'FFFFFF', 'FF7F00', '00FF00'); // Basic
		// Array('EFEF00', 'C80000', '0000B6', 'F7F7F7', 'FFA100', '00B648'); // Cubestation
		// Array('EFFF01', 'FF0000', '1600FF', 'FEFFFC', 'FF8000', '047F01'); // cube.rider
		// Array('FEFE00', 'FE0000', '0000F2', 'FEFEFE', 'FE8600', '00F300'); // alg.garron

		// Name colour mapping
		$NAME_COL = Array(
			'black'  => $BLACK,
			'dgrey'  => $DGREY,
			'grey'   => $GREY,
			'silver' => $SILVER,
			'white'  => $WHITE,
			'yellow' => $YELLOW,
			'red'    => $RED,
			'orange' => $ORANGE,
			'blue'   => $BLUE,
			'green'  => $GREEN,
			'purple' => $PURPLE,
			'pink'   => $PINK);
	
		// Abbriviation colour mapping
		$ABBR_COL = Array(
			'n' => $BLACK,
			'd' => $DGREY,
			'l' => $GREY,
			's' => $SILVER,
			'w' => $WHITE,
			'y' => $YELLOW,
			'r' => $RED,
			'o' => $ORANGE,
			'b' => $BLUE,
			'g' => $GREEN,
			'm' => $PURPLE,
			'p' => $PINK,
			't' => 't'); // Transparent

		// Default colour scheme
		$DEF_SCHEME = Array ($YELLOW, $RED, $BLUE, $WHITE, $ORANGE, $GREEN, $DGREY, $GREY, 't');
		// $DEF_SCHEME = Array ($WHITE, $RED, $GREEN, $BLUE, $ORANGE, $YELLOW, $GREY, $SILVER, 't'); // Japanese scheme

		// Corresponding mappings from colour code to face id
		$DEF_SCHCODE = Array('y', 'r', 'b', 'w', 'o', 'g',);
		//$DEF_SCHCODE = Array('w', 'r', 'g', 'b', 'o', 'y',); // Japanese scheme


		// -----------------------[ User Parameters ]--------------------

		// Retrive format from user, default to first in list otherwise
		$LEGAL_FMT = Array ('gif', 'png', 'svg', 'jpg', 'jpe', 'jpeg', 'tiff', 'ico');
		$fmt = $LEGAL_FMT[0];
		if(array_key_exists('fmt', $_REQUEST) || array_key_exists('fmt', $DEFAULTS)){
			$fmt = array_key_exists('fmt', $_REQUEST) ? $_REQUEST['fmt'] : $DEFAULTS['fmt'];
			if(!in_array($fmt, $LEGAL_FMT))
				$fmt = $LEGAL_FMT[0];
			else{
				if($fmt == 'jpeg' || $fmt == 'jpe') $fmt = 'jpg';
			}
		}
	
		// Default rotation sequence
		$rtn = Array(Array(1, 45), Array(0, -34));
		// Get rotation from request (or cookie)
		if(array_key_exists('r', $_REQUEST) || array_key_exists('r', $DEFAULTS)
		|| ($ENABLE_COOKIES && isset($_COOKIE['vc_r']) && $_COOKIE['vc_r'] != '')){
			$_r = array_key_exists('r', $_REQUEST) ? $_REQUEST['r'] :
			($ENABLE_COOKIES && isset($_COOKIE['vc_r']) && $_COOKIE['vc_r'] != '' ?
				$_COOKIE['vc_r'] : $DEFAULTS['r']);
			preg_match_all('/([xyz])(\-?[0-9][0-9]?[0-9]?)/', $_r, $matches);
			for($i = 0; $i < count($matches[0]); $i++){
				switch($matches[1][$i]){
					case 'x' : $rtn_[$i][0] = 0; break;
					case 'y' : $rtn_[$i][0] = 1; break;
					case 'z' : $rtn_[$i][0] = 2; break;
					default : continue;
				}
				$rtn_[$i][1] = $matches[2][$i];
			}
			if($rtn_) $rtn = $rtn_;
		}

		// Retrive cube Dimension
		$dim = $DEFAULTS['pzl'];
		if(array_key_exists('pzl', $_REQUEST) && is_numeric($_REQUEST['pzl'])
		&& $_REQUEST['pzl'] > 0 && $_REQUEST['pzl'] <= $MAX_PZL_DIM)
			$dim = $_REQUEST['pzl'];
		
		// Default scheme
		$scheme = $DEF_SCHEME;
		// Default mapping from colour code to face id
		$schcode = $DEF_SCHCODE;		
		// Retrive colour scheme from request (or cookie)
		if(array_key_exists('sch', $_REQUEST) || array_key_exists('sch', $DEFAULTS)
		|| ($ENABLE_COOKIES && isset($_COOKIE['vc_sch']) && $_COOKIE['vc_sch'] != '')){
			// Retrive from cookie or 'sch' variable
			$sd = array_key_exists('sch', $_REQUEST) ? $_REQUEST['sch'] :
			($ENABLE_COOKIES && isset($_COOKIE['vc_sch']) && $_COOKIE['vc_sch'] != '' ?
				$_COOKIE['vc_sch'] : $DEFAULTS['sch']);
			if(preg_match('/^[ndlswyrogbpmt]{6}$/', $sd)){
				for($i = 0; $i < 6; $i++){
					$scheme[$i] = $ABBR_COL[$sd[$i]];
					$schcode[$i] = $sd[$i];
				}
			}
			else{
				$cols = preg_split('/,/', $sd);
				if(count($cols) == 6){
					$cok = true;
					for($i = 0; $i < 6; $i++){
						$scheme[$i] = parse_col($cols[$i]);
						if(!$cols[$i]) $cok = false;
					}
					if(!$cok) $scheme = $DEF_SCHEME;
				}
			}
		}

		// Retrive size from user
		$size = $DEFAULTS['size']; // default
		if(array_key_exists('size', $_REQUEST) && is_numeric($_REQUEST['size'])){
			$size = $_REQUEST['size'];
			if($size < 0) $size = 0;
			if($size > 1024) $size = 1024;
		}
		
		// Retrive dist variable - projection distance (how close the eye is to the cube)
		$dist = $DEFAULTS['dist']; // default dist parameter
		if(array_key_exists('dist', $_REQUEST) || ($ENABLE_COOKIES && isset($_COOKIE['vc_dist']))){
			$dist_ = array_key_exists('dist', $_REQUEST) ? $_REQUEST['dist'] : $_COOKIE['vc_dist'];
			if(is_numeric($dist_)) $dist = $dist_ < 1 ? 1 : ($dist_ > 100 ? 100 : $dist_);
		}
	
		// Retrive view variable
		$view = $DEFAULTS['view'];
		if(array_key_exists('view', $_REQUEST)){
			$view = $_REQUEST['view'];
		}
	
		// Retrive background colour from request (or cookies)
		$bg = parse_col($DEFAULTS['bg']);
		if(!$bg) $bg = 'FFFFFF';
		if(array_key_exists('bg', $_REQUEST) || ($ENABLE_COOKIES && isset($_COOKIE['vc_bg']))){
			$bg_ = array_key_exists('bg', $_REQUEST) ? $_REQUEST['bg'] : $_COOKIE['vc_bg'];
			if($bg_ == "t") $bg = null;
			else{
				$bg_ = parse_col($bg_);
				if($bg_) $bg = $bg_;
			}
		}
		
		// Retrive cube colour from request (or cookies)
		$cc = parse_col($DEFAULTS['cc']);
		if(!$cc) $cc = $view == 'trans' ? $SILVER : $BLACK;
		if(array_key_exists('cc', $_REQUEST) || ($ENABLE_COOKIES && isset($_COOKIE['vc_cc']))){
			$cc_ = array_key_exists('cc', $_REQUEST) ? $_REQUEST['cc'] : $_COOKIE['vc_cc'];
			$cc_ = parse_col($cc_);
			if($cc_) $cc = $cc_;
		}

		// Retrive cube opacity from request (or cookies)
		$co = $DEFAULTS['co'];
		if(!is_numeric($co) || $co < 0 || $co > 100)
			$co = $view == 'trans' ? 50 : 100;
		if(array_key_exists('co', $_REQUEST) || ($ENABLE_COOKIES && isset($_COOKIE['vc_co']))){
			$co_ = array_key_exists('co', $_REQUEST) ? $_REQUEST['co'] : $_COOKIE['vc_co'];
			if(preg_match('/^[0-9][0-9]?$/', $co_)) $co = $co_;
		}

		// Retrive face opacity from request (or cookies)
		$fo = $DEFAULTS['fo'];
		if(!is_numeric($fo) || $fo < 0 || $fo > 100)
			$fo = 100;
		if(array_key_exists('fo', $_REQUEST) || ($ENABLE_COOKIES && isset($_COOKIE['vc_fo']))){
			$fo_ = array_key_exists('fo', $_REQUEST) ? $_REQUEST['fo'] : $_COOKIE['vc_fo'];
			if(preg_match('/^[0-9][0-9]?$/', $fo_)) $fo = $fo_;
		}

			
		// Create default face defs
		for($fc = 0; $fc < 6; $fc++){ for($i = 0; $i < $dim * $dim; $i++)
			$facelets[$fc * $dim * $dim + $i] = $fc;
		}
		// Retrive colour def
		// This overrides face def and makes the $scheme variable redundent (ie, gets reset to default)
		$uf = array_key_exists('fc', $_REQUEST) ? $_REQUEST['fc'] : (!array_key_exists('fd', $_REQUEST) ? $DEFAULTS['fc'] : '');
		if(preg_match('/^[ndlswyrobgmpt]+$/', $uf)){
			$using_cols = true;
			$scheme = $DEF_SCHEME;
			$nf = strlen($uf);
			for($fc = 0; $fc < 6; $fc++){ for($i = 0; $i < $dim * $dim; $i++){
				// Add user defined face
				if($fc * $dim *$dim + $i < $nf)
					$facelets[$fc * $dim * $dim + $i] = $uf[$fc * $dim *$dim + $i];
				// Otherwise use scheme code
				else
					$facelets[$fc * $dim * $dim + $i] = $schcode[$fc];
			}}
		}
		// Retrive facelet def
		if(!$uf){ $uf = array_key_exists('fd', $_REQUEST) ? $_REQUEST['fd'] : $DEFAULTS['fd'];
		if(preg_match('/^[udlrfbnot]+$/', $uf)){			
			// Map from face names to numeric face ID
			$fd_map = Array('u' => $U, 'r' => $R, 'f' => $F, 'd' => $D, 'l' => $L, 'b' => $B, 'n' => $N, 'o' => $O, 't' => $T);
			$nf = strlen($uf);
			for($fc = 0; $fc < 6; $fc++){ for($i = 0; $i < $dim * $dim; $i++){
				// Add user defined face
				if($fc * $dim *$dim + $i < $nf)
					$facelets[$fc * $dim * $dim + $i] = $fd_map[$uf[$fc * $dim *$dim + $i]];
				// Otherwise default to a blank/transparent face
				else $facelets[$fc * $dim *$dim + $i] = $view == 'trans' ? $T : $N;
			}}
		}}
		// Retrive stage variable
		if(array_key_exists('stage', $_REQUEST) || array_key_exists('stage', $DEFAULTS)){
			$stage = array_key_exists('stage', $_REQUEST) ? $_REQUEST['stage'] : $DEFAULTS['stage'];
			// Extract rotation sequence if present
			$p = strrpos($stage, '-');
			$st_rtn = '';
			if($p > 0){
				$st_rtn = urldecode(substr($stage, $p+1));
				$stage = substr($stage, 0, $p);
			}
			// Stage Definitions ]
			if($dim == 3){
				switch($stage){
					case 'fl' :
				$mask = "000000000000000111000000111111111111000000111000000111";
				break;
					case 'f2l' :
				$mask = "000000000000111111000111111111111111000111111000111111";
				break;
					case 'll' :
				$mask = "111111111111000000111000000000000000111000000111000000";
				break;
					case 'cll' :
				$mask = "101010101101000000101000000000000000101000000101000000";
				break;
					case 'ell' :
				$mask = "010111010010000000010000000000000000010000000010000000";
				break;
					case 'oll' :
				$mask = "111111111000000000000000000000000000000000000000000000";
				break;
					case 'ocll' :
				$mask = "101010101000000000000000000000000000000000000000000000";
				break;
					case 'oell' :
				$mask = "010111010000000000000000000000000000000000000000000000";
				break;
					case 'coll' :
				$mask = "111111111101000000101000000000000000101000000101000000";
				break;
					case 'ocell' :
				$mask = "111111111010000000010000000000000000010000000010000000";
				break;
					case 'wv' :
				$mask = "111111111000111111000111111111111111000111111000111111";
				break;
					case 'vh' :
				$mask = "010111010000111111000111111111111111000111111000111111";
				break;
					case 'els' :
				$mask = "010111010000111011000111110110111111000111111000111111";
				break;
					case 'cls' :
				$mask = "111111111000111111000111111111111111000111111000111111";
				break;
					case 'cmll' :
				$mask = "101000101101111111101101101101101101101111111101101101";
				break;
					case 'cross' :
				$mask = "000000000000010010000010010010111010000010010000010010";
				break;
					case 'f2l_3' :
				$mask = "000000000000110110000011011011111010000010010000010010";
				break;
					case 'f2l_2' :
				$mask = "000000000000011011000010010010111111000110110000111111";
				break;
					case 'f2l_sm' :
				$mask = "000000000000110110000011011011111110000110110000011011";
				break;
					case 'f2l_1' :
				$mask = "000000000000011011000110110110111111000111111000111111";
				break;
					case 'f2b' :
				$mask = "000000000000111111000101101101101101000111111000101101";
				break;
					case 'line' :
				$mask = "000000000000000000000010010010010010000000000000010010";
				break;
					case '2x2x2' :
				$mask = "000000000000110110000011011011011000000000000000000000";
				break;
					case '2x2x3' :
				$mask = "000000000000110110000111111111111000000011011000000000";
				break;
				}
			}else if($dim == 2){
				switch($stage){
					case 'fl' :
				$mask = "000000110011111100110011";
				break;
					case 'll' :
				$mask = "111111001100000011001100";
				break;
					case 'oll' :
				$mask = "111100000000111100000000";
				break;
				}
			}

			// Apply alg to mask if defined
			if($mask && $st_rtn != ''){
				require_once "cube_lib.php";
				$mask = fcs_doperm($mask, fcs_format_alg($st_rtn), $dim);
			}

			// Apply mask to face def
			if($mask){
				for($i = 0; $i < $dim * $dim * 6; $i++){
					$facelets[$i] = $mask[$i] == 0 ?
						($view == 'trans' ? ($using_cols ? 't' : $T) :
						($using_cols ? 'l' : $N)) : $facelets[$i];
				}
			}
		}
			
		// Retrive alg def
		if(array_key_exists('alg', $_REQUEST) || array_key_exists('case', $_REQUEST)
		|| array_key_exists('alg', $DEFAULTS) || array_key_exists('case', $DEFAULTS)){
			require_once "cube_lib.php";
			if(array_key_exists('alg', $_REQUEST) || array_key_exists('case', $_REQUEST)){
				$alg = $_REQUEST['alg']; $case = $_REQUEST['case']; }
			else{	$alg = $DEFAULTS['alg']; $case = $DEFAULTS['case']; }
			$alg = fcs_format_alg(urldecode($alg));
			$case = invert_alg(fcs_format_alg(urldecode($case)));
//			$facelets = facelet_cube(case_cube($alg), $dim, $facelets); // old 3x3 alg system
			$facelets = fcs_doperm($facelets, $case . ' ' . $alg, $dim); // new NxN facelet permute
		}
		
		// Retrive arrow defn's
		if(array_key_exists('arw', $_REQUEST)){
			$astr = preg_split('/,/', $_REQUEST['arw']);
			$i = 0;
			foreach($astr as $a){
				$a_ = parse_arrow($a, $dim);
				if($a_) $arrows[$i++] = $a_;
			}
		}
		
		// Retrive default arrow colour
		$ac = $GREY;
		if(array_key_exists('ac', $_REQUEST)){
			$ac_ = parse_col($_REQUEST['ac']);
			if($ac_ && $ac_ != 't') $ac = $ac_;
		}
	
		// ---------------[ 3D Cube Generator properties ]---------------
	
		// Outline width
		$OUTLINE_WIDTH = 0.94;

		// Stroke width
		$sw = 0;

		// Viewport
		$ox = -0.9;
		$oy = -0.9;
		$vw = 1.8;
		$vh = 1.8;
	
		// ------------------[ 3D Cube Generator ]-----------------------

		// Set up cube for OLL view if specified
		if($view == 'plan'){
			$rtn = Array(Array(0, -90));
		}
	
		// All cube face points
		$p = Array();
		// Translation vector to centre the cube
		$t = Array(-$dim/2, -$dim/2, -$dim/2);
		// Translation vector to move the cube away from viewer
		$zpos = Array(0, 0, $dist);
		// Rotation vectors to track visibility of each face
		$rv = Array(Array(0, -1, 0), Array(1, 0, 0), Array(0, 0, -1), Array(0, 1, 0), Array(-1, 0, 0), Array(0, 0, 1));
		for($fc = 0; $fc < 6; $fc++){
			for($i = 0; $i <= $dim; $i++){
				for($j = 0; $j <= $dim; $j++){
					switch($fc){
						case $U : $p[$fc][$i][$j] = Array(       $i,    0, $dim - $j); break;
						case $R : $p[$fc][$i][$j] = Array(     $dim,   $j,        $i); break;
						case $F : $p[$fc][$i][$j] = Array(       $i,   $j,         0); break;
						case $D : $p[$fc][$i][$j] = Array(       $i, $dim,        $j); break;
						case $L : $p[$fc][$i][$j] = Array(        0,   $j, $dim - $i); break;
						case $B : $p[$fc][$i][$j] = Array($dim - $i,   $j,      $dim); break;
					}
					// Now scale and tranform point to ensure size/pos independent of dim
					$p[$fc][$i][$j] = translate($p[$fc][$i][$j], $t);
					$p[$fc][$i][$j] = scale($p[$fc][$i][$j], 1 / $dim);
					// Rotate cube as per perameter settings
					foreach($rtn as $rn){
						$p[$fc][$i][$j] = rotate($p[$fc][$i][$j], $rn[0], M_PI * $rn[1]/180);
					}
					// Move cube away from viewer
					$p[$fc][$i][$j] = translate($p[$fc][$i][$j], $zpos);
					// Finally project the 3D points onto 2D
					$p[$fc][$i][$j] = project($p[$fc][$i][$j], $zpos[2]);
				}
			}
			// Rotate rotation vectors
			foreach($rtn as $rn){
				$rv[$fc] = rotate($rv[$fc], $rn[0], M_PI * $rn[1]/180);
			}
		}
	
		// Sort render order (crappy bubble sort)
		$ro = Array(0, 1, 2, 3, 4, 5);
		for($i = 0; $i < 5; $i++){ for($j = 0; $j < 5; $j++){
			if($rv[$ro[$j]][2] < $rv[$ro[$j+1]][2]){
				$t = $ro[$j]; $ro[$j] = $ro[$j+1]; $ro[$j+1] = $t; }
		}}

		// Cube diagram SVG XML
		$cube = "<?xml version='1.0' standalone='no'?>
<!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 
'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>

<svg version='1.1' xmlns='http://www.w3.org/2000/svg'
	width='$size' height='$size'
	viewBox='$ox $oy $vw $vh'>\n";

	// Draw background
	if($bg) $cube .= "\t<rect fill='#$bg' x='$ox' y='$oy' width='$vw' height='$vh'/>\n";

		// Transparancy background rendering
		if($co < 100){
			// Create polygon for each background facelet (transparency only)
			$cube .= "\t<g opacity='$fo%' stroke-opacity='50%' stroke-width='$sw' stroke-linejoin='round'>\n";
			for($ri = 0; $ri < 3; $ri++){
				$cube .= facelet_svg($ro[$ri]);
			}
			$cube .= "\t</g>\n";
		
			// Create outline for each background face (transparency only)
			$cube .= "\t<g stroke-width='0.1' stroke-linejoin='round' opacity='$co%'>\n";	
			for($ri = 0; $ri < 3; $ri++)
				$cube .= outline_svg($ro[$ri]);
			$cube .= "\t</g>\n";	
		}

		// Create outline for each visible face
		$cube .= "\t<g stroke-width='0.1' stroke-linejoin='round' opacity='$co%'>\n";	
		for($ri = 3; $ri < 6; $ri++){
			if(face_visible($ro[$ri], $rv) || $co < 100)
				$cube .= outline_svg($ro[$ri]);
		}
		$cube .= "\t</g>\n";	

		// Create polygon for each visible facelet
		$cube .= "\t<g opacity='$fo%' stroke-opacity='50%' stroke-width='$sw' stroke-linejoin='round'>\n";
		for($ri = 3; $ri < 6; $ri++){
			if(face_visible($ro[$ri], $rv) || $co < 100)
				$cube .= facelet_svg($ro[$ri]);
		}
		$cube .= "\t</g>\n";
		
		// Create OLL view guides
		if($view == 'plan'){
			$cube .= "\t<g opacity='$fo%' stroke-opacity='100%' stroke-width='0.02' stroke-linejoin='round'>\n";
			$toRender = Array($F, $L, $B, $R);
			foreach($toRender as $fc)
				$cube .= oll_svg($fc);
			$cube .= "\t</g>\n";
		}
		
		// Draw Arrows
		if($arrows){
			$awidth = 0.12 / $dim;
			$cube .= "\t<g opacity='100%' stroke-opacity='100%' stroke-width='$awidth' stroke-linecap='round'>\n";
			foreach($arrows as $i => $a){
				$cube .= gen_arrow($i, $a[0], $a[1], $a[2], $a[4], $a[3]?$a[3]:$ac);
			}
			$cube .= "\t</g>\n";
		}
	
		$cube .= "</svg>\n";


		


		// Display cube
		if($DEBUG) echo $cube;
		else{
			$img = $fmt != 'svg' ? convert($cube, $fmt) : $cube;
			display_img($img, $fmt);
			
			// Cache image if enabled
			if($ENABLE_CACHE && !array_key_exists("nocache", $_REQUEST) && strlen($img) < $CACHE_IMG_SIZE_LIMIT){
				$req = mysql_real_escape_string($_SERVER['QUERY_STRING']);
				$rfr = mysql_real_escape_string($_SERVER['HTTP_REFERER']);
				$hash = md5($req);
				$img = mysql_real_escape_string($img);
				mysql_query("INSERT INTO vcache(hash, fmt, req, rfr, rcount, img) ".
						"VALUES ('$hash', '$fmt', '$req', '$rfr', 1, '$img')");
				// Disconnect from db
				mysql_close();
			}
		}
	}
	

	// -----------------[ User input functions ]----------------------
	
	// Parse colour value
	function parse_col($col){
		global $NAME_COL, $ABBR_COL;
		// As an abbriviation
		if(preg_match('/^[ndlswyrogbpmt]$/', $col))
			return $ABBR_COL[$col];
		// As a name
		if(array_key_exists($col, $NAME_COL))
			return $NAME_COL[$col];
		// As 12-bit colour
		if(preg_match('/^[0-9a-fA-F]{3}$/', $col))
			return $col[0].$col[0].$col[1].$col[1].$col[2].$col[2];
		// As 24-bit colour
		if(preg_match('/^[0-9a-fA-F]{6}$/', $col))
			return $col;
		// Otherwise fail
		return null;
	}
	
	// Parse arrow definition
	function parse_arrow($str, $dim){
		$parts = preg_split('/-/', $str);
		$fcodes = array('U' => 0, 'R' => 1, 'F' => 2, 'D' => 3, 'L' => 4, 'B' => 5);
		if(count($parts) == 0) return null;
		if(!preg_match_all('/([URFDLB])([0-9]+)/', $parts[0], $split) || count($split) < 2) return null;
		$arrow = array();
		$arrow[4] = 1;
		for($i = 0; $i < 3; $i++){
			if($i == 2 && count($split[1]) < 3){
				$arrow[2] = null;
				break;
			}
			else	$arrow[2][3] = 2;
			$arrow[$i][0] = $fcodes[$split[1][$i]];
			$fn = $split[2][$i]; $fn = $fn >= $dim * $dim ? $dim * $dim - 1 : $fn;
			$arrow[$i][1] = $fn % $dim;
			$arrow[$i][2] = floor($fn / $dim); 
		}
		// Parse remainder
		for($i = 1; $i < count($parts); $i++){
			if(preg_match('/^i[0-9]+$/', $parts[$i]) && $arrow[2]){
				$arrow[2][3] = substr($parts[$i],1) / 5;
				$arrow[2][3] = $arrow[2][3] > 10 ? 10 : $arrow[2][3]; // Var range = 0 to 50, default 10
			}
			else if(preg_match('/^s[0-9]+$/', $parts[$i])){
				$arrow[4] = substr($parts[$i],1) / 10; 
				$arrow[4] = $arrow[4] > 2 ? 2 : $arrow[4]; // Var range = 0 to 20, default 10
			}
			else{
				$ac_ = parse_col($parts[$i]);
				if($ac_) $arrow[3] = $ac_;
			}
		}
		return $arrow;	
	}

	// Insert space in default fd/fc variables
	function insert_space($in, $dim){
		$out = '';
		$dim *= $dim;
		for($i = 0; $i < 6; $i++){
			$out .= substr($in, $dim * $i, $dim) . ' ';
		}
		return $out;
	}


	// -------------------[ 3D Geometry Functions ]--------------------
	
	// Move point by translation vector
	function translate($p, $t){
		$p[0] += $t[0];
		$p[1] += $t[1];
		$p[2] += $t[2];
		return $p;
	}

	function scale($p, $f){
		$p[0] *= $f;
		$p[1] *= $f;
		$p[2] *= $f;
		return $p;
	}
	
	// Scale point relative to position vector
	function trans_scale($p, $v, $f){
		// Translate each facelet to cf
		$iv = Array(-$v[0], -$v[1], -$v[2]);
		return translate(scale(translate($p, $iv), $f), $v);		
	}

	function rotate($p, $ax, $an){
		$np = Array($p[0], $p[1], $p[2]);	
		switch($ax){
			case 0 :
				$np[2] = $p[2] * cos($an) - $p[1] * sin($an);
				$np[1] = $p[2] * sin($an) + $p[1] * cos($an);
				break;
			case 1 :
				$np[0] =   $p[0] * cos($an) + $p[2] * sin($an);
				$np[2] = - $p[0] * sin($an) + $p[2] * cos($an);
				break;
			case 2 :
				$np[0] = $p[0] * cos($an) - $p[1] * sin($an);
				$np[1] = $p[0] * sin($an) + $p[1] * cos($an);
				break;
		}
		return $np;
	}

	// Project 3D points onto a 2D plane
	function project($p, $d){
		return Array(
			$p[0] * $d / $p[2],
			$p[1] * $d / $p[2],
			$p[2] // Maintain z coordinate to allow use of rendering tricks
		);
	}

	// Returns whether a face is visible
	function face_visible($face, $rv){
		return $rv[$face][2] < -0.105;
	}




	// ---------------------------[ Rendering Functions ]----------------------------
	
	// Returns svg for a cube outline
	function outline_svg($fc){
		global $p, $dim, $cc, $OUTLINE_WIDTH; 
		return "\t\t<polygon fill='#$cc' stroke='#$cc' points='".
			$p[$fc][   0][   0][0]*$OUTLINE_WIDTH.','.$p[$fc][   0][   0][1]*$OUTLINE_WIDTH.' '.
			$p[$fc][$dim][   0][0]*$OUTLINE_WIDTH.','.$p[$fc][$dim][   0][1]*$OUTLINE_WIDTH.' '.
			$p[$fc][$dim][$dim][0]*$OUTLINE_WIDTH.','.$p[$fc][$dim][$dim][1]*$OUTLINE_WIDTH.' '.
			$p[$fc][   0][$dim][0]*$OUTLINE_WIDTH.','.$p[$fc][   0][$dim][1]*$OUTLINE_WIDTH."'/>\n";
	}

	// Returns svg for a faces facelets
	function facelet_svg($fc){
		global $p, $dim;
		$svg = '';
		for($i = 0; $i < $dim; $i++){
			for($j = 0; $j < $dim; $j++){
				// Find centre point of facelet
				$cf = Array(($p[$fc][$j  ][$i  ][0] + $p[$fc][$j+1][$i+1][0])/2,
					($p[$fc][$j  ][$i  ][1] + $p[$fc][$j+1][$i+1][1])/2, 0);
				// Scale points in towards centre
				$p1 = trans_scale($p[$fc][$j  ][$i  ], $cf, 0.85);
				$p2 = trans_scale($p[$fc][$j+1][$i  ], $cf, 0.85);
				$p3 = trans_scale($p[$fc][$j+1][$i+1], $cf, 0.85);
				$p4 = trans_scale($p[$fc][$j  ][$i+1], $cf, 0.85);
				// Generate facelet polygon
				$svg .= gen_facelet($p1, $p2, $p3, $p4, $fc * $dim * $dim + $i * $dim + $j);
			}
		}
		return $svg;	
	}
	
	// Renders the top rim of the R U L and B faces out from side of cube
	function oll_svg($fc){
		global $p, $dim, $rv;
		// Translation vector, to move faces out
		$tv1 = scale($rv[$fc], 0.00);
		$tv2 = scale($rv[$fc], 0.20);
		$i = 0;
		for($j = 0; $j < $dim; $j++){
				// Find centre point of facelet
				$cf = Array(($p[$fc][$j  ][$i  ][0] + $p[$fc][$j+1][$i+1][0])/2,
					($p[$fc][$j  ][$i  ][1] + $p[$fc][$j+1][$i+1][1])/2, 0);
				// Scale points in towards centre and skew
				$p1 = translate(trans_scale($p[$fc][$j  ][$i  ], $cf, 0.94), $tv1);
				$p2 = translate(trans_scale($p[$fc][$j+1][$i  ], $cf, 0.94), $tv1);
				$p3 = translate(trans_scale($p[$fc][$j+1][$i+1], $cf, 0.94), $tv2);
				$p4 = translate(trans_scale($p[$fc][$j  ][$i+1], $cf, 0.94), $tv2);
				// Generate facelet polygon
				$svg .= gen_facelet($p1, $p2, $p3, $p4, $fc * $dim * $dim + $i * $dim + $j);
				
		}
		return $svg;
	}
	
	/** Generates a polygon SVG tag for cube facelets */
	function gen_facelet($p1, $p2, $p3, $p4, $seq){
		global $ABBR_COL, $facelets, $scheme, $using_cols, $cc, $T;
		$fcol = $using_cols ? ($facelets[$seq] == 't' ? 't' : $ABBR_COL[$facelets[$seq]])
		                    : ($facelets[$seq] == $T ? 't' : $scheme[$facelets[$seq]]);
		return "\t\t<polygon fill='#".
			($fcol == 't' ? '000000' : $fcol)."' stroke='#$cc' ".
			($fcol == 't' ? "opacity='0' " : ' ' )."points='".
				$p1[0].','.$p1[1].' '.
				$p2[0].','.$p2[1].' '.
				$p3[0].','.$p3[1].' '.
				$p4[0].','.$p4[1]."'/>\n";
	}
	
	// Generates svg for an arrow pointing from sticker s1 to s2
	function gen_arrow($id, $s1, $s2, $sv, $sc, $col){
		global $p, $dim;
		if($col == 't') return;
		// Find centre point of each facelet
		$p1 = Array(($p[$s1[0]][$s1[1]][$s1[2]][0] + $p[$s1[0]][$s1[1]+1][$s1[2]+1][0])/2,
			($p[$s1[0]][$s1[1]][$s1[2]][1] + $p[$s1[0]][$s1[1]+1][$s1[2]+1][1])/2, 0);
		$p2 = Array(($p[$s2[0]][$s2[1]][$s2[2]][0] + $p[$s2[0]][$s2[1]+1][$s2[2]+1][0])/2,
			($p[$s2[0]][$s2[1]][$s2[2]][1] + $p[$s2[0]][$s2[1]+1][$s2[2]+1][1])/2, 0);
		// Find midpoint between p1 and p2
		$cp = Array(($p1[0] + $p2[0])/2, ($p1[1] + $p2[1])/2, 0);
		// Shorten arrows towards midpoint according to config
		$p1 = trans_scale($p1, $cp, $sc);
		$p2 = trans_scale($p2, $cp, $sc);
		if($sv){
			$pv = Array(($p[$sv[0]][$sv[1]][$sv[2]][0] + $p[$sv[0]][$sv[1]+1][$sv[2]+1][0])/2,
				($p[$sv[0]][$sv[1]][$sv[2]][1] + $p[$sv[0]][$sv[1]+1][$sv[2]+1][1])/2, 0);
			// Project via point double dist from centre point
			$pv = trans_scale($pv, $cp, $sv[3]);
		}
		// Calculate arrow rotation
		$p_ = $sv ? $pv : $p1;
		$rt = $p_[1] > $p2[1] ? 270 : 90;
		if($p2[0]-$p_[0] != 0){
			$rt = rad2deg(atan(($p2[1]-($p_[1]))/($p2[0]-$p_[0])));
			$rt = ($p_[0] > $p2[0]) ? $rt + 180 : $rt;
		}
		return '		<path d="M '.$p1[0].','.$p1[1].' '.($pv?'Q '.$pv[0].','.$pv[1]:'L').' '.$p2[0].','.$p2[1].'"
			style="fill:none;stroke:#'.$col.';stroke-opacity:1" />
		<path transform=" translate('.$p2[0].','.$p2[1].') scale('.(0.033 / $dim).') rotate('.$rt.')"
			d="M 5.77,0.0 L -2.88,5.0 L -2.88,-5.0 L 5.77,0.0 z"
			style="fill:#'.$col.';stroke-width:0;stroke-linejoin:round"/>'."\n";	
	}
	
	/** Converts svg into given format */
	function convert($svg, $fmt) {
		$opts = gen_image_opts($fmt);
		$descriptorspec = array(0 => array("pipe", "r"), 1 => array("pipe", "w"));
		$convert = proc_open("/usr/bin/convert $opts svg:- $fmt:-", $descriptorspec, $pipes);
		fwrite($pipes[0], $svg);
		fclose($pipes[0]);
		$img = null;
		while(!feof($pipes[1])) {
			$img .= fread($pipes[1], 1024);
		}
		fclose($pipes[1]);
		proc_close($convert);
		return $img;
	}
	
	/** Alternative version using files rather than pipes,
	not desired because of collission possibilities.. */
	function convert_file($svg, $fmt) {
		$svgfile = fopen("/tmp/visualcube.svg", 'w');
		fwrite($svgfile, $svg);
		fclose($svgfile);
		$opts = gen_image_opts($fmt);
		$rsvg = exec("/usr/bin/convert $opts /tmp/visualcube.svg /tmp/visualcube.$fmt");
		$imgfile = fopen("/tmp/visualcube.$fmt", 'r');
		$img = null;
		while($imgfile and !feof($imgfile)) {
			$img .= fread($imgfile, 1024);
		}
		fclose($imgfile);
		return $img;
	}
	
	/** Generate ImageMagic optoins depenting on format */
	function gen_image_opts($fmt){
		$opts = '';
//		$opts .= '+label "Generated by VisualCube"';
//		$opts .= ' -comment "Generated by VisualCube"';
//		$opts .= ' -caption "Generated by VisualCube"';
//		$opts = "-gaussian 1";
		switch($fmt){
			case 'png' : $opts .= " -background none -quality 100";
			break;
			case 'gif' : $opts .= " -background none";
			break;
			case 'ico' : $opts .= " -background none";
			break;
			case 'jpg' : $opts .= " -quality 90";
			break;
			
		}
		return $opts;
	}
	
	/** Sends image to browser */
	function display_img($img, $fmt){
		$mime = $fmt;
		switch($fmt){
			case 'jpe' : 
			case 'jpg' : $mime = 'jpeg'; break;
			case 'svg' : $mime = 'svg+xml'; break;
			case 'ico' : $mime = 'vnd.microsoft.icon'; break;
		}
		header("Content-type: image/$mime");
//		header("Content-Length: " . filesize($img) ."; "); 
		echo $img;
	}
	
	
	
	
	
	// -----------------------------[ DB Access Functions ]--------------------------
	
	// Return result of sql query as array
	function get_arrays($query){
		$result = mysql_query($query);
		$count = mysql_numrows($result);
		if($count <= 0) return null;
		$ary = Array($count);
		$i = 0;
		while($record = mysql_fetch_array($result, MYSQL_ASSOC)){
			$ary[$i] = $record;
			$i++;
		}
		return $ary;
	}
?>
