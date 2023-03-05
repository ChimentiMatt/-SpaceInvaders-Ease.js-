class Shield {
    constructor(spriteSheet){
        this.shield = new createjs.Sprite(spriteSheet, "off");
    }
  
    addToArray = function(player, stage, shields) {
        this.shield.x = player.x + .5;
        this.shield.y = player.y - 10;
        shields.push(this.shield)
        stage.addChild(shields[0])
    }
}


export default Shield ;
