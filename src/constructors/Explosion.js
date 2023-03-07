class Explosion {
    constructor(){
    }
  
    addToArray = function(players, stage, spriteSheet, explosions, x, y) {
        let explosion = new createjs.Sprite(spriteSheet, "contactExplosion");
        explosion.x = x ;
        explosion.y = y;

        stage.addChild(explosion)

        setTimeout(() => {
            stage.removeChild(explosion)
        }, 200)
    }
}

export default Explosion ;
