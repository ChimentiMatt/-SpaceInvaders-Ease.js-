class Beam {
    constructor(spriteSheet){
      this.beam = new createjs.Sprite(spriteSheet, "default")
      this.madeContact = false
    }
  
    addToArray = function(player, stage, spriteSheet) {
      this.beam.x = player.x;
      this.beam.y = player.y - 17;
    }

    test = function(){
      console.log('test')
    }

    moveBeams = function (player) {

      // Only Tween on first fire
      if (this.beam.y === player.y - 17){ 
          createjs.Tween.get(this.beam)
          .to({ y: -16 }, 1500)
      }
    }

    removeIfOffScreen = function () {
      // if off screen return true
      if (this.beam.y < 10 ){
        return true
      }
    }

    detectCollision = function (beams, enemies, stage, loader) { 
      // console.log(enemies.length)
  
      // loop over invaders
      for (let i = 0; i < enemies.length; i++){
        
        // stop if invader is dead
        if (enemies[i].currentAnimation !== 'dead'){
          
          // if beam y is between invader sprite
          if (this.beam.y <= enemies[i].y + 8 && this.beam.y >= enemies[i].y  ) {
            
            // if beam has not yet made contact
            if (this.beam.currentAnimation !== 'contact'){
              
              // if beam x is between invader sprite
              if (this.beam.x >= enemies[i].x -16 && this.beam.x <= enemies[i].x + 16  ){


                if (!this.madeContact){
                  this.madeContact = true
                  this.beam.visible = false

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

      // if already dead IE double tap effect
      if (enemy.currentAnimation === "dying"){
        createjs.Tween.get(enemy)
        .to({ y: enemy.y - 50, x: enemy.x + 100  }, 200)
        .to({ x: enemy.x + 300, y: enemy.y + 500}, 1300)
      }
      else{
        enemy.gotoAndPlay("dying")

        let deathDirection = Math.floor(Math.random() * (400 - - 400) + - 400)
        // for debugging
        // deathDirection = 0

        let randomAngle = Math.floor(Math.random() * (180 - - 180) + 180)
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
