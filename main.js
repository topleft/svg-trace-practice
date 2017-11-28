
const loops = [
    {
      data: "M 400 500 \
        a15,7,0,0,0,0,-120 \
        a15,7,0,0,0,0,120",
      color: "#B21212",
      timeout: 500,
      duration: 1200,
      id: 'circle1'
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

createSymetricalCirleGrid = (paper, circlesPerRow, vMargin, hMargin, radius) => {
  const gridSize = Math.pow(circlesPerRow, 2)
  const diameter = radius * 2;
  const width = hMargin > diameter ? hMargin * circlesPerRow : (hMargin * (circlesPerRow - 1)) + diameter
  const height = vMargin > diameter ? vMargin * circlesPerRow : (vMargin * (circlesPerRow - 1)) + diameter
  const xOrigin = (width/2 * -1) + radius;
  const yOrigin = (height/2 * -1) + radius;
  let x = xOrigin;
  let y = yOrigin;
  const popIndex = Math.floor(Math.random() * gridSize)
  for (let i = 0; i < gridSize; i++) {
    if (i%circlesPerRow === 0 && i !== 0) { // create new row
      x = xOrigin;
      y += vMargin;
    }
    let calculated_x = x + (hMargin * (i%circlesPerRow));
    let c = paper.circle(calculated_x, y, radius)
    c.attr({
      stroke: i === popIndex ? "clear" : "#1485CC",
      strokeWidth: 1,
      fillOpacity: 0
    })
  } 
}

class Path {
  constructor(obj) {
    this.id = obj.id || new Date();
    this.class = 'button'
    this.data = obj.data; 
    this.color = obj.color || '#000'; 
    this.timeout = obj.timeout || 0; 
    this.duration = obj.duration || 500;
    this.link = obj.link;
    this.pathLength = Snap.path.getTotalLength(this.data);
    this.subPath = Snap.path.getSubpath(this.data, 0, 0)
    this.instantiatedPath = null;
  }

  instantiatePath (paper) {
    this.instantiatedPath = paper.path({
      path: this.subPath,
      stroke: this.color,
      strokeWidth: 0,
      fillOpacity: 0,
    });
  }

  onHover () {
    if (!this.hoverColor) return;

  }

  trace (paper) {
    setTimeout(() => {
      this.instantiatePath(paper);
      
      Snap.animate(0, this.pathLength,
        (function(step){ //step function
          this.instantiatedPath.attr({
            path: Snap.path.getSubpath(this.data, 0, step),
            strokeWidth: 2,
            id: this.id,
            class: this.class,
            fill: this.color
          });
          
        }).bind(this), // end of step function (must bind to class instance)
        this.duration //duration
      ); //Snap.animate
    }, this.timeout)
  }
  
}

const patternPaper = Snap("#pattern");
const bodyschemaPaper = Snap("#bodyschema");
const paths = loops.map((p) => new Path(p));
paths.forEach((p) => p.trace(bodyschemaPaper));

createSymetricalCirleGrid(patternPaper, 9, 6, 12, 2);


// const center = patternPaper.circle(0,0,1);
// center.attr({
//   stroke: "#E9483B",
//   strokeWidth: 1,
//   fillOpacity: 0
// })

