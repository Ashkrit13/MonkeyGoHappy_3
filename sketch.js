var backImage,backgr;
var player, player_running;
var ground,ground_img;
var obstacleImage, obstacleGroup;
var bananaImage, FoodGroup;
var gameOver, gameOverImage;

var score = 0;
var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  obstacleImage = loadImage("stone.png");
  bananaImage = loadImage("banana.png");
  gameOverImage = loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-5;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  //player.debug = true;
  player.setCollider("rectangle",0,0,player.width, player.height);

  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameOver = createSprite(400,250,50,50);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 1;
  gameOver.visible = false;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
 
    if(keyDown("space") && player.y>=280) {
      player.velocityY = -17;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    spawnFood();
    spawnObstacles();
  
  if(FoodGroup.isTouching(player)){
    FoodGroup.destroyEach();
    score += 2;
    player.scale += 0.02;
  }
  if(obstacleGroup.isTouching(player)){
    gameState = END;
  }
}
  else if(gameState === END){
    backgr.velocityX = 0;
    player.visible = false;

    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();

    gameOver.visible = true;
    }
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500,50);
  
}
function spawnFood(){
  if(frameCount % 80 === 0){
    var banana = createSprite(800,250,40,10);
    banana.y = random(120,250);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;

    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    FoodGroup.add(banana);
  }
  
}

function spawnObstacles(){
  if(frameCount % 150 === 0){
    var obstacles = createSprite(800,320,40,40);
    obstacles.addImage(obstacleImage);
    obstacles.scale = 0.11;
    obstacles.velocityX = -5;

    obstacles.lifetime = 300;
    player.depth = obstacles.depth + 1
    obstacleGroup.add(obstacles);

    //obstacles.debug = true;
  }
}