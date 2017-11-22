
const loops = [
    {
      data: "M 400 500 \
        a15,7,0,0,0,0,-120 \
        a15,7,0,0,0,0,120",
      color: "#B21212",
      timeout: 500,
      duration: 1200,
    }
    ,
    {
      data: "M 450 497 \
        a3,17,0,0,0,0,-320 \
        a3,17,0,0,0,0,320",
      color: "#FFFC19",
      timeout: 750,
      duration: 1200,
    }
    ,
    {
      data: "M 370 444 \
        a3,7,0,0,0,0,-200 \
        a3,7,0,0,0,0,200",
      color: "#FF0000",
      timeout: 300,
      duration: 1200,
    }
    ,
    {
      data: "M 350 365 \
        a3,7,-30,0,1,0,-150 \
        a3,7,-30,0,1,0,140",
      color: "#1485CC",
      timeout: 0,
      duration: 1200,
    }
    ,
    {
      data: "M 460 340 \
        a2.3,7,-40,0,1,0,-150 \
        a2.3,7,-40,0,1,0,150",
      color: "#0971B2",
      timeout: 800,
      duration: 1200,
    }
    ,
    {
      data: "M 418 380 \
        a42,30,0,0,0,0,-106 \
        a38,30,0,0,0,0,110",
      color: "#0971B2",
      timeout: 900,
      duration: 1200,
    }
    ,
    {
      data: "M 418 490 \
        a30,30,0,0,0,0,-110 \
        a30,30,0,0,0,0,100",
      color: "#1485CC",
      timeout: 1200,
      duration: 1200,
    }
];

class Path {
  constructor(obj) {
    this.data = obj.data; 
    this.color = obj.color || '#000'; 
    this.timeout = obj.timeout || 0; 
    this.duration = obj.duration || 500;
  }

  trace (paper) {
    setTimeout(() => {
      const loopLength = Snap.path.getTotalLength(this.data);
      const instantiatedPath = paper.path({
        path: Snap.path.getSubpath(this.data, 0, 0),
        stroke: this.color,
        fillOpacity: 0,
        strokeWidth: 0,
      });
      
      Snap.animate(0, loopLength,
        (function(step){ //step function
          instantiatedPath.attr({
            path: Snap.path.getSubpath(this.data, 0, step),
            strokeWidth: 2
          });
          
        }).bind(this), // end of step function (must bind to class)
        this.duration //duration
      ); //Snap.animate
    }, this.timeout)
  }
  
}

const paper = Snap("#svg");
const paths = loops.map((p) => new Path(p));
paths.forEach((p) => p.trace(paper));



