class Player {
    constructor(spriteSheet){
      this.player = new createjs.Sprite(spriteSheet, "default");
      this.invincible = false;
    }
  
    addToArray = function(players, stage) {
      this.player.x = 100;
      this.player.y = 450;
      players.push(this.player)
      stage.addChild(players[0])
    }
}


export default Player ;
