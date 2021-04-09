
const child_process = require('child_process');
const fs = require('fs')

const dir = 'sz_mb';
const outdirroot = 'sz_pbf';

const option = [
  '--force', 
  '--no-tile-size-limit', 
  '--no-tile-compression'
];


fs.readdir(dir, (err, files) => {
  if (err) throw err;
  
  //const outdir = file.substr(3,4) + "s"; // 要調整
  
  //コマンド生成
  let command = 'tile-join';
  command = command + ' -e ' + outdirroot;
  
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


