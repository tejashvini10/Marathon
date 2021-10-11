class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,100);
    car1.addAnimation("Runner-1",runner_img);
    car1.scale=0.1;
    car2 = createSprite(300,100);
    car2.addAnimation("Runner3",runner_img2);
    car2.scale=0.1;
    cars = [car1, car2];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getRank();
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 300 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = 300 +allPlayers[plr].distanceX ;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distanceY;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
         // stroke(10)
          //fill("yellow")
         // ellipse(x,y,100,100);
          //cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distanceY +=10
      player.update();
    }
if(keyDown(LEFT_ARROW) || keyDown(RIGHT_ARROW) ) {
  if(keyDown(RIGHT_ARROW)) {
    player.distanceX +=5
  }
  if(keyDown(LEFT_ARROW)) {
    player.distanceX -=5
  }
  player.update()
}
    if(player.distance > 3860){
      gameState = 2;
      player.rank=player.rank+1;
      player.rank
      player.updateRank(player.rank);
      
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
  }
}
