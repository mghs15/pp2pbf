
const child_process = require('child_process');
const fs = require('fs')

const dir = 'dst';

const option = [
  '--force', 
  '--no-tile-size-limit', 
  '--no-tile-compression',
  '--no-feature-limit',
  '--minimum-zoom=' + 11,
  '--maximum-zoom=' + 11,
  '--base-zoom=' + 11,
  '--simplification=' + 2,
  '-l', 'pp'
];


fs.readdir(dir, (err, files) => {
  if (err) throw err;
  
  //コマンド生成
  let command = 'tippecanoe';
  command = command + ' -e ' + 'pbf';
  
  files.forEach( file => {
  
    const filepath = dir + '/' + file;
    command = command  + " " + filepath;
  
  });
  
  option.forEach( op => {
    command = command + " " + op;
  });
  
  
  console.log(command);
  child_process.execSync(`${command}`);
  
});


