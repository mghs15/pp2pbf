
const fs = require('fs')

const readPpGeojson = (filename) => {
    const data = fs.readFileSync(filename, 'utf8');
    
    if(!data){
      console.log("Error:", filename);
      return;
    }
    
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
      const photoyears = +photodate.substr(0,4);
      //const photoyears = Math.floor(+photoyear / yearrange) * yearrange;
      //console.log(photoyear,photoyears);
      
      const photoscale = Math.floor(+f.properties["撮影縮尺"]/1000) * 1000;
      
      const photocolor = f.properties["カラー種別"];
      
      const photokikan = f.properties["撮影計画機関"];
      
      const yearsfile = "./sz_dst/pp-"
                      + photoyears + "-"
                      + photoscale + "-"  
                      + photocolor  + "-"  
                      + photokikan  + ".ndjson";
      
      //書き出し
      console.log(yearsfile);
      const s = JSON.stringify(f) + "\n";
      
      try{
        fs.appendFileSync(yearsfile, s);
      }catch(err){
        console.log(err);
      }
      
    });
} 


const dir = 'pp';
fs.readdir(dir, (err, files) => {
  if (err) throw err;
  
  files.forEach( file => {
    if(file.match(/^14/)){
      const filepath = './' + dir + '/' + file;
      console.log(filepath);
      readPpGeojson(filepath);
    }
  });

});


