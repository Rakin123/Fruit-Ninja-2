//Game States
var Play=1;
var End=0;
var gameState= Play;

var sword;
var swordImage ;

var fruit;
var fruit1,fruit2,fruit3,fruit4;

var alien;
var alien1,alien2;

var numberSwitch, gameover, gameoverImage;

var fruitGroup, enemyGroup;

function preload(){
  
  swordImage = loadImage("sword.png");
  
  fruit1 = loadImage ("fruit1.png");
  fruit2 = loadImage ("fruit2.png");
  fruit3 = loadImage ("fruit3.png");
  fruit4 = loadImage ("fruit4.png");
  
  alien1 = loadImage ("alien1.png");
  alien2 = loadImage ("alien2.png");
  
  gameoverImage  = loadImage ("gameover.png");
  
}

function setup() {
  createCanvas(450, 450);
  
  //creating sword
   sword=createSprite(40,200,20,20);
   sword.addImage(swordImage);
   sword.scale=0.7
  
  
  //set collider for sword
  sword.setCollider("rectangle",20,-20,35,35);
  //sword.debug = true;
  
  score=0;
  
  fruitGroup = new Group ();
  enemyGroup = new Group ();
}

function draw() {
  background("lightblue");
  
  if(gameState===Play){
    sword.y=World.mouseY;
    sword.x=World.mouseX;
    
    fruits();
    enemy();
    
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score = score+2;
    }
    
    if(enemyGroup.isTouching(sword)){
      gameState = End;
    }
    
  }else if (gameState === End){
    gameover = createSprite (200,200);
    gameover.addImage(gameoverImage);
    
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    
    sword.y = 200;
    sword.x = 340;
    sword.scale = 0.45;
    
    fruitGroup.setVelocityXEach = 0;
    enemyGroup.setVelocityYEach = 0;
  }
  
  drawSprites();
  
  textSize(20);
  text("Score : "+ score,300,50);
}

function fruits (){
  if (frameCount % 80 === 0){
    fruit = createSprite (0,Math.round(random(20,420)));
    fruit.scale = 0.2;
    
    numberSwitch = Math.round(random(1,4));
    if(numberSwitch === 1){
       fruit.addImage(fruit1);
       }else if(numberSwitch === 2){
         fruit.addImage (fruit2);
       }else if (numberSwitch === 3){
         fruit.addImage (fruit3)
       }else {
         fruit.addImage(fruit4);
       }
    
    fruit.velocityX = 4;
    fruit.setLifetime = 100;
    
    fruitGroup.add(fruit);
  }
}

function enemy (){
  if(frameCount % 170 === 0){
    alien = createSprite (Math.round(random(20,420)),0)
    alien.scale = 1;
    numberSwitch = Math.round(random(1,2))
    if(numberSwitch === 1){
      alien.addImage (alien1);
    }else {
      alien.addImage (alien2);
    }
    alien.velocityY = 5;
    alien.lifetime = 100;
    
    enemyGroup.add(alien);
  }
}
