import contactSound from "../assets/sounds/contactSound.mp3"
import dashSound from "../assets/sounds/dashSound.mp3"

class Explosion {
    constructor(spriteSheet){
        this.spite = new createjs.Sprite(spriteSheet, "contactExplosion");
    }
  
    addToStage = function(stage, x, y) {
        this.spite.x = x ;
        this.spite.y = y;

        stage.addChild(this.spite);
        this.playSoundEffect();

        setTimeout(() => {
            stage.removeChild(this.spite)
        }, 200)
    }

    playSoundEffect = function(){
        var soundEffect = new Audio(contactSound)
        soundEffect.play()
        soundEffect.volume = .5
        soundEffect.onended = function(){
          this.remove();
        }  
    }
}

export default Explosion ;
