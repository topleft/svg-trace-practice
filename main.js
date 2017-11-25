
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

createSymetricalCirleGrid = (paper, gridSize, vMargin, hMargin, radius) => {
  let x = vMargin;
  let y = hMargin;
  for (let i = 0; i < gridSize; i++) {
    if (i%Math.sqrt(gridSize) === 0) {
      x = vMargin;
      y += hMargin;
    }

    calculated_x = (x * (i%(Math.sqrt(gridSize)))) + radius
    let c = paper.circle(calculated_x, y, radius)
    c.attr({
      stroke: "#1485CC",
      strokeWidth: 2,
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

const paper = Snap("#svg");
const paths = loops.map((p) => new Path(p));
paths.forEach((p) => p.trace(paper));

createSymetricalCirleGrid(paper, 9, 31, 32, 40);
console.log(paper.getBBox())


