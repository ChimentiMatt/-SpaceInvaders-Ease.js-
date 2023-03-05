import CreateContactExplosion from '../components/CreateContactExplosion';

class Beam {
    constructor(){
    }
  
    draw = function(player, stage, spriteSheet, beams) {
        let beam = new createjs.Sprite(spriteSheet, "default");
        beam.x = player.x;
        beam.y = player.y - 17;
        beams.push(beam)
    }

    moveBeams = function (beams, player) {
        for (let i = 0; i < beams.length; i++){
    
            // Only Tween on first fire
            if (beams[i].y === player.y - 17){
                createjs.Tween.get(beams[i])
                .to({ y: -16 }, 1500)
            }
        }
    }

    removeIfOffScreen = function (beams, stage) {
      for (let i = 0; i < beams.length; i++){
        if (beams[i].y < 20){
          beams.splice(1, i)
          stage.removeChild(beams[i]);
        }
      }
    }

    detectCollision = function (beams, enemies, stage, loader) {
  
        // loop over invaders
        for (let i = 0; i < enemies.length; i++){
      
          // used after invader dies for the x value they travel on fall
          let deathDirection = Math.floor(Math.random() * (200 - - 200) + - 200)
          deathDirection = 0
      
          // stop if invader is dead
          if (enemies[i].currentAnimation !== 'dying'){
          
            // if invader has not yet made contact with beam
            for (let j = 0; j < beams.length; j++){
              
              // if beam y is between invader sprite
              if (beams[j].y <= enemies[i].y + 8 && beams[j].y >= enemies[i].y  ) {
      
                // if beam has not yet made contact
                if (beams[j].currentAnimation !== 'contact'){
      
                  // if beam x is between invader sprite
                  if (beams[j].x >= enemies[i].x -16 && beams[j].x <= enemies[i].x + 16  ){
      
                    enemies[i].gotoAndPlay("dying")
                    enemies[i].scaleX = 1.3;
                    enemies[i].scaleY = 1.3;
                    let randomAngle = Math.floor(Math.random() * (180 - - 180) + 180)
      
      
                    createjs.Tween.get(enemies[i])
                    .to({ y: enemies[i].y + 500 , x: enemies[i].x + deathDirection, rotation : randomAngle}, 1500)
                    .call(() => {
                      stage.removeChild(enemies[i]);
                     })
      
                    // beams[j].gotoAndPlay("contact");

                    // problem below
                    beams[j].visible = false;
                    beams.splice(1, j)



                    stage.removeChild(beams[j]);
      
                    CreateContactExplosion.explode(loader, stage, enemies[i].x, enemies[i].y);
      
                  }
                }
              }
            }
          }
        }
      }
    
}


export default Beam ;
