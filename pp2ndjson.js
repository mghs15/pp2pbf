
const fs = require('fs')

const readPpGeojson = (filename) => {
  fs.readFile(filename, 'utf8', (err, data) => {
    
    // BOMを無視する https://webbibouroku.com/Blog/Article/node-bom-utf8
    if (data.charCodeAt(0) === 0xFEFF) {
      json = data.substr(1);
    }
    
    const geojson = JSON.parse(json);
    
    geojson.features.forEach( f => {
      
      //集約
      const yearrange = 10;
      //console.log(f)
      const photodate = f.properties["撮影年月日"];
      const photoyear = photodate.substr(0,4);
      const photoyears = Math.floor(+photoyear / yearrange) * yearrange;
      //console.log(photoyear,photoyears);
      const yearsfile = "./dst/pp-" + photoyears + "s.ndjson";
      
      //書き出し
      console.log(yearsfile);
      const s = JSON.stringify(f) + "\n";
      fs.appendFile(yearsfile, s, (err) => {
        if (err) throw err;
      });
        
    });
    
  });
} 


const dir = 'pp';
fs.readdir(dir, (err, files) => {
  if (err) throw err;
  
  files.forEach( file => {
    if(file.match(/^14/)){
      const filepath = dir + '/' + file;
      console.log(filepath);
      readPpGeojson(filepath);
    }
  });

});


