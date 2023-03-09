class Explosion {
    constructor(spriteSheet){
        this.spite = new createjs.Sprite(spriteSheet, "contactExplosion");
    }
  
    addToArray = function(players, stage,  explosions, x, y) {
        this.spite.x = x ;
        this.spite.y = y;

        stage.addChild(this.spite)

        setTimeout(() => {
            stage.removeChild(this.spite)
        }, 200)
    }
}

export default Explosion ;
