var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;

var pinkCG, yellowCG,redCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

var obstacle1Img,obstacle2Img,obstacle3Img,obstacle1G,obstacle2G,obstacle3G,obstacles,obstacle2,obstacle3;

function preload(){
  pathImg = loadImage("Road.png");
  mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  mainRacerImg2= loadAnimation("mainPlayer3.png");
  
  oppPink1Img = loadAnimation("opponent1.png","opponent2.png");
  oppPink2Img = loadAnimation("opponent3.png");
  
  oppYellow1Img = loadAnimation("opponent4.png","opponent5.png");
  oppYellow2Img = loadAnimation("opponent6.png");
  
  oppRed1Img = loadAnimation("opponent7.png","opponent8.png");
  oppRed2Img = loadAnimation("opponent9.png");
  
  cycleBell = loadSound("bell.mp3");
  gameOverImg = loadImage("gameOver.png");

  obstacle1Img = loadImage("obstacle1.png");
  obstacle2Img = loadImage("obstacle2.png");
  obstacle3Img = loadImage("obstacle3.png");
}

function setup(){
  
createCanvas(1200,300);
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
//set collider for mainCyclist
mainCyclist.setCollider("circle",50,50,300)
mainCyclist.debug = false;

  
gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
obstacle1G = new Group();
obstacle2G = new Group();
obstacle3G = new Group();
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    //code to play cycle bell sound
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,6));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else if(select_oppPlayer == 3){
      redCyclists();
    } else if(select_oppPlayer == 4){
      obstacles1();
    } else if(select_oppPlayer == 5){
      obstacles2();
    } else {
      obstacles3();
    }
  }
  
   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
    }
    
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
    }

    if(obstacle1G.isTouching(mainCyclist)){
      gameState = END;
    }

    if(obstacle2G.isTouching(mainCyclist)){
      gameState = END;
    }

    if(obstacle3G.isTouching(mainCyclist)){
      gameState = END;
    }
    
}else if (gameState === END) {
    gameOver.visible = true;
    //Add code to show restart game instrution in text here
     text("Prees Up Arrow To Restart The Game",480,200);
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);

    obstacle1G.setVelocityXEach(0);
    obstacle1G.setLifetimeEach(-1);

    obstacle2G.setVelocityXEach(0);
    obstacle2G.setLifetimeEach(-1);

    obstacle3G.setVelocityXEach(0);
    obstacle3G.setLifetimeEach(-1);

    //write condition for calling reset( )
    if(keyDown("up")){
     reset();
    }
}
}

function pinkCyclists(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(1100,Math.round(random(50, 250)));
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(1100,Math.round(random(50, 250)));
        player3.scale =0.06;
        player3.velocityX = -(6 + 2 * distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);
}
function obstacles1(){
  obstacles = createSprite(1100,Math.round(random(50, 250)));
  obstacles.scale = 0.1;
  obstacles.velocityX = -(6 + 2 * distance/150);
  obstacles.addAnimation("obstacle1",obstacle1Img);
  obstacles.setLifetime = 170;
  obstacle1G.add(obstacles);
}
function obstacles2(){
  obstacle2 = createSprite(1100,Math.round(random(50, 250)));
  obstacle2.scale = 0.1;
  obstacle2.velocityX = -(6 + 2 * distance/150);
  obstacle2.addAnimation("obstacle2",obstacle2Img);
  obstacle2.setLifetime = 170;
  obstacle2G.add(obstacle2);
}
function obstacles3(){
  obstacle3 = createSprite(1100,Math.round(random(50, 250)));
  obstacle3.scale = 0.1;
  obstacle3.velocityX = -(6 + 2 * distance/150);
  obstacle3.addAnimation("obstacle3",obstacle3Img);
  obstacle3.setLifetime = 170;
  obstacle3G.add(obstacle3);
}
//create reset function here
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  obstacle1G.destroyEach();
  obstacle2G.destroyEach();
  obstacle3G.destroyEach();
  distance = 0;
}






