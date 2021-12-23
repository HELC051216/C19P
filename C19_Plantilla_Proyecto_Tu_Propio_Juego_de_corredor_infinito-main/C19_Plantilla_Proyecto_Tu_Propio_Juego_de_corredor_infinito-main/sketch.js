var FondoImg,fondo;
var CalsetinImg, CalsetinesGroup;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var Regalo, RegalosGroup, RegaloImg;
var Grinch, GrinchImg;
function preload(){
  FondoImg = loadImage("Fondo.png");
  CalsetinImg = loadImage("Calsetin.png");
  RegaloImg = loadImage("Regalo.png");
  GrinchImg = loadImage("Grinch.png");
}

function setup(){
  createCanvas(600,600);
  fondo = createSprite(300,300);
  fondo.addImage("fondo",FondoImg);
  fondo.velocityY = 1;
  
  CalsetinesGroup = new Group();
  RegalosGroup = new Group();
  invisibleBlockGroup = new Group();
  
  Grinch = createSprite(200,200,50,50);
  Grinch.scale = 0.3;
  Grinch.addImage("Grinch", GrinchImg);
}

function draw(){
  background(0);
  if (gameState === "play") {
    if(keyDown("left_arrow")){
        Grinch.x = Grinch.x - 3;
    }
    
    if(keyDown("right_arrow")){
        Grinch.x = Grinch.x + 3;
    }
    
    if(keyDown("space")){
        Grinch.velocityY = -10;
    }
    
    Grinch.velocityY = Grinch.velocityY + 0.8
    
    if(fondo.y > 400){
      fondo.y = 300
    }
    spawnCalsetines();

    
    //climbersGroup.collide(ghost);
    if(RegalosGroup.isTouching(Grinch)){
        Grinch.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(Grinch) || Grinch.y > 600){
        Grinch.destroy();
      gameState = "end"
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

}

function spawnCalsetines() {
  //escribir código aquí para aparecer puertas en la torre.
  if (frameCount % 240 === 0) {
    var Calsetin = createSprite(200, -50);
    var Regalo = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = Regalo.width;
    invisibleBlock.height = 2;
    
    Calsetin.x = Math.round(random(120,400));
    Regalo.x = Calsetin.x;
    invisibleBlock.x = Calsetin.x;
    
    Calsetin.addImage(CalsetinImg);
    Regalo.addImage(RegaloImg);
    
    Calsetin.velocityY = 1;
    Regalo.velocityY = 3;
    invisibleBlock.velocityY = 1;
    
    Grinch.depth = Calsetin.depth;
    Grinch.depth +=1;
   
    //asignar tiempo de vida a la variable
    Calsetin.lifetime = 800;
    Regalo.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //agregar cada puerta al grupo.
    CalsetinesGroup.add(Calsetin);
    invisibleBlock.debug = true;
    RegalosGroup.add(Regalo);
    invisibleBlockGroup.add(invisibleBlock);
  }
}