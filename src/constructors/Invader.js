class Invader {
    constructor(spriteSheet, stage){
      this.spriteSheet = spriteSheet
      this.stage = stage;
      this.invader = new createjs.Sprite(this.spriteSheet, "default");
    }
  
    // addToArray = function(enemies) {
    //   this.invader.x = this.stage.canvas.width - 50;
    //   this.invader.y = -10;

    //   enemies.push(this.invader)
    // }
}


export default Invader ;
