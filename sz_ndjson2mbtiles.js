
const child_process = require('child_process');
const fs = require('fs')

const dir = 'sz_dst';
const outdirroot = 'sz_mb';

const option = [
  '--force', 
  '--no-tile-size-limit', 
  '--no-tile-compression',
  '--no-feature-limit',
  '--minimum-zoom=' + 6,
  '--maximum-zoom=' + 10,
  '--base-zoom=' + 10,
  '--simplification=' + 2,
  '-r1',
  '--cluster-distance=' + 100, //clusting points within this pixel
  '-l', 'ppcls'
];


fs.readdir(dir, (err, files) => {
  if (err) throw err;
  
  files.forEach( file => {
    const filepath = dir + '/' + file;
    const outpath = file.replace('ndjson', 'mbtiles'); // 要調整
    
    //コマンド生成
    let command = 'tippecanoe';
    option.forEach( op => {
      command = command + " " + op;
    });
    command = command + ' -o ' + outdirroot + '/' + outpath + " " + filepath;
    console.log(command);
    child_process.execSync(`${command}`);
  });

});


