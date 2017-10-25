# VisualCube
Generate custom Rubik's cube visualisations from your browser address bar. 

### Installation Instructions

These instructions are for installing the script on your own web server. If you do not have access to your own server, or would just like to try out the software, please visit:
http://cube.crider.co.uk/visualcube.php

##### Prerequisites

* Access to an Apache web server with PHP and ImageMagic installed.
* A MySQL database. This is optional, but will improve performance if you have a high traffic website.

##### Steps

1. Download and extract the code into a web-accessible folder.
2. Edit the configuration variables in visualcube_config.php
3. Point your browser to: www.yourwebsite.com/visualcube.php
4. (Optional) Edit DB_USER, DB_PASS and DB_NAME in visualcube_dbprune.sh and install the cron job.
5. (Optional) Configure mod_rewrite to redirect image suffixes to corresponding fmt=xxx form. See below.

##### Configuring mod_rewrite
Add a .htaccess file to the same folder as visualcube.php with something like the following:
```
RewriteEngine On

RewriteCond %{HTTP_HOST} ^(www\.example\.com)$
RewriteRule ^visualcube\.(gif|png|jpg|jpeg|tiff|ico)$ http://www.example.com/visualcube.php?%{QUERY_STRING}&fmt=$1 [L]
```


### Features

* Fully 3D cube visualisation
* Cube dimensions from 1x1x1 to NxNxN. Currently capped at 9x9 for performance.
* Algorithm support
* Complete orientation control
* Multiple image formats
* Custom image size
* Cube and facelet transparency
* Custom colour schemes and background
* Image caching for speedy access
* Cookie configurable variables
* Arrow overlays
* Highly configurable URL-based API
* Open Source
