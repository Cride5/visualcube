<?php
/*
	File: cube_lib.php
	Date: 02 Apr 2010
	Author(s): Conrad Rider (www.crider.co.uk)
	Description: Php library for modelling a Rubik's cube

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
	along with VisualCube.  If not, see <http://www.gnu.org/licenses/>.
	
	Copyright (C) 2010 Conrad Rider
*/

	// Face constants
	global $U, $R, $F, $D, $L, $B;
	$U = 0; $R = 1; $F = 2; $D = 3; $L = 4; $B = 5;

	// Corner Constants
	global $URF, $UFL, $ULB, $UBR, $DFR, $DLF, $DBL, $DRB;
	$URF = 0; $UFL = 1; $ULB = 2; $UBR = 3; $DFR = 4; $DLF = 5; $DBL = 6; $DRB = 7;

	// Edge constants
	global $UR, $UF, $UL, $UB, $DR, $DF, $DL, $DB, $FR, $FL, $BL, $BR;
	$UR = 0; $UF = 1; $UL = 2; $UB = 3; $DR = 4; $DF = 5; $DL = 6; $DB = 7; $FR = 8; $FL = 9; $BL = 10; $BR = 11;

	// Mapping from face constants to face letters
	global $FACE_NAMES;
	$FACE_NAMES = Array(
		$U => 'u',
		$R => 'r',
		$F => 'f',
		$D => 'd',
		$L => 'l',
		$B => 'b',
	);
	
	// A solved cube
	global $SOLVED_CUBE;
	$SOLVED_CUBE = Array(
		Array( $U, $R, $F, $D, $L, $B ),
		Array( $URF, $UFL, $ULB, $UBR, $DFR, $DLF, $DBL, $DRB ),
		Array( 0, 0, 0, 0, 0, 0, 0, 0 ),
		Array( $UR, $UF, $UL, $UB, $DR, $DF, $DL, $DB, $FR, $FL, $BL, $BR ),
		Array( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ));
		
	// Partial cubes used to verify the correct parts are solved
	global $VCUBE;
	$VCUBE = Array(
		// Verify a solved first layer 2x2
		'2FL' => Array(
			Array( -1, -1, -1, -1, -1, -1 ),
			Array( -1, -1, -1, -1, $DFR, $DLF, $DBL, $DRB ),
			Array( -1, -1, -1, -1, 0, 0, 0, 0 ),
			Array( -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1 ),
			Array( -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1 )),
		// Verify an oriented first layer 2x2
		'2OFL' => Array(
			Array( -1, -1, -1, -1, -1, -1 ),
			Array( -1, -1, -1, -1, -1, -1, -1, -1),
			Array( -1, -1, -1, -1, 0, 0, 0, 0 ),
			Array( -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1 ),
			Array( -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1 )),
		// Verify orientation is completely solved for 2x2 PBL
		'2O' => Array(
			Array( -1, -1, -1, -1, -1, -1 ),
			Array( -1, -1, -1, -1, -1, -1, -1, -1 ),
			Array(  0, 0, 0, 0, 0, 0, 0, 0 ),
			Array( -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1 ),
			Array( -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1 )),
		// Verify a solved F2L on 3x3
		'F2L' => Array(
			Array( $U, $R, $F, $D, $L, $B ),
			Array( -1, -1, -1, -1, $DFR, $DLF, $DBL, $DRB ),
			Array( -1, -1, -1, -1, 0, 0, 0, 0 ),
			Array( -1, -1, -1, -1, $DR, $DF, $DL, $DB, $FR, $FL, $BL, $BR ),
			Array( -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0 )),
		// Verify a solved F2L and OCLL (for OCLL, COLL, ZBLL)
		'F2L_OCLL' => Array(
			Array( $U, $R, $F, $D, $L, $B ),
			Array( -1, -1, -1, -1, $DFR, $DLF, $DBL, $DRB ),
			Array( -1, -1, -1, -1, 0, 0, 0, 0 ),
			Array( -1, -1, -1, -1, $DR, $DF, $DL, $DB, $FR, $FL, $BL, $BR ),
			Array( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 )),
		// Verify a solved F2L and T OCLL (for T ZBLL)
		'F2L_OCLL_T' => Array(
			Array( $U, $R, $F, $D, $L, $B ),
			Array( -1, -1, -1, -1, $DFR, $DLF, $DBL, $DRB ),
			Array(  0,  1,  2,  0, 0, 0, 0, 0 ),
			Array( -1, -1, -1, -1, $DR, $DF, $DL, $DB, $FR, $FL, $BL, $BR ),
			Array( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 )),
		// Verify a solved F2L and U OCLL (for Headlights ZBLL)
		'F2L_OCLL_U' => Array(
			Array( $U, $R, $F, $D, $L, $B ),
			Array( -1, -1, -1, -1, $DFR, $DLF, $DBL, $DRB ),
			Array(  0,  2,  1,  0, 0, 0, 0, 0 ),
			Array( -1, -1, -1, -1, $DR, $DF, $DL, $DB, $FR, $FL, $BL, $BR ),
			Array( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 )),
		// Verify a solved F2L and L OCLL (for L ZBLL)
		'F2L_OCLL_L' => Array(
			Array( $U, $R, $F, $D, $L, $B ),
			Array( -1, -1, -1, -1, $DFR, $DLF, $DBL, $DRB ),
			Array(  0,  2,  0,  1, 0, 0, 0, 0 ),
			Array( -1, -1, -1, -1, $DR, $DF, $DL, $DB, $FR, $FL, $BL, $BR ),
			Array( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 )),
		// Verify a solved F2L and H OCLL (for H ZBLL)
		'F2L_OCLL_H' => Array(
			Array( $U, $R, $F, $D, $L, $B ),
			Array( -1, -1, -1, -1, $DFR, $DLF, $DBL, $DRB ),
			Array(  2,  1,  2,  1, 0, 0, 0, 0 ),
			Array( -1, -1, -1, -1, $DR, $DF, $DL, $DB, $FR, $FL, $BL, $BR ),
			Array( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 )),
		// Verify a solved F2L and PI OCLL (for PI ZBLL)
		'F2L_OCLL_PI' => Array(
			Array( $U, $R, $F, $D, $L, $B ),
			Array( -1, -1, -1, -1, $DFR, $DLF, $DBL, $DRB ),
			Array(  1,  2,  2,  1, 0, 0, 0, 0 ),
			Array( -1, -1, -1, -1, $DR, $DF, $DL, $DB, $FR, $FL, $BL, $BR ),
			Array( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 )),
		// Verify a solved F2L and Sune OCLL (for Sune ZBLL)
		'F2L_OCLL_S' => Array(
			Array( $U, $R, $F, $D, $L, $B ),
			Array( -1, -1, -1, -1, $DFR, $DLF, $DBL, $DRB ),
			Array(  0,  2,  2,  2, 0, 0, 0, 0 ),
			Array( -1, -1, -1, -1, $DR, $DF, $DL, $DB, $FR, $FL, $BL, $BR ),
			Array( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 )),
		// Verify a solved F2L and Anti-sune OCLL (for Anti-sune ZBLL)
		'F2L_OCLL_AS' => Array(
			Array( $U, $R, $F, $D, $L, $B ),
			Array( -1, -1, -1, -1, $DFR, $DLF, $DBL, $DRB ),
			Array(  1,  0,  1,  1, 0, 0, 0, 0 ),
			Array( -1, -1, -1, -1, $DR, $DF, $DL, $DB, $FR, $FL, $BL, $BR ),
			Array( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 )),
		// Verify a solved F2L and OLL (for PLL)
		'F2L_OLL' => Array(
			Array( $U, $R, $F, $D, $L, $B ),
			Array( -1, -1, -1, -1, $DFR, $DLF, $DBL, $DRB ),
			Array(  0,  0,  0,  0, 0, 0, 0, 0 ),
			Array( -1, -1, -1, -1, $DR, $DF, $DL, $DB, $FR, $FL, $BL, $BR ),
			Array(  0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0, 0 )),
		// Verify a solved F2L and LL corners (for ELL)
		'F2L_CLL' => Array(
			Array( $U, $R, $F, $D, $L, $B ),
			Array( $URF, $UFL, $ULB, $UBR, $DFR, $DLF, $DBL, $DRB ),
			Array( 0, 0, 0, 0, 0, 0, 0, 0 ),
			Array( -1, -1, -1, -1, $DR, $DF, $DL, $DB, $FR, $FL, $BL, $BR ),
			Array( -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0 )),
		// Verify a solved F2B (for CMLL)
		'F2B' => Array(
			Array( -1, $R, -1, -1, $L, -1 ),
			Array( -1, -1, -1, -1, $DFR, $DLF, $DBL, $DRB ),
			Array( -1, -1, -1, -1, 0, 0, 0, 0 ),
			Array( -1, -1, -1, -1, $DR, -1, $DL, -1, $FR, $FL, $BL, $BR ),
			Array( -1, -1, -1, -1, 0, -1, 0, -1, 0, 0, 0, 0 )),
		// Verify a solved F2L minus last slot (for ELS)
		'F2LS' => Array(
			Array( $U, $R, $F, $D, $L, $B ),
			Array( -1, -1, -1, -1, -1, $DLF, $DBL, $DRB ),
			Array( -1, -1, -1, -1, -1, 0, 0, 0 ),
			Array( -1, -1, -1, -1, $DR, $DF, $DL, $DB, -1, $FL, $BL, $BR ),
			Array( -1, -1, -1, -1, 0, 0, 0, 0, -1, 0, 0, 0 )),
		// Verify a solved F2L, minus last slot, with EO and solved FR (for CLS)
		'F2LS_EO' => Array(
			Array( $U, $R, $F, $D, $L, $B ),
			Array( -1, -1, -1, -1, -1, $DLF, $DBL, $DRB ),
			Array( -1, -1, -1, -1, -1, 0, 0, 0 ),
			Array( -1, -1, -1, -1, $DR, $DF, $DL, $DB, $FR, $FL, $BL, $BR ),
			Array( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ))
	);
	
	// An array storing all cubie-level moves
	global $CUBIE_MOVES;
	$CUBIE_MOVES = Array(
		Array( // U
			Array( $U, $R, $F, $D, $L, $B ),
			Array( $UBR, $URF, $UFL, $ULB, $DFR, $DLF, $DBL, $DRB ),
			Array( 0, 0, 0, 0, 0, 0, 0, 0 ),
			Array( $UB, $UR, $UF, $UL, $DR, $DF, $DL, $DB, $FR, $FL, $BL, $BR ),
			Array( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 )),
		Array( // R
			Array( $U, $R, $F, $D, $L, $B ),
			Array( $DFR, $UFL, $ULB, $URF, $DRB, $DLF, $DBL, $UBR ),
			Array( 2, 0, 0, 1, 1, 0, 0, 2 ),
			Array( $FR, $UF, $UL, $UB, $BR, $DF, $DL, $DB, $DR, $FL, $BL, $UR ),
			Array( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 )),
		Array( // F
			Array( $U, $R, $F, $D, $L, $B ),
			Array( $UFL, $DLF, $ULB, $UBR, $URF, $DFR, $DBL, $DRB ),
			Array( 1, 2, 0, 0, 2, 1, 0, 0 ),
			Array( $UR, $FL, $UL, $UB, $DR, $FR, $DL, $DB, $UF, $DF, $BL, $BR ),
			Array( 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0 )),
		Array( // D
			Array( $U, $R, $F, $D, $L, $B ),
			Array( $URF, $UFL, $ULB, $UBR, $DLF, $DBL, $DRB, $DFR ),
			Array( 0, 0, 0, 0, 0, 0, 0, 0 ),
			Array( $UR, $UF, $UL, $UB, $DF, $DL, $DB, $DR, $FR, $FL, $BL, $BR ),
			Array( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 )),
		Array( // L
			Array( $U, $R, $F, $D, $L, $B ),
			Array( $URF, $ULB, $DBL, $UBR, $DFR, $UFL, $DLF, $DRB ),
			Array( 0, 1, 2, 0, 0, 2, 1, 0 ),
			Array( $UR, $UF, $BL, $UB, $DR, $DF, $FL, $DB, $FR, $UL, $DL, $BR ),
			Array( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 )),
		Array( // B
			Array( $U, $R, $F, $D, $L, $B ),
			Array( $URF, $UFL, $UBR, $DRB, $DFR, $DLF, $ULB, $DBL ),
			Array( 0, 0, 1, 2, 0, 0, 2, 1 ),
			Array( $UR, $UF, $UL, $BR, $DR, $DF, $DL, $BL, $FR, $FL, $UB, $DB ),
			Array( 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1 )),
		Array( // E
			Array( $U, $F, $L, $D, $B, $R ),
			Array( $URF, $UFL, $ULB, $UBR, $DFR, $DLF, $DBL, $DRB ),
			Array( 0, 0, 0, 0, 0, 0, 0, 0 ),
			Array( $UR, $UF, $UL, $UB, $DR, $DF, $DL, $DB, $FL, $BL, $BR, $FR ),
			Array( 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1 )),
		Array( // M
			Array( $B, $R, $U, $F, $L, $D ),
			Array( $URF, $UFL, $ULB, $UBR, $DFR, $DLF, $DBL, $DRB ),
			Array( 0, 0, 0, 0, 0, 0, 0, 0 ),
			Array( $UR, $UB, $UL, $DB, $DR, $UF, $DL, $DF, $FR, $FL, $BL, $BR ),
			Array( 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0 )),
		Array( // S
			Array( $L, $U, $F, $R, $D, $B ),
			Array( $URF, $UFL, $ULB, $UBR, $DFR, $DLF, $DBL, $DRB ),
			Array( 0, 0, 0, 0, 0, 0, 0, 0 ),
			Array( $UL, $UF, $DL, $UB, $UR, $DF, $DR, $DB, $FR, $FL, $BL, $BR ),
			Array( 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0 )));

	// Now that the elementry moves are defined, the rest of the moves can be built
	$CUBIE_MOVES = Array(
		$CUBIE_MOVES[0],
		$CUBIE_MOVES[1],
		$CUBIE_MOVES[2],
		$CUBIE_MOVES[3],
		$CUBIE_MOVES[4],
		$CUBIE_MOVES[5],
		prod(array_copy($CUBIE_MOVES[0]), $CUBIE_MOVES[6], 3),
		prod(array_copy($CUBIE_MOVES[1]), $CUBIE_MOVES[7], 3),
		prod(array_copy($CUBIE_MOVES[2]), $CUBIE_MOVES[8], 1),
		prod(array_copy($CUBIE_MOVES[3]), $CUBIE_MOVES[6], 1),
		prod(array_copy($CUBIE_MOVES[4]), $CUBIE_MOVES[7], 1),
		prod(array_copy($CUBIE_MOVES[5]), $CUBIE_MOVES[8], 3),
		$CUBIE_MOVES[6],
		$CUBIE_MOVES[7],
		$CUBIE_MOVES[8],
		prod(prod(array_copy($CUBIE_MOVES[0]), $CUBIE_MOVES[3], 3), $CUBIE_MOVES[6], 3),
		prod(prod(array_copy($CUBIE_MOVES[1]), $CUBIE_MOVES[4], 3), $CUBIE_MOVES[7], 3),
		prod(prod(array_copy($CUBIE_MOVES[2]), $CUBIE_MOVES[5], 3), $CUBIE_MOVES[8], 1));
		
	// Mapping from power to chr to represent it
	global $ALG_POW;
	$ALG_POW = Array ('', "2", "'");
	
	// Returns the case identified by this alg (or -1 if not belonging to group),
	// as well an amended alg with any rotations required to make it fit the group
	function gen_state($moves, $puzzle, $group_id, $is_ll){
		global $SOLVED_CUBE, $CUBIE_MOVES, $VCUBE;

//println("\nGENSTATE:\ninput moves=$moves");
		$moves = trim_rotations($moves, $is_ll);
	
//println("trimmed moves=$moves");
		
		// 1. Apply different combinations of initial
		// and final moves until a solved state is found
		$prtns = Array("", "x", "x'", "x2", "z", "z'", "y", "y'");
		$frtns = Array("", "x", "x'", "x2", "z", "z'", "y", "y'");
		$valid = false;
		for($i = 0; $i < count($frtns) && !$valid; $i++){
			for($j = 0; $j < count($prtns) && !$valid; $j++){
				$cube = case_cube($prtns[$j].$moves.$frtns[$i]);
//println("testing cube: ".$prtns[$j].$moves.$frtns[$i]);
//printcube($cube, 3);
				if(is_member($cube, $group_id)){
					$prtn = $prtns[$j];
					$frtn = $frtns[$i];
					$moves = "$prtn$moves$frtn";
					$valid = true;
				}
			}
		}
		// Stop here if alg not valid
		if(!$valid) return Array(-1, $moves);

//println("corrected moves=$prtn$moves$frtn");		
		
		// 2. Find angle to apply alg which results in lowest state id
		// This is necessery to ensure all rotations of same alg are given same state
		// Generate 4 case cubes
		$cubes = case_cubes2($moves, Array("", "y", "y2", "y'"));
		$state = PHP_INT_MAX;
		foreach($cubes as $cube){
//printcube($cube, 3);
			// Check cube from all y rotation angles
			for($i = 0; $i < 4; $i++){
				// Generate identifier for state (depends on alg purpose)
				$s = cube_state($cube, $group_id);
//println($s);
				// Set it as main ID if lowest found so-far
				if($s < $state && $s != -1) $state = $s;
				// Rotate cube by y
				$cube = prod($cube, $CUBIE_MOVES[move_id('y')], 1);
			}
		}
//println("detected state=$state");
		// Return cube state and moves which make cube state valid
		return Array($state, $prtn, $frtn);
	}
	// Rotate input alg to match reference alg's orientation and output corrected alg
	function orient_alg($alg, $ref, $puzzle, $group_id){
		global $SOLVED_CUBE, $CUBIE_MOVES, $ALG_POW;
		// Remove initial y rotations from alg
		$alg = preg_replace('/^y[2\']?/', '', $alg);
		$cubes = case_cubes2($alg, Array("", "y", "y2", "y'"));
		$ref_cube = case_cube($ref);
//print_r2($ref_cube[1]);
//print_r2($ref_cube[3]);

		$match = false;
		foreach($cubes as $cube){
			// Now apply up to 3 y twists until the case matches
			$r = 0;
			while(!$match && $r < 4){
				// Detection of identical case (inc cube oriented correctly)
				// For OLL all LL orientations should match
				switch($group_id){
					case  1: // OLL
						$match = match(array_slice($cube[2], 0, 4), array_slice($ref_cube[2], 0, 4)); // CO
						break;
					case  2: // PBL (permutation of all corners)
						$match = match($cube[1], $ref_cube[1]); // CP
						break;
					case  3: // CLL (LL orientation + permutation)
						$match = match(array_slice($cube[2], 0, 4), array_slice($ref_cube[2], 0, 4)) // CO
							&& match(array_slice($cube[1], 0, 4), array_slice($ref_cube[1], 0, 4)); // CP
						break;
					case  4: // OLL
						$match = match(array_slice($cube[2], 0, 4), array_slice($ref_cube[2], 0, 4)) // CO
							&& match(array_slice($cube[4], 0, 4), array_slice($ref_cube[4], 0, 4)); // EO
						break;
					case  5: // PLL
						$match = match(array_slice($cube[1], 0, 4), array_slice($ref_cube[1], 0, 4)) // CP
							&& match(array_slice($cube[3], 0, 4), array_slice($ref_cube[3], 0, 4)); // EP
						break;
					case  6: // CLL
						$match = match(array_slice($cube[1], 0, 4), array_slice($ref_cube[1], 0, 4)) // CP
							&& match(array_slice($cube[2], 0, 4), array_slice($ref_cube[2], 0, 4)); // CO
						break;
					case  7: // ELL
						$match = match(array_slice($cube[3], 0, 4), array_slice($ref_cube[3], 0, 4)) // EP
							&& match(array_slice($cube[4], 0, 4), array_slice($ref_cube[4], 0, 4)); // EO
						break;
					case  8: // CMLL
						$match = match(array_slice($cube[1], 0, 4), array_slice($ref_cube[1], 0, 4)) // CP
							&& match(array_slice($cube[2], 0, 4), array_slice($ref_cube[2], 0, 4)); // CO
						break;
					case  9: // COLL
						$match = match(array_slice($cube[1], 0, 4), array_slice($ref_cube[1], 0, 4)) // CP
							&& match(array_slice($cube[2], 0, 4), array_slice($ref_cube[2], 0, 4)); // CO
						break;
					case 10: // ZBLL
						$match = match(array_slice($cube[1], 0, 4), array_slice($ref_cube[1], 0, 4)) // CP
							&& match(array_slice($cube[2], 0, 4), array_slice($ref_cube[2], 0, 4)) // CO
							&& match(array_slice($cube[3], 0, 4), array_slice($ref_cube[3], 0, 4)); // EP
						break;
					case 11: // ELS
						$match = match(array_slice($cube[4], 0, 4), array_slice($ref_cube[4], 0, 4)) // EO
							&& els_FR($cube) == els_FR($ref_cube);
						break;
					case 12: // CLS 
						match(array_slice($cube[2], 0, 4), array_slice($ref_cube[2], 0, 4)); // CO
						break;
					case 13: // ZBLL-T
						$match = match(array_slice($cube[1], 0, 4), array_slice($ref_cube[1], 0, 4)) // CP
							&& match(array_slice($cube[2], 0, 4), array_slice($ref_cube[2], 0, 4)) // CO
							&& match(array_slice($cube[3], 0, 4), array_slice($ref_cube[3], 0, 4)); // EP
						break;
					case 14: // ZBLL-U
						$match = match(array_slice($cube[1], 0, 4), array_slice($ref_cube[1], 0, 4)) // CP
							&& match(array_slice($cube[2], 0, 4), array_slice($ref_cube[2], 0, 4)) // CO
							&& match(array_slice($cube[3], 0, 4), array_slice($ref_cube[3], 0, 4)); // EP
						break;
					case 15: // ZBLL-L
						$match = match(array_slice($cube[1], 0, 4), array_slice($ref_cube[1], 0, 4)) // CP
							&& match(array_slice($cube[2], 0, 4), array_slice($ref_cube[2], 0, 4)) // CO
							&& match(array_slice($cube[3], 0, 4), array_slice($ref_cube[3], 0, 4)); // EP
						break;
					case 16: // ZBLL-H
						$match = match(array_slice($cube[1], 0, 4), array_slice($ref_cube[1], 0, 4)) // CP
							&& match(array_slice($cube[2], 0, 4), array_slice($ref_cube[2], 0, 4)) // CO
							&& match(array_slice($cube[3], 0, 4), array_slice($ref_cube[3], 0, 4)); // EP
						break;
					case 17: // ZBLL-Pi
						$match = match(array_slice($cube[1], 0, 4), array_slice($ref_cube[1], 0, 4)) // CP
							&& match(array_slice($cube[2], 0, 4), array_slice($ref_cube[2], 0, 4)) // CO
							&& match(array_slice($cube[3], 0, 4), array_slice($ref_cube[3], 0, 4)); // EP
						break;
					case 18: // ZBLL-S
						$match = match(array_slice($cube[1], 0, 4), array_slice($ref_cube[1], 0, 4)) // CP
							&& match(array_slice($cube[2], 0, 4), array_slice($ref_cube[2], 0, 4)) // CO
							&& match(array_slice($cube[3], 0, 4), array_slice($ref_cube[3], 0, 4)); // EP
						break;
					case 19: // ZBLL-As
						$match = match(array_slice($cube[1], 0, 4), array_slice($ref_cube[1], 0, 4)) // CP
							&& match(array_slice($cube[2], 0, 4), array_slice($ref_cube[2], 0, 4)) // CO
							&& match(array_slice($cube[3], 0, 4), array_slice($ref_cube[3], 0, 4)); // EP
						break;
				}
//if($match) println("r:$r true");
//else println("r:$r false");
//print_r2($cube[1]);
//print_r2($cube[3]);
				// If no match found rotate cube and incrament rotation counter
				if(!$match){
					$cube = prod($cube, $CUBIE_MOVES[move_id('y')], 1);
					$r++;
				}
			}
			if($match) break;
		}
		// Rotation required is the inverse of rotations used to match case
		if($r > 0) $alg = "y".$ALG_POW[3 - $r].$alg;
		return $alg;
	}
	// Returns the location of the FR edge for ELS
	function els_FR($cube){
		global $FR;
		$frp = 0; // assuming its in position
		for($j = 0; $j < 4; $j++){ if($cube[3][$j] == $FR){ $frp = $i + 1; break; }}
		return $frp;
	}
	
