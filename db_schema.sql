/** Caches generated visual cubes.
Stores the parameters used to generate the image,
the latest referrer to request the image,
and the request frequencey */
CREATE TABLE vcache(
	hash CHAR(32) NOT NULL,
	fmt CHAR(4) NOT NULL,
	req VARCHAR(255) NOT NULL,
	rfr VARCHAR(255) NOT NULL,
	rcount INT UNSIGNED NOT NULL,
	img MEDIUMBLOB,
	PRIMARY KEY (hash));
	
/** View contents with: */
SELECT hash, fmt, req, rfr, rcount, OCTET_LENGTH(img) FROM vcache;

