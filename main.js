
const s = Snap("#svg");
const loops = [
    {
      path: "M 400 500 \
        a15,7,0,0,0,0,-120 \
        a15,7,0,0,0,0,120",
      color: "#3FA",
      timeout: 500,
      duration: 1000,
    }
    ,
    {
      path: "M 450 497 \
        a3,17,0,0,0,0,-320 \
        a3,17,0,0,0,0,320",
      color: "#3FA",
      timeout: 250,
      duration: 1000,
    }
    ,
    {
      path: "M 370 444 \
        a3,7,0,0,0,0,-200 \
        a3,7,0,0,0,0,200",
      color: "#3FA",
      timeout: 300,
      duration: 1000,
    }
    ,
    {
      path: "M 350 365 \
        a3,7,-30,0,1,0,-150 \
        a3,7,-30,0,1,0,140",
      color: "#3FA",
      timeout: 0,
      duration: 1000,
    }
    ,
    {
      path: "M 460 340 \
        a2.3,7,-40,0,1,0,-150 \
        a2.3,7,-40,0,1,0,150",
      color: "#3FA",
      timeout: 400,
      duration: 1000,
    }
    ,
    {
      path: "M 418 380 \
        a42,30,0,0,0,0,-106 \
        a38,30,0,0,0,0,110",
      color: "#3FA",
      timeout: 20,
      duration: 1000,
    }
    ,
    {
      path: "M 418 490 \
        a30,30,0,0,0,0,-110 \
        a30,30,0,0,0,0,100",
      color: "#3FA",
      timeout: 1000,
      duration: 1000,
    }
];

loops.forEach(animateLoop)

function animateLoop(loop) {
    setTimeout(() => {
        const loopLength = Snap.path.getTotalLength(loop.path);
        const circle = s.path({
            path: Snap.path.getSubpath(loop.path, 0, 0),
            stroke: loop.color,
            fillOpacity: 0,
            strokeWidth: 0,
          });
        
        Snap.animate(0, loopLength,
          function(step){ //step function
            circle.attr({
              path: Snap.path.getSubpath(loop.path, 0, step),
              strokeWidth: 2
            });
            
          }, // end of step function
          loop.duration //duration
        ); //Snap.animate
      }, loop.timeout)
}



