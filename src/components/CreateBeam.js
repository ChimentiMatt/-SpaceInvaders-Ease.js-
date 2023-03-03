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
          "default" : { "frames": [0, 1, 2]}
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

export default { createBeam, moveBeams } ;

