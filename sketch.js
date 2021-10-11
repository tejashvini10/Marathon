var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cars, car1, car2, car3, car4;
var obstacleGroup,coinGroup;
var track, car1_img, car2_img, car3_img, car4_img;
var runner_img;
function preload(){
  track = loadImage("images/track.jpg");
  runner_img2=loadAnimation("images/Runner3.png","images/Runner4.png");
  
  runner_img=loadAnimation("images/Runner1.png","images/Runner2.png");
  o1=loadImage("images/obstacle1.png");
  o2=loadImage("images/obstacle2.png");
  coinI=loadImage("images/coin.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  obstacleGroup=createGroup()
  coinGroup=createGroup()
  for(i=0;i<5;i++){
    w=random(200,900)
    h=random(-height*4,height-300)
    obstacle=createSprite(w,h)
    rand=Math.round(random(1,2))
    console.log(rand);
    switch(rand){
      case 1: obstacle.addImage(o1);
      break;
      case 2: obstacle.addImage(o2);
      break;
    }
   
    obstacleGroup.add(obstacle);
  }
  for(i=0;i<5;i++){
    w=random(200,900)
    h=random(-height*4,height-300)
    coin=createSprite(w,h)
    coin.addImage(coinI);
    coinGroup.add(coin);
    coin.scale=0.03;
  }
}


function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
