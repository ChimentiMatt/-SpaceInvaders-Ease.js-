import beamSound from "../assets/sounds/beamSound.mp3"

class Beam {
    constructor(spriteSheet){
      this.sprite = new createjs.Sprite(spriteSheet, "default")
      this.madeContact = false
    }
  
    setLocation = function(player, stage, spriteSheet) {
      this.sprite.x = player.x;
      this.sprite.y = player.y - 17;
    }

    test = function(){
      console.log('test')
    }

    moveBeams = function (player, soundOn) {
      if (soundOn){
        this.playSoundEffect()
      }
      // Only Tween on first fire
      if (this.sprite.y === player.y - 17){ 
          createjs.Tween.get(this.sprite)
          .to({ y: -16 }, 1500)
      }
    }

    playSoundEffect = function() {
      var soundEffect = new Audio(beamSound)
      soundEffect.play()
      soundEffect.volume = .08
      soundEffect.onended = function(){
        this.remove();
      }  
    }

    removeIfOffScreen = function () {
      // if off screen return true
      if (this.sprite.y < 10 ){
        return true
      }
    }

    detectCollision = function (beams, enemies) { 
      let spriteWidth;
      let spriteHeight;

      // loop over invaders
      for (let i = 0; i < enemies.length; i++){
        
        // stop if invader is dead
        if (enemies[i].sprite.currentAnimation !== 'dead'){
          spriteWidth = this.getSpriteWidth(enemies[i].type)
          spriteHeight = this.getSpriteHeight(enemies[i].type)
          
          // if beam y is between invader sprite
          if (this.sprite.y <= enemies[i].sprite.y + spriteHeight && this.sprite.y >= enemies[i].sprite.y - spriteHeight  ) {
            
            // if beam has not yet made contact
            if (this.sprite.currentAnimation !== 'contact'){
              
              // if beam x is between invader sprite
              if (this.sprite.x >= enemies[i].sprite.x -8 && this.sprite.x <= enemies[i].sprite.x + spriteWidth  ){

                if (!this.madeContact){
                  this.madeContact = true
                  this.sprite.visible = false
                  
                  return { collision: true, index: i }
                }
              }
            }
          }
        }
      }
      return { collision: false, index: 0 }
    }

    getSpriteWidth = function (invaderType) {
      if (invaderType === 'blob'){
        return 32
      }
      return 16
    }

    getSpriteHeight = function (invaderType) {
        return 16
    }

    deathFall = function (enemy, stage) {
      let deathDirection, secondDeathDirection;

      // if already dead IE double tap effect
      if (enemy.currentAnimation === "dying"){
        deathDirection = Math.floor(Math.random() * (100 - - 100) + - 100)
        if (deathDirection > 0){
          secondDeathDirection = Math.floor(Math.random() * (0 - 300) + 300)
        }
        else{
          secondDeathDirection = Math.floor(Math.random() * (-300 - 0) + 0)
        }

        createjs.Tween.get(enemy)
        .to({ y: enemy.y - 50, x: enemy.x + deathDirection  }, 200)
        .to({ x: enemy.x + secondDeathDirection, y: enemy.y + 500}, 1300)
      }
      else{
        enemy.gotoAndPlay("dying")

        deathDirection = Math.floor(Math.random() * (400 - - 400) + - 400)
        // for debugging
        // deathDirection = 0

        let randomAngle = Math.floor(Math.random() * (90 - - 90) + 90)
        // for debugging
        // randomAngle = 0
    
        enemy.scaleX = 1.3;
        enemy.scaleY = 1.3;
        
        createjs.Tween.get(enemy)
        .to({ y: enemy.y + 500 , x: enemy.x + deathDirection, rotation : randomAngle}, 1500)
        .call(() => {
          enemy.gotoAndPlay("dead")
          stage.removeChild(enemy);
          
          // createjs.Tween.removeTweens(enemy)
         })
      }
    }
}

export default Beam ;
