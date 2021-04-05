
const child_process = require('child_process');
const fs = require('fs')

const dir = 'dst';

const option = [
  '--force', 
  '--no-tile-size-limit', 
  '--no-tile-compression',
  '--no-feature-limit',
  '--minimum-zoom=' + 12,
  '--maximum-zoom=' + 12,
  '--base-zoom=' + 12,
  '--simplification=' + 2,
  '-l', 'pp'
];


fs.readdir(dir, (err, files) => {
  if (err) throw err;
  
  files.forEach( file => {
    const filepath = dir + '/' + file;
    const outdir = file.substr(3,5); // 要調整
    
    //コマンド生成
    let command = 'tippecanoe';
    option.forEach( op => {
      command = command + " " + op;
    });
    command = command + ' -e ' + 'pbf/' + outdir + " " + filepath;
    console.log(command);
    child_process.execSync(`${command}`);
  });

});