// TODO: This function failes on alg... x' U' R U L' U2 R' U' L' U' L2 u r2 U' z ... part of ZBLL-PI, or H
// U' l2 u R2 U' R' U' L' U2 R' U L U' ... from ZBLL-PI
	// Returns true if the cube state is a member of the given group
	function is_member($cube, $group_id){
//echo "is member of? $group_id :";
//printcube($cube, 3);
		global $CUBIE_MOVES;
		// Check cube from all y rotation angles
		for($i = 0; $i < 4; $i++){
//println("|".$cube[2][0].", ".$cube[2][1].", ".$cube[2][2].", ".$cube[2][3]."|");
//printcube($cube, 3);
			for($j = 0; $j < 4; $j++){
				if(is_member_strict($cube, $group_id)) return true;
				// Rotate cube
				$cube = prod($cube, $CUBIE_MOVES[move_id('y')], 1);
			}
			// Rotate U-Layer
			$cube = prod($cube, $CUBIE_MOVES[move_id('U')], 1);
		}
		return false;
	}
	
	// Returns true if the cube state is a member of the given group when AUF is allowed
	function is_member_auf($cube, $group_id){
//echo "is member of? $group_id :";
//printcube($cube, 3);
		global $CUBIE_MOVES;
		// Check cube from all auf rotation angles
		for($i = 0; $i < 4; $i++){
//println("|".$cube[2][0].", ".$cube[2][1].", ".$cube[2][2].", ".$cube[2][3]."|");
//printcube($cube, 3);
			if(is_member_strict($cube, $group_id)) return true;
			// Rotate U-Layer
			$cube = prod($cube, $CUBIE_MOVES[move_id('U')], 1);
		}
		return false;
	}
	
	function is_member_strict($cube, $group_id){
		global $VCUBE;
		switch($group_id){
			case  1: if(match($cube, $VCUBE['2OFL']    )) return true; break; // OLL
			case  2: if(match($cube, $VCUBE['2O']      )) return true; break; // PBL
			case  3: if(match($cube, $VCUBE['2FL']     )) return true; break; // CLL
			case  4: if(match($cube, $VCUBE['F2L']     )) return true; break; // OLL
			case  5: if(match($cube, $VCUBE['F2L_OLL'] )) return true; break; // PLL
			case  6: if(match($cube, $VCUBE['F2L']     )) return true; break; // CLL
			case  7: if(match($cube, $VCUBE['F2L_CLL'] )) return true; break; // ELL
			case  8: if(match($cube, $VCUBE['F2B']     )) return true; break; // CMLL
			case  9: if(match($cube, $VCUBE['F2L_OCLL'])) return true; break; // COLL
			case 10: if(match($cube, $VCUBE['F2L_OCLL'])) return true; break; // ZBLL
			case 11: if(match($cube, $VCUBE['F2LS']    )) return true; break; // ELS
			case 12: if(match($cube, $VCUBE['F2LS_EO'] )) return true; break; // CLS
			case 13: if(match($cube, $VCUBE['F2L_OCLL_T'])) return true; break; // ZBLL-T
			case 14: if(match($cube, $VCUBE['F2L_OCLL_U'])) return true; break; // ZBLL-U
			case 15: if(match($cube, $VCUBE['F2L_OCLL_L'])) return true; break; // ZBLL-L
			case 16: if(match($cube, $VCUBE['F2L_OCLL_H'])) return true; break; // ZBLL-H
			case 17: if(match($cube, $VCUBE['F2L_OCLL_PI'])) return true; break; // ZBLL-PI
			case 18: if(match($cube, $VCUBE['F2L_OCLL_S'])) return true; break; // ZBLL-S
			case 19: if(match($cube, $VCUBE['F2L_OCLL_AS'])) return true; break; // ZBLL-AS
		}
		return false;
	}
	
	// Returns a value uniquely identifying this cube state in this group
	function cube_state($cube, $group_id){
		switch($group_id){
			case  1: return encode_o(array_slice($cube[2], 0, 3), 3); // CO   (2x2 OLL)
			case  2: return encode_p($cube[1]); // CP (all corners)           (PBL)
			case  3: return encode_o(array_slice($cube[2], 0, 3), 3) // CO    (2x2 CLL)
				+ encode_p(array_slice($cube[1], 0, 4)) * 27; // CP
			case  4: return encode_o(array_slice($cube[2], 0, 3), 3) // CO    (OLL)
				+ encode_o(array_slice($cube[4], 0, 3), 2) * 27; // EO (* 3^3)
			case  5: return encode_p(array_slice($cube[1], 0, 4), 3) // CP    (PLL)
				+ encode_p(array_slice($cube[3], 0, 4)) * 24; // EO (* 4!)
			case  6: return encode_o(array_slice($cube[2], 0, 3), 3) // CO     (CLL)
				+ encode_p(array_slice($cube[1], 0, 4)) * 27; // CP
			case  7: return encode_o(array_slice($cube[4], 0, 3), 2) // EO     (ELL)
				+ encode_p(array_slice($cube[3], 0, 4)) * 8; // EP
			case  8: return encode_o(array_slice($cube[2], 0, 3), 3) // CO     (CMLL)
				+ encode_p(array_slice($cube[1], 0, 4)) * 27; // CP
			case  9: return encode_o(array_slice($cube[2], 0, 3), 3) // CO     (COLL)
				+ encode_p(array_slice($cube[1], 0, 4)) * 27; // CP
			case 10: return encode_o(array_slice($cube[2], 0, 3), 3) // CO    (ZBLL)
				+ encode_p(array_slice($cube[1], 0, 4)) * 27 // CP
				+ encode_p(array_slice($cube[3], 0, 4)) * 27 * 24; // EP
			case 11: // ELS
				// This must encode orientation of the 4 top edges (fifth is determined by other 4)
				// along with the position of the FR edge
				return encode_o(array_slice($cube[4], 0, 4), 2)
				+ els_FR($cube) * 16; // EO(5 edges) + position of FR
			case 12: // CLS must track the orientation of the 5 corners (determined by o of 4 top ones)
				return encode_o(array_slice($cube[2], 0, 4), 3); // CO
			case 13: return encode_o(array_slice($cube[2], 0, 3), 3) // CO    (ZBLL-T)
				+ encode_p(array_slice($cube[1], 0, 4)) * 27 // CP
				+ encode_p(array_slice($cube[3], 0, 4)) * 27 * 24; // EP
			case 14: return encode_o(array_slice($cube[2], 0, 3), 3) // CO    (ZBLL-U)
				+ encode_p(array_slice($cube[1], 0, 4)) * 27 // CP
				+ encode_p(array_slice($cube[3], 0, 4)) * 27 * 24; // EP
			case 15: return encode_o(array_slice($cube[2], 0, 3), 3) // CO    (ZBLL-L)
				+ encode_p(array_slice($cube[1], 0, 4)) * 27 // CP
				+ encode_p(array_slice($cube[3], 0, 4)) * 27 * 24; // EP
			case 16: return encode_o(array_slice($cube[2], 0, 3), 3) // CO    (ZBLL-Pi)
				+ encode_p(array_slice($cube[1], 0, 4)) * 27 // CP
				+ encode_p(array_slice($cube[3], 0, 4)) * 27 * 24; // EP
			case 17: return encode_o(array_slice($cube[2], 0, 3), 3) // CO    (ZBLL-H)
				+ encode_p(array_slice($cube[1], 0, 4)) * 27 // CP
				+ encode_p(array_slice($cube[3], 0, 4)) * 27 * 24; // EP
			case 18: return encode_o(array_slice($cube[2], 0, 3), 3) // CO    (ZBLL-S)
				+ encode_p(array_slice($cube[1], 0, 4)) * 27 // CP
				+ encode_p(array_slice($cube[3], 0, 4)) * 27 * 24; // EP
			case 19: return encode_o(array_slice($cube[2], 0, 3), 3) // CO    (ZBLL-AS)
				+ encode_p(array_slice($cube[1], 0, 4)) * 27 // CP
				+ encode_p(array_slice($cube[3], 0, 4)) * 27 * 24; // EP
		}
		return -1;
	}
	// Returs the cube-state the given alg solves
	function case_cube($alg){
		global $SOLVED_CUBE, $F2L_CUBE, $CUBIE_MOVES;
		// Apply inverse to get state which alg solves
		$alg = invert_alg($alg);
		$cube = array_copy($SOLVED_CUBE);
		return apply_alg($alg, $cube);
	}
	// Returns a set of case cubes representing the state of the
	// cube the alg solves, given the rotation was applied first
	function case_cubes($alg, $prerot){
		global $SOLVED_CUBE;
		// Apply inverse to get state which alg solves
		$alg = invert_alg($alg);
		foreach($prerot as $i => $rtn){
			$cubes[$i] = apply_alg($alg.invert_alg($rtn), array_copy($SOLVED_CUBE));
		}
		return $cubes;
	}
	// Returns a set of case cubes representing the state of the
	// cube the alg solves, given the rotation was applied last
	function case_cubes2($alg, $postrot){
		global $SOLVED_CUBE;
		// Apply inverse to get state which alg solves
		$alg = invert_alg($alg);
		foreach($postrot as $i => $rtn){
			$cubes[$i] = apply_alg(invert_alg($rtn).$alg, array_copy($SOLVED_CUBE));
		}
		return $cubes;
	}
	// Returns the move required to rotate the cube to an upright position
	function upright($cube){
		global $U, $R, $F, $D, $L, $B, $CUBIE_MOVES;
		// search for U face centre
		$upos = 0;
		foreach($cube[0] as $i => $c){
			if($c == $U){
				$upos = $i;
				break;
			}
		}
		$move = "";
		switch($upos){
			case $R : $move = "z'"; break;
			case $L : $move = "z"; break;
			case $F : $move = "x"; break;
			case $B : $move = "x'"; break;
			case $D : $move = "x2"; break;
		}
		return $move;
	}
	
	// Convert cubie cube to face cube, using the default facelet identifiers
	function face_cube($cube, $dim){
		// Construct default facelet id scheme
		for($f = 0; $f < 6; $f++){
			for($i = 0; $i < $dim; $i++){
				for($j = 0; $j < $dim; $j++) $fd .= $f;
			}
		}
		return facelet_cube($cube, $dim, $fd);
	}
	
	
	// Convert cubie cube to facelet cube mapping each facelet
	// to the given facelet id sequence
	function facelet_cube($cube, $d, $fi){
		global $U, $R, $F, $D, $L, $B;
		// Facelet constants
		
		// Dimension/2
		$h = (int)($d/2);
		// Dimension squared
		$s = $d * $d;
		// Half of dimension squared
		$m = (int)($s/2);
		
		// Map centre positions to facelet ids
		$mfid = Array($fi[$U*$s+$m], $fi[$R*$s+$m], $fi[$F*$s+$m], $fi[$D*$s+$m], $fi[$L*$s+$m], $fi[$B*$s+$m]);

		// Map the corner positions to facelet ids
		$cfid = Array(
			Array($fi[ ($U+1)*$s-1], $fi[      $R*$s], $fi[  $F*$s+$d-1]),
			Array($fi[($U+1)*$s-$d], $fi[      $F*$s], $fi[  $L*$s+$d-1]),
			Array($fi[       $U*$s], $fi[      $L*$s], $fi[  $B*$s+$d-1]),
			Array($fi[  $U*$s+$d-1], $fi[      $B*$s], $fi[  $R*$s+$d-1]),
			Array($fi[  $D*$s+$d-1], $fi[($F+1)*$s-1], $fi[($R+1)*$s-$d]),
			Array($fi[       $D*$s], $fi[($L+1)*$s-1], $fi[($F+1)*$s-$d]),
			Array($fi[($D+1)*$s-$d], $fi[($B+1)*$s-1], $fi[($L+1)*$s-$d]),
			Array($fi[ ($D+1)*$s-1], $fi[($R+1)*$s-1], $fi[($B+1)*$s-$d]));
		
		// Map the edge positions to facelet ids
		$efid = Array(
			Array($fi[$U*$s+$m+$h], $fi[      $R*$s+$h]), Array($fi[($U+1)*$s-1-$h], $fi[      $F*$s+$h]),
			Array($fi[$U*$s+$m-$h], $fi[      $L*$s+$h]), Array($fi[      $U*$s+$h], $fi[      $B*$s+$h]),
			Array($fi[$D*$s+$m+$h], $fi[($R+1)*$s-1-$h]), Array($fi[      $D*$s+$h], $fi[($F+1)*$s-1-$h]),
			Array($fi[$D*$s+$m-$h], $fi[($L+1)*$s-1-$h]), Array($fi[($D+1)*$s-1-$h], $fi[($B+1)*$s-1-$h]),
			Array($fi[$F*$s+$m+$h], $fi[   $R*$s+$m-$h]), Array($fi[   $F*$s+$m-$h], $fi[   $L*$s+$m+$h]),
			Array($fi[$B*$s+$m+$h], $fi[   $L*$s+$m-$h]), Array($fi[   $B*$s+$m-$h], $fi[   $R*$s+$m+$h]));
			


//print_r($efid);
/*
		// Map the corner positions to facelets
		$ccol = Array(
			Array($U, $R, $F), Array($U, $F, $L), Array($U, $L, $B), Array($U, $B, $R),
			Array($D, $F, $R), Array($D, $L, $F), Array($D, $B, $L), Array($D, $R, $B));
		
		// Map the edge positions to facelets
		$ecol = Array(
			Array($U, $R), Array($U, $F), Array($U, $L),
			Array($U, $B), Array($D, $R), Array($D, $F),
			Array($D, $L), Array($D, $B), Array($F, $R),
			Array($F, $L), Array($B, $L), Array($B, $R));
*/
		// Map of centre facelet positions
		$mpos = Array($U*$s+$m, $R*$s+$m, $F*$s+$m, $D*$s+$m, $L*$s+$m, $B*$s+$m);
		
		// Map of corner facelet positions (for any dimensoin of cube)
		$cpos = Array(
			Array( ($U+1)*$s-1,       $R*$s,   $F*$s+$d-1), Array(($U+1)*$s-$d,       $F*$s,   $L*$s+$d-1),
			Array(       $U*$s,       $L*$s,   $B*$s+$d-1), Array(  $U*$s+$d-1,       $B*$s,   $R*$s+$d-1),
			Array(  $D*$s+$d-1, ($F+1)*$s-1, ($R+1)*$s-$d), Array(       $D*$s, ($L+1)*$s-1, ($F+1)*$s-$d),
			Array(($D+1)*$s-$d, ($B+1)*$s-1, ($L+1)*$s-$d), Array( ($D+1)*$s-1, ($R+1)*$s-1, ($B+1)*$s-$d));
		
		// Map edge facelet positions (for any dimensoin)
		$epos = Array(
			Array($U*$s+$m+$h,       $R*$s+$h), Array(($U+1)*$s-1-$h,       $F*$s+$h), Array($U*$s+$m-$h,       $L*$s+$h),
			Array(   $U*$s+$h,       $B*$s+$h), Array(   $D*$s+$m+$h, ($R+1)*$s-1-$h), Array(   $D*$s+$h, ($F+1)*$s-1-$h),
			Array($D*$s+$m-$h, ($L+1)*$s-1-$h), Array(($D+1)*$s-1-$h, ($B+1)*$s-1-$h), Array($F*$s+$m+$h,    $R*$s+$m-$h),
			Array($F*$s+$m-$h,    $L*$s+$m+$h), Array(   $B*$s+$m+$h,    $L*$s+$m-$h), Array($B*$s+$m-$h,    $R*$s+$m+$h));
			
		// Corners
		for($i = 0; $i < 8; $i++){
			$j = $cube[1][$i]; // cornercubie with index j is at
			// cornerposition with index i
			$o = $cube[2][$i]; // Orientation of this cubie
			for($n = 0; $n < 3; $n++) $fo[$cpos[$i][($n + $o) % 3]] = $cfid[$j][$n];
		}
//print_r($mfid);
//echo "\n<br/>";
		// Pieces only applicable to odd sized puzzles
		if($d % 2 == 1){ 
			// Centers
			for($i = 0; $i < 6; $i++){
//echo "\n<br/>".$cube[0][$i];
				$fo[$mpos[$i]] = $mfid[$cube[0][$i]];
			}
			// Centre edges 
			for($i = 0; $i < 12; $i++){
				$j = $cube[3][$i]; // edgecubie with index j is at edgeposition with index i
				$o = $cube[4][$i]; // Orientation of this cubie
				for($n = 0; $n < 2; $n++) $fo[$epos[$i][($n + $o) % 2]] = $efid[$j][$n];
			}
		}
//print_r( $fo);
		return $fo;
	}
	
	// Convert cubie cube to letter cube (letters representing facelets)
	function letter_cube($cube, $dim){
		global $FACE_NAMES;
		$fc = face_cube($cube, $dim);
		for($i = 0; $i < count($fc); $i++){
			$lc[$i] = $FACE_NAMES[$fc[$i]];
		}
		return implode($lc);
	}
	
	// Convert cubie cube to colour cube
	function col_cube($cube, $dim){
		// Sheme mapping
		$FACE_COL = Array(
			'u' => 'y',
			'r' => 'r',
			'f' => 'b',
			'd' => 'w',
			'l' => 'o',
			'b' => 'g');
		$fc = face_cube($cube, $dim);
		// Translate face defs into colour defs
		for($i = 0; $i < strlen($fc); $i++){
			$col .= $FACE_COL[$fc[$i]];
		}
		return $col;
	}
	
	// Print a cube to screen for debugging
	function printcube($cube, $dim){
		$fc = letter_cube($cube, $dim);
		println("<img src=\"visualcube.php?fmt=gif&fd=$fc\">");
	}
	
	// Applys an alg to the given cube
	function apply_alg($alg, $cube){
		global $CUBIE_MOVES;
		$i = 0;
		$len = strlen($alg);
		while($i < $len){
			$move = move_id(substr($alg, $i, 1));
			if($move >= 0){
				$pow = move_pow(substr($alg, $i+1, 1));
				if($pow > 1) $i++;
				// Make the move
				$cube = prod($cube, $CUBIE_MOVES[$move], $pow);
			}
			$i++;
		}
		return $cube;
	}
	// Formats an inputed alg to remove dissallowed characters and standardise notation
	function format_alg($moves){
		// Remove characters not allowed in an alg
		$r = preg_replace('/[^UDLRFBudlrfbMESxyzw\'`23]/', '', $moves);
		$r = preg_replace('/[3`]/', "'", $r); // Replace 3 or ` with a '
		$r = preg_replace('/2\'|\'2/', "2", $r); // Replace 2' or '2 with a 2
		// Fix wide notation
		if(preg_match('/w/', $r)){
			$r = preg_replace('/Uw/', 'u', $r);
			$r = preg_replace('/Rw/', 'r', $r);
			$r = preg_replace('/Fw/', 'f', $r);
			$r = preg_replace('/Dw/', 'd', $r);
			$r = preg_replace('/Lw/', 'l', $r);
			$r = preg_replace('/Bw/', 'b', $r);
			// now remove any extra w's
			$r = preg_replace('/w/', '', $r);
		}
		// Merge multiple moves/rotations of same face
//println( "init moves=|$moves|");
		return compress_alg($r);
//println("compressed moves=|$moves|");	
	}
	// Removes all initial and final rotations from a cube
	function trim_rotations($alg, $is_ll){
//echo "isll?$is_ll";
		// Remove AUFs if its an LL alg
		if($is_ll) $alg = remove_auf($alg);
		
		// Strip all initial rotations
		$alg = preg_replace('/^([xyz][2\']?)+/', '', $alg);
		// Strip all final rotations
		$alg = preg_replace('/([xyz][2\']?)+$/', '', $alg);
//echo "moves=|$moves|";
		return $alg;
	}
	// Removes AUFs and replaces them with y rotations
	function remove_auf($alg){
		$n = strlen($alg);
		for($i = 0; $i < $n; $i++){
			$c = substr($alg, $i, 1);
			if($c == 'U') $alg[$i] = 'y';
			else if(preg_match('/[^yU2\'\s]/', $c)) // anything other than y and U turns are no longer aufs
				break;
		}
		for($i = $n - 1; $i > -1; $i--){
			$c = substr($alg, $i, 1);
			if($c == 'U') $alg[$i] = 'y';
			else if(preg_match('/[^yU2\'\s]/', $c)) // anything other than y and U turns are no longer aufs
				break;
		}
		return compress_alg($alg);
	}
	// Inserts spaces in an alg for display
	function expand_alg($alg){
		$n = strlen($alg);
		$i = 1;
		$exp = substr($alg, 0, 1);
		while($i < $n){
			$c = substr($alg, $i, 1);
			if(move_id($c) != -1) $exp .= " ";
			$exp .= $c;
			$i++;
		}
		return $exp;
	}
	// Merges unnecessery repeated moves of the same face
	function compress_alg($alg){
		global $ALG_POW;
		$merge_done = true;
		while($merge_done && strlen($alg) > 1){
			$n = strlen($alg);
			$i = 0;
			$merge_done = false;
			while($i < $n){
				$move = $alg[$i];
				if(move_id($move) != -1){
					$pow = 1;
					if($i < $n -1) $pow = move_pow($alg[$i + 1]);
					if($pow > 1) $i++;
					// If moves the same, then simply add up powers
					if($lmove == $move){
						$lpow += $pow;
						$merge_done = true;
					}
					// Otherwise, last move can be added to alg
					else{
						$lpow = $lpow % 4;
						if($lpow > 0) $malg .= $lmove . $ALG_POW[$lpow-1];
						$lpow = $pow;
						$lmove = $move;
					}
				}
				$i++;			
			}
			// Add final move
			$lpow = $lpow % 4;
			if($lpow > 0) $malg .= $lmove . $ALG_POW[$lpow-1];
			$alg = $malg;
			$malg = null;
			$lmove = null;
			$lpow = null;
		}
		return $alg;
	}
	
	// Inverts an NxN cube algorithm
	function invert_alg($alg){
		global $ALG_POW;
		$inv = "";
		$pow = 1;
		$pre = '';
		$i = strlen($alg) - 1;
		while($i >= 0){
			$c = substr($alg, $i, 1);
			$mv = fcs_move_id($c);
			if($mv != -1){
				// Retrive layer depth
				if($i > 0){
					$pre = substr($alg, $i-1, 1);
					if(!is_numeric($pre) || ($i > 1
					&& fcs_move_id(substr($alg, $i-2, 1)) != -1))
						$pre = '';
					else	$i--;
				}
				// Invert and add the move
				$inv .= $pre . $c . $ALG_POW[3 - $pow] . ' ';
				$pow = 1; $pre = '';
			}
			else $pow = move_pow(substr($alg, $i, 1));
			$i--;
		}
		return $inv;
	}
		
	// Returns an array of algorithm statistics
	// including, STM, HTM, QTM and GEN
	function alg_stats($alg){
		$n = strlen($alg);
		$i = 0;
		$gen = Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
		while($i < $n){
			$move = move_id(substr($alg, $i, 1));
			if($move != -1){
				$pow = 1;
				if($i < $n -1) $pow = move_pow(substr($alg, $i + 1, 1));
				// If move not a rotation
				if($move <= 14){
					$stm++;
					$htm++;
					$qtm_ = 1;
					// If its a slice move
					if($move >= 12 && $move <=14){
						$htm++;
						$qtm_ = 2;
					}
					if($pow == 2) $qtm_ *= 2;
					$qtm += $qtm_;
					$gen[$move >= 6 ? $move - 6 : $move] = 1;
				}
			}
			$i++;
		}
		$gn = 0;
		foreach($gen as $g) $gn += $g;
		return Array($stm, $htm, $qtm, $gn);
	}
	
	// Encode orientation
	function encode_o($data, $mod){
		$o = 0;
		for($i = 0; $i < count($data); $i++){
			$o = $o * $mod + $data[$i];
		}
		return $o;
	}
	
	// Encode permutation
	function encode_p($data){
		$p = 0;
		$n = count($data);
		for($i = 0; $i <  $n - 1; $i++){
			$p = $p * ($n - $i + 1);
			for($j = $i + 1; $j < $n; $j++){
				if($data[$i] > $data[$j])
					$p += 1;
			}
		}
		return $p;
	}
	
	// Returns whether the cubes match
	// Entries of -1 are counted as matching
	function match($cube1, $cube2){
		for($i = 0; $i < count($cube1); $i++){
			if(is_array($cube1[$i])){
				if(!match($cube1[$i], $cube2[$i])) return false;
			}else if(!(
				$cube1[$i] == $cube2[$i] 
				|| $cube1[$i] == -1
				|| $cube2[$i] == -1))
				return false;

		}
		return true;
	}

	// Permutes and orients cube1 by cube2 n times
	function prod($cube1, $cube2, $n){
		for($i = 0; $i < $n; $i++){
			// Centres
			$tmp = Array();
			for($m = 0; $m < 6; $m++){
				// Permute center
				$tmp[0][$m] = $cube1[0][$cube2[0][$m]];
			}
			// Corners
			for($c = 0; $c < 8; $c++){
				// Permute corner
				$tmp[1][$c] = $cube1[1][$cube2[1][$c]];
				// Orient corner
				$tmp[2][$c] = ($cube1[2][$cube2[1][$c]] + $cube2[2][$c]) % 3;
			}
			// Edges
			for($e = 0; $e < 12; $e++){
				// Permute edge
				$tmp[3][$e] = $cube1[3][$cube2[3][$e]];
				// Orient edge
				$tmp[4][$e] = ($cube1[4][$cube2[3][$e]] + $cube2[4][$e]) % 2;
			}
			$cube1 = $tmp;
		}
		return $cube1;
	}

	// Returns the power of a move with given suffix
	function move_pow($char){
		switch($char){
			case "2" : return 2;
			case "'" : return 3;
			case "3" : return 3;
		}
		return 1;
	}
	
	// Maps move names to a move id
	function move_id($move){
		switch($move){
			case 'U': return 0;
			case 'R': return 1;
			case 'F': return 2;
			case 'D': return 3;
			case 'L': return 4;
			case 'B': return 5;
			case 'u': return 6;
			case 'r': return 7;
			case 'f': return 8;
			case 'd': return 9;
			case 'l': return 10;
			case 'b': return 11;
			case 'E': return 12;
			case 'M': return 13;
			case 'S': return 14;
			case 'y': return 15;
			case 'x': return 16;
			case 'z': return 17;
		}
		return -1;
	}



	// -----------------[ NxNxN Face Cube ]---------------
	
	// Permutes an NxNxN face definition according to the given alg
	function fcs_doperm($fcs, $alg, $dim){
		$nf = $dim * $dim;
		$mt = Array();
		// Generate basic move tables
		// Twist generic face
		$fc_twist = Array();
		for($row = 0; $row < $dim; $row++){
			for($col = 0; $col < $dim; $col++){
				$fc_twist[$row * $dim + $col] = ($dim - $col - 1) * $dim + $row;
			}
		}
		// Inverse twist
		$fc_twist2 = Array();
		for($row = 0; $row < $dim; $row++){
			for($col = 0; $col < $dim; $col++){
				$fc_twist2[$row * $dim + $col] = $col * $dim + $dim - $row - 1;
			}
		}
		
		// Face order for slice turns
		$sl_fo = Array(
			Array(6, 5, 1, 6, 2, 4), // x
			Array(2, 6, 3, 5, 6, 0), // y
			Array(4, 0, 6, 1, 3, 6), // z
			Array(6, 2, 4, 6, 5, 1), // x'
			Array(5, 6, 0, 2, 6, 3), // y'
			Array(1, 3, 6, 4, 0, 6), // z'
		);
		// Sticker order for slice turns
		$sl_so = Array( // 1=+col+row, 2=-col+row, 3=+col-row, 4=-col-row,
				// 5=+row+col, 6=-row+col, 7=+row-col, 8=-row-col, 0=null
			Array(0, 1, 1, 0, 1, 1), // x
			Array(8, 0, 8, 8, 0, 5), // y
			Array(4, 7, 0, 1, 6, 0), // z
		);
		// Twist individual slices
		$sl_twist = Array();
		for($lr = 0; $lr < 6; $lr++){
			$sl_twist[$lr] = Array();
			for($sl = 0; $sl < $dim; $sl++){
				$sl_twist[$lr][$sl] = Array();
				for($fc = 0; $fc < 6; $fc++){
					if($sl_so[$lr%3][$fc] == 0) continue;
					for($i = 0; $i < $dim; $i++){
						$sl_twist[$lr][$sl][$fc*$nf + fcs_pos($sl, $i, $sl_so[$lr%3][$fc], $dim)]
							= $sl_fo[$lr][$fc]*$nf + fcs_pos($sl, $i, $sl_so[$lr%3][$sl_fo[$lr][$fc]], $dim);
					}
				}
			}
		}
		// Initialise move tables
		$fc_moves = Array();
		for($i = 0; $i < $dim * 6; $i++){
			for($j = 0; $j < $nf * 6; $j++){
				$fc_moves[$i][$j] = $j;
			}
		}
		
		// Create move tables composed of simple units
		
		// Rotations
		for($i = 0; $i < 3; $i++){
			// Add all slice moves for axis
			for($j = 0; $j < $dim; $j++)
				fcs_union($fc_moves[$i], $sl_twist[$i][$j], 0);
			// Add twist moves for each end
			fcs_union($fc_moves[$i], $fc_twist, $i*$dim*$dim);
			fcs_union($fc_moves[$i], $fc_twist2, ($i+3)*$dim*$dim);
		}
		// Centre-slice moves
		if($dim % 2 > 0){
			fcs_union($fc_moves[3], $sl_twist[3][floor($dim/2)], 0); // E
			fcs_union($fc_moves[4], $sl_twist[4][floor($dim/2)], 0); // M
			fcs_union($fc_moves[5], $sl_twist[2][floor($dim/2)], 0); // S
		}

		// Normal Moves
		for($ax = 0; $ax < 3; $ax++){
			for($dp = 0; $dp < $dim - 1; $dp++){
				// Primary axis end
				// Add twist move
				fcs_union($fc_moves[6 + $ax*($dim-1) + $dp], $fc_twist, $ax*$dim*$dim);
				for($sl = 0; $sl <= $dp; $sl++) // Add slice moves up to depth $dp
					fcs_union($fc_moves[6 + $ax*($dim-1) + $dp], $sl_twist[$ax][$sl], 0);
				// Secondary axis end
				// Add twist move
				fcs_union($fc_moves[6 + (3+$ax)*($dim-1) + $dp], $fc_twist, (3+$ax)*$dim*$dim);
				for($sl = 0; $sl <= $dp; $sl++) // Add slice moves up to depth $dp
					fcs_union($fc_moves[6 + (3+$ax)*($dim-1) + $dp], $sl_twist[3+$ax][$dim - $sl - 1], 0);
			}
		}
		
		// Carry out moves
		$moves = fcs_parse_alg($alg, $dim);
		
		$fcs_ = Array();
		if(!is_array($fcs)) $fcs = str_split($fcs);
		foreach($moves as $mv){
			fcs_permute($fcs, $fcs_, $fc_moves[$mv]);
			$tmp = $fcs;
			$fcs = $fcs_;
			$fcs_ = $tmp;
		}
		return $fcs;
	}
	function fcs_pos($r, $c, $o, $d){
		$n = $d*$d;
		switch($o){
			case 1: return $d * $r + $c;
			case 2: return $d * ($r + 1) - 1 - $c;
			case 3: return $n - $d * ($r + 1) + $c;
			case 4: return $n - $d * $r - 1 - $c;
			case 5: return $d * $c + $r;
			case 6: return $d * ($c + 1) - 1 - $r;
			case 7: return $n - $d * ($c + 1) + $r;
			case 8: return $n - $d * $c - 1 - $r;
		}
	}
	// Translations defined in $t2 are applied to $t1
	function fcs_union(&$t1, &$t2, $offset){
		foreach($t2 as $k => $v){
			$t1[$k + $offset] = $v + $offset;
		}
	}
	// Permutes given array, storing output in second array
	function fcs_permute(&$in, &$out, $perm){
		//print_r($perm);
		for($i = 0; $i < count($in); $i++)
			$out[$i] = $in[$perm[$i]];
		//print_r($out);
		return $out;
	}
	// Parses an algorithm string into a move-id sequence
	function fcs_parse_alg($alg, $dim){
		$moves = Array();
		$i = 0;
		$j = 0;
		$pre = 0;
		$len = strlen($alg);
		while($i < $len){
			$c = substr($alg, $i, 1);
			$mv = fcs_move_id($c);
			if(is_numeric($c)){
				$pre = $c;
			}
			else if($mv >= 0){
				$pow = $i < strlen($alg) - 1 ? move_pow(substr($alg, $i+1, 1)) : 1;
				if($pow > 1) $i++;
				// Add the move
				$pre = $pre < 1 ? 1 : ($pre > $dim - 1 ? $dim - 1 : $pre);
				if($mv >= 12){ $mv -= 6; $pre = $pre < 2 ? 2 : $pre; }
				for($k = 0; $k < $pow; $k++)
					$moves[$j++] = $mv < 6 ? $mv : 6 + ($mv - 6) * ($dim - 1) + ($pre - 1); 
				$pre = 1;
			}
			else $pre = 1;

			$i++;
		}
//		echo "|" . $alg . "|";
//		print_r($moves);
		
		return $moves;
	}
	// Maps move names to a move id
	function fcs_move_id($move){
		switch($move){
			case 'y': return 0;
			case 'x': return 1;
			case 'z': return 2;
			case 'E': return 3;
			case 'M': return 4;
			case 'S': return 5;
			case 'U': return 6;
			case 'R': return 7;
			case 'F': return 8;
			case 'D': return 9;
			case 'L': return 10;
			case 'B': return 11;
			case 'u': return 12;
			case 'r': return 13;
			case 'f': return 14;
			case 'd': return 15;
			case 'l': return 16;
			case 'b': return 17;
		}
		return -1;
	}
	// Formats an alg for bigcubes
	function fcs_format_alg($alg){
		// Fix URL encoded characters (urldecode doesn't seem to remove them)
		$r = preg_replace('/%27/', "'", $alg);
		$r = preg_replace('/%20/', " ", $r);
		// Remove characters not allowed in an alg
		$r = preg_replace('/[^UDLRFBudlrfbMESxyzw\'`234567890 ]/', '', $r);
		$r = preg_replace('/[`]/', "'", $r); // Replace ` with a '
		$r = preg_replace('/2\'|\'2/', "2", $r); // Replace 2' or '2 with a 2
		// Fix wide notation
		if(preg_match('/[w]/', $r)){
			$r = preg_replace('/Uw/', 'u', $r);
			$r = preg_replace('/Rw/', 'r', $r);
			$r = preg_replace('/Fw/', 'f', $r);
			$r = preg_replace('/Dw/', 'd', $r);
			$r = preg_replace('/Lw/', 'l', $r);
			$r = preg_replace('/Bw/', 'b', $r);
			// now remove any extra w's
			$r = preg_replace('/w/', '', $r);
		}
		return $r;
	}
	// ------------------[ Basic Functions ]--------------

	// Copy an array
	function array_copy($ary){
		if(!is_array($ary)) return $ary;
		$out = Array(count($ary));
		foreach($ary as $k => $v){
			$out[$k] = array_copy($v);
		}
		return $out;
	}

?>
