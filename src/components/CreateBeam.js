function createBeam(beams, loader, player) {
    let spriteSheet = new createjs.SpriteSheet({
        images: [loader.getResult("beam")],
        framerate: 2,
        "frames": [
            [0, 0, 16, 16],
            [0, 16, 16, 16],
            [16, 0, 16, 16]
        ],
        animations: {
          "default" : { "frames": [0, 1, 2]},
          "contact" : { "frames": [0]},
        }
      });

      let beam = new createjs.Sprite(spriteSheet, "default");
      beam.x = player.x;
      beam.y = player.y - 17;
      beams.push(beam)
}

function moveBeams(beams, player) {
    for (let i = 0; i < beams.length; i++){

        // Only Tween on first fire
        if (beams[i].y === player.y - 17){
            createjs.Tween.get(beams[i])
            .to({ y: -16 }, 1000)
        }
    }
}

function detectCollision(beams, enemies, stage) {
  
  for (let i = 0; i < enemies.length; i++){
    
    // used after invader dies for the x value they travel on fall
    let deathDirection = Math.floor(Math.random() * (300 - - 300) + - 300)

    if (enemies[i].currentAnimation !== 'dying'){
    
      // if invader has not yet made contact with beam
      for (let j = 0; j < beams.length; j++){
        
        // if beam y is between invader sprite
        if (beams[j].y <= enemies[i].y + 8 && beams[j].y >= enemies[i].y  ) {

          // if beam has not yet made contact
          if (beams[j].currentAnimation !== 'contact'){

            // if beam x is between invader sprite
            if (beams[j].x >= enemies[i].x && beams[j].x <= enemies[i].x + 16 ){

              enemies[i].gotoAndPlay("dying")
              
              createjs.Tween.get(enemies[i])
              .to({ y: enemies[i].y + 500 , x: enemies[i].x + deathDirection}, 1500)
              .call(() => {
                stage.removeChild(enemies[i])
              })

              beams[j].gotoAndPlay("contact")
              beams[j].visible = false
              stage.removeChild(beams[j])


            }
          }
        }
      }
    }
  }
}



export default { createBeam, moveBeams, detectCollision } ;

