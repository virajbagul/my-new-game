var PLAY = 1;
var END = 0;
var gameState = PLAY;

var sheikh
var sheikhimage
//var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound
var backgroundimage 
function preload(){
  //trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  sheikh_collided = loadImage("mariodead.png");
  sheikhimage = loadAnimation("Capture1.png", "Capture3.png" , "Capture4.png")
  //groundImage = loadImage("ground.png","ground2.png");
  backgroundimage = loadImage("background.png")
  cloudImage = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png");
  
  obstacle1 = loadImage("purple.gif");
  obstacle2 = loadImage("white.png");
  obstacle3 = loadImage("blue.png");
  obstacle4 = loadImage("red.png");
  obstacle5 = loadImage("black.gif");
  obstacle6 = loadImage("green.gif ");

  obstacle4.scale=0.1
  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(1800, 750);

  var message = "This is a message";
 console.log(message)
  
 /*trex = createSprite(50,500,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  

  trex.scale = 0.5;*/


  

  sheikh = createSprite(70,500,20,50);
  sheikh.addAnimation("running",sheikhimage)
  sheikh.addAnimation("collided",sheikh_collided);
  // ground = createSprite(200,700,1800,20);
  // ground.addImage("ground",groundImage);
  // ground.x = ground.width/8;


  gameOver = createSprite(750,325);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(755,360);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.25;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,680,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();

  
  /*trex.setCollider("rectangle",0,0,trex.width,trex.height);
  trex.debug = true*/
  
  score = 0;
  
}

function draw() {
  
  background("blue");
  //displaying score
  text("Score: "+ score, 500,50);
  
  console.log(sheikh.y)
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    //ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
    // if (ground.x < 0){
    //   ground.x = ground.width/8;
    // }
    
    //jump when the space key is pressed
    if(keyDown("space")&& sheikh.y >= 100) {
        sheikh.velocityY = -12;
        jumpSound.play();
    }
    
    //add gravity
  sheikh.velocityY = sheikh.velocityY + 0.8
  
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(sheikh)){
        //trex.velocityY = -12;
        jumpSound.play();
        gameState = END;
        dieSound.play()
      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
      cloudsGroup.destroyEach()
     
     
  if(mousePressedOver(restart)) {
      reset();
    }

     //change the trex animation
      sheikh.changeAnimation("collided", sheikh_collided);
    
     
     
     // ground.velocityX = 0;
      sheikh.velocityY = 0
      

     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);    
   }
  
 
  //stop trex from falling down
  sheikh.collide(invisibleGround);
  

  drawSprites();
}

function reset(){
 
  gameState= PLAY;
  
  gameOver.visible=false;
  
  restart.visible=false;
  
 
  
  obstaclesGroup.destroyEach();
  
  cloudsGroup.destroyEach();
  
  
  sheikh.changeAnimation("running",sheikhimage);
  
  score=0;
  
  
}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,600,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;

    obstacle1.scale = 0.05;
    obstacle2.scale = 0.05;
    obstacle3.scale = 0.05;
    obstacle4.scale = 0.05;
    obstacle5.scale = 0.05;
    obstacle6.scale = 0.05;

   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 120 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,300));
    cloud.addAnimation("fly",cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = sheikh.depth;
    sheikh.depth = sheikh.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}

