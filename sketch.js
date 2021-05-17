var bg,bgImg;
var boy,boyImg;
var canvas;
var invisibleground;
var mask,maskImage;
var sanitizer,sanitizerImage;
var virus,virusImage;
var gameState = "Play";
var score = 0;
var maskgroup;
var sanitizergroup,virusgroup;
var restart,restartImg;
var boygameoverImg;

function preload(){

bgImg = loadImage("bg.jpg");
boyImg = loadAnimation("boy4.png","boy5.png","boy6.png","boy8.png");
maskImage = loadImage("mask.png");
sanitizerImage = loadImage("sanitizer.png");
virusImage = loadImage("virus.png");
maskgroup = new Group();
sanitizergroup = new Group();
virusgroup = new Group(); 
restartImg = loadImage("restart.png");
boygameoverImg = loadAnimation("boy4.png","boy4.png");
}




function setup() {

canvas = createCanvas(600,400);

bg = createSprite(300,200,600,400);
bg.addImage("background",bgImg);

bg.scale = 1.3;

boy = createSprite(150,270,20,50);
boy.addAnimation("running",boyImg);
boy.addAnimation("gameover",boygameoverImg);
boy.scale = 0.8;


invisibleground = createSprite(300,395,600,20);
invisibleground.visible = false;

restart = createSprite(300,200,30,50);
restart.addImage("restart",restartImg);
restart.visible = false;
}

function draw() {
  background("white");
  if(gameState==="Play"){
    bg.velocityX = 1.5;
    boy.velocityX = 2;
    if(bg.x>400){
      bg.x = 0;
       }
    
      if(boy.x>400){
        boy.x = 0;
      }
    
     if(keyDown("SPACE")&&boy.y>328){
       boy.velocityY = -17;
     }
     
     boy.velocityY = boy.velocityY+1;
     spawnMasks();
     spawnSanitizers();
     spawnVirus();
     
     if(maskgroup.isTouching(boy)){
       score = score + 2;
       maskgroup.destroyEach();
     }

     if(sanitizergroup.isTouching(boy)){
      score = score + 5;
      sanitizergroup.destroyEach();
    }
     

     if(virusgroup.isTouching(boy)){
       gameState = "End";
     }
  }
  
  if(gameState==="End"){
  bg.velocityX = 0;
  boy.velocityX = 0;
  maskgroup.setVelocityEach(0);
  sanitizergroup.setVelocityEach(0);
  virusgroup.setVelocityEach(0);
  maskgroup.setLifetimeEach(-1);
  sanitizergroup.setLifetimeEach(-1);
  virusgroup.setLifetimeEach(-1);
  //textSize(40);
  //fill("red");
  //text("Game Over",300,200);
  restart.visible = true;
  boy.changeAnimation("gameover",boygameoverImg);
  }

  if(mousePressedOver(restart)){
    gameState = "Play";
    score = 0;
    restart.visible = false;
    boy.changeAnimation("running",boyImg);
  }

 boy.collide(invisibleground);
 
  drawSprites();
  text("Score "+score,535,55);
}
function spawnMasks(){

if(frameCount%100===0){
mask = createSprite(270,300,20,40);
mask.addImage("mask",maskImage);
mask.scale = 0.2;
mask.y = Math.round(random(180,280));
mask.velocityX = -2;
mask.lifetime = 80;
maskgroup.add(mask);
}
}

function spawnSanitizers(){
  if(frameCount%150===0){
    sanitizer = createSprite(180,250,20,40);
    sanitizer.addImage("sanitizer",sanitizerImage);
    sanitizer.scale = 0.2;
    sanitizer.y = Math.round(random(220,300));
    sanitizer.velocityX = -4;
    sanitizer.lifetime = 80; 
    sanitizergroup.add(sanitizer);
}
}
function spawnVirus(){
  if(frameCount%500===0){
    virus = createSprite(300,250,20,40);
    virus.addImage("virus",virusImage);
    virus.scale = 0.15;
    virus.y = Math.round(random(250,320));
    virus.velocityX = -3;
    virus.lifetime = 80; 
    virusgroup.add(virus);
}
}
