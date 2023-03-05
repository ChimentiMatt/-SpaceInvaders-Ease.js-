class Player {
    constructor(){
    }
  
    draw = function(players, stage, spriteSheet) {
      let player = new createjs.Sprite(spriteSheet, "default");
      player.x = 100;
      player.y = 450;
      players.push(player)
      stage.addChild(players[0])
    }
}


export default Player ;
