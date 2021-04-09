
mkdir sz_dst
mkdir sz_mb
mkdir sz_pbf

node sz_pp2ndjson.js
node sz_ndjson2mbtiles.js
node sz_mbtiles2pbf.js

