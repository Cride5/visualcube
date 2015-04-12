<?php


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
//	if (!$DEBUG) error_reporting(0);

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

