import beamSound from "../assets/sounds/beamSound.mp3"

class Beam {
    constructor(spriteSheet){
      this.sprite = new createjs.Sprite(spriteSheet, "default")
      this.madeContact = false
    }
  
    addToArray = function(player, stage, spriteSheet) {
      this.sprite.x = player.x;
      this.sprite.y = player.y - 17;
    }

    test = function(){
      console.log('test')
    }

    moveBeams = function (player) {
      this.playSoundEffect()
      // Only Tween on first fire
      if (this.sprite.y === player.y - 17){ 
          createjs.Tween.get(this.sprite)
          .to({ y: -16 }, 1500)
      }
    }

    playSoundEffect = function() {
      var soundEffect = new Audio(beamSound)
      soundEffect.play()
      soundEffect.volume = .15
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
      // console.log(enemies.length)
  
      // loop over invaders
      for (let i = 0; i < enemies.length; i++){
        
        // stop if invader is dead
        if (enemies[i].currentAnimation !== 'dead'){
          
          // if beam y is between invader sprite
          if (this.sprite.y <= enemies[i].y + 8 && this.sprite.y >= enemies[i].y  ) {
            
            // if beam has not yet made contact
            if (this.sprite.currentAnimation !== 'contact'){
              
              // if beam x is between invader sprite
              if (this.sprite.x >= enemies[i].x -16 && this.sprite.x <= enemies[i].x + 16  ){


                if (!this.madeContact){
                  this.madeContact = true
                  this.sprite.visible = false

                  // this.deathFall(enemies[i], stage, enemies)
                  // stage.removeChild(this.beam);
                  // beams.splice(i, 1)
                  // enemies.splice(i, 1)
                  
                  // CreateContactExplosion.explode(loader, stage, enemies[i].x, enemies[i].y);
                  return { collision: true, index: i }
                }
              }
            }
          }
        }
      }
      return { collision: false, index: 0 }
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
          stage.removeChild(enemy);
          enemy.gotoAndPlay("dead")
          // createjs.Tween.removeTweens(enemy)
         })
      }
    }
}

export default Beam ;
