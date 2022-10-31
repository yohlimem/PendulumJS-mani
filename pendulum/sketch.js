const width = 400;
const height = 400;

let pendulum = {
  angle: 20,
  radius: 100,
  angularAcc: 0,
  angularVel: 0,
  x: width / 2,
  y: height / 2,
  bob: {
    x: 0,
    y: 0,
    xAcc: 0,
    yAcc: 0,
    xVel: 0,
    yVel: 0,
    mass: 10,
  },
}

let bob = {
  x:0,
  y:0,
  xAcc:0,
  yAcc:0,
  xVel:0,
  yVel:0,
  mass: 5,
}

let timer = 0.0;
let deltaTimer = 0.0;
let dt = 0.0;

const numOfEverything = 10

function setup() {
  createCanvas(width, height);
  // frameRate(30)
}


// draw everything :))
function draw() {
  pendulum.bob = bob;
  background(255);
  
  // print(pendulum)

  fill(222);
  stroke(0,0,0,0);
  
  square(pendulum.x - 5,pendulum.y - 5,10);
  
  fill("orange");
  circle(pendulum.bob.x, pendulum.bob.y, 10);

  fill("gray")
  stroke("gray")
  line(bob.x, bob.y, pendulum.x, pendulum.y);

  Bob()
  if(mouseIsPressed){
    //drag the bob only when mouse is pressed
    dragBob();
  }

}

function Bob(){
  
  
  
  //constrain the bob (circle) to the radius set (100)
  bob.x = pendulum.radius * sin(pendulum.angle) + pendulum.x;
  bob.y = pendulum.radius * cos(pendulum.angle) + pendulum.y;
  
  //add rotational velocity and acceleration
  pendulum.angularVel += pendulum.angularAcc
  pendulum.angle += pendulum.angularVel
  
  //gravity
    pendulum.angularAcc = -0.2  * bob.mass * Math.sin(pendulum.angle) / 50
    //air drag
    pendulum.angularVel *= 0.99
    // add acceleration ro velocity
    bob.xVel += bob.xAcc
    bob.yVel += bob.yAcc
    //add velocity to position
    bob.x += bob.xVel
    bob.y += bob.yVel  

}

function dragBob(){

  pendulum.angularAcc = 0

  var vec1 = createVector(bob.x - pendulum.x, bob.y - pendulum.y)
  var vec2 = createVector(mouseX - pendulum.x, mouseY - pendulum.y)
    
  // stroke("black")

  // line(pendulum.x, pendulum.y, mouseX, mouseY)
  // line(pendulum.x, pendulum.y, bob.x, bob.y)

  print(vec1.angleBetween(vec2))
  print(pendulum.angularVel)

  // uses angular velocity to drag the bob basically it finds the difference of the difference divided by two (so its smoother)
  pendulum.angularVel = pendulum.angle - pendulum.angle - vec1.angleBetween(vec2) / 2;
}