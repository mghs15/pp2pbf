const yearsList = [
  1900,
  1910,
  1920,
  1930,
  1940,
  1950,
  1960,
  1970,
  1980,
  1990,
  2000,
  2010,
  2020,
  2030
]

const startYear = 1900;
const endYear = 2021;

/*
const setPpSources = (upYear, lwYear) => {
  const upYears = Math.ceil(upYear);
  const lwYears = Math.floor(lwYear);
  
  for(ys in yearsList){
    const sourceid = ys + 's';
    
    if(map.getSource(sourceid)){
      map.removeSource(sourceid);
    }
    
    if(+ys < lwYears || upYears < +ys){
      continue;
    }
    
    map.addSource(sourceid, {
      type: 'vector',
      tiles: ['./pbf/pp/' + ys + 's/{z}/{x}/{y}.pbf'],
      minzoom: 12,
      maxzoom: 12
    });
  }
}
*/

const showPp = (upYear, lwYear) => {
  const upYears = Math.ceil(upYear/10)*10;
  const lwYears = Math.floor(lwYear/10)*10;
  

  yearsList.forEach( ys => {
    
    const sourceid = ys + 's';
    const layerid = ys + 's';
    
    if(map.getLayer(layerid + 'debug')){
      map.removeLayer(layerid + 'debug');
    }
    if(map.getLayer(layerid)){
      map.removeLayer(layerid);
      if(map.getSource(sourceid)){
        map.removeSource(sourceid);
      }
    }
    
    if(+ys >= lwYears && upYears >= +ys){
      
      console.log('-', ys);
      
      map.addSource(sourceid, {
        type: 'vector',
        tiles: ['http://localhost/210405_pp/pbf/' + ys + 's/{z}/{x}/{y}.pbf'],
        minzoom: 12,
        maxzoom: 12
      });
      
      
      map.addLayer({
        'id': sourceid + 'debug',
        'type': 'circle',
        'source': sourceid,
        'minzoom': 12,
        'maxzoom': 22,
        'layout': {
          'visibility': 'visible'
        },
        'paint': {
          'circle-radius': 10,
          'circle-color': ['rgba', 0,0,0,1]
        },
        'source-layer': 'pp'
      });
      
      map.addLayer({
        'id': sourceid,
        'type': 'circle',
        'source': sourceid,
        'minzoom': 12,
        'maxzoom': 22,
        'filter': [
          'all',
          ['>', ["to-number", ["slice", ["get", "撮影年月日"], 0, 4]], lwYear],
          ['<', ["to-number", ["slice", ["get", "撮影年月日"], 0, 4]], upYear]
        ],
        'layout': {
          'visibility': 'visible'
        },
        'paint': {
          'circle-radius': 8,
          'circle-color': ['rgba', 
            255, 
            ["*", 2, ["to-number", ["slice", ["get", "撮影年月日"], 2, 4]]],
            0,
            1]
        },
        'source-layer': 'pp'
      });
      
      
    }
    
  })
}

const refleshPp = () =>{
  const l = +document.question.lower.value;
  const u = +document.question.upper.value;
  const upy = Math.max(l,u);
  const lwy = Math.min(l,u);
  console.log(upy, lwy);
  showPp(upy, lwy)
}

map.on('load', function(){
  refleshPp();
});

