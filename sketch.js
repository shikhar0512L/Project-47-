const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon, boat;
var towerImage,waterSound,cannonExplosion
var balls = [];
var boats = [];
var gameOver = false;


function preload() {
  backgroundImg = loadImage("background.gif");
  towerImage = loadImage("tower.png");
  waterSound = loadSound("cannon_water.wav");
  cannonExplosion = loadSound('cannon_explosion.wav')
}

function setup() {
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  angle = -PI / 4;
  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(180, 110, 100, 50, angle);
  

  boat = new Boat(width, height - 100, 200, 200, -100);
  
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);
  ground.display();
  tower.display();
  cannon.display();
  ground.display();
  boat.display();
  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i],i);
    
  };


};


function keyPressed(){
  if(keyCode === DOWN_ARROW){
    var cannonBall = new CannonBall(cannon.x,cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body,cannon.angle);
    balls.push(cannonBall);
  };
}

function showCannonBalls(ball,index){
  ball.display();
  ball.animate();
  if(ball.body.position.x>=width || ball.body.position.y>=height-50){
    if (!ball.isSink){
      waterSound.play();
      ball.remove(index);
    }

  }
}

function keyReleased(){
  if(keyCode === DOWN_ARROW && !gameOver){
    cannonExplosion.play();
    balls[balls.length-1].shoot();
  };
};