
const s = Snap("#svg");
const loops = [
    "M 400 500 \
    a15,7,0,0,0,0,-120 \
    a15,7,0,0,0,0,120"
    ,
    "M 450 497 \
    a3,17,0,0,0,0,-320 \
    a3,17,0,0,0,0,320"
    ,
    "M 370 444 \
    a3,7,0,0,0,0,-200 \
    a3,7,0,0,0,0,200"
    ,
    "M 350 365 \
    a3,7,-30,0,1,0,-150 \
    a3,7,-30,0,1,0,140"
    ,
    "M 460 340 \
    a2.3,7,-40,0,1,0,-150 \
    a2.3,7,-40,0,1,0,150"
    ,
    "M 418 380 \
    a42,30,0,0,0,0,-106 \
    a38,30,0,0,0,0,110"
    ,
    "M 418 490 \
    a30,30,0,0,0,0,-110 \
    a30,30,0,0,0,0,100"
];

loops.forEach(animateLoop)

function animateLoop(loop) {
    console.log('here')
    const loopLength = Snap.path.getTotalLength(loop);
    const circle = s.path({
        path: Snap.path.getSubpath(loop, 0, 0),
        stroke: "#3AF",
        fillOpacity: 0,
        strokeWidth: 0,
       });
    
    Snap.animate(0, loopLength,
      function(step){ //step function
        circle.attr({
          path: Snap.path.getSubpath(loop, 0, step),
          strokeWidth: 2
        });
        
      }, // end of step function
      800 //duration
    ); //Snap.animate
}



