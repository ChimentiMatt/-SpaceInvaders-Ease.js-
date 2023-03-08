import playerImg from '../assets/beam.png'

function createSheet(players, loader, img) {
    let spriteSheet = new createjs.SpriteSheet({
        images: [playerImg],
        // images: [loader.getResult("player")],
        framerate: 2,
        "frames": [
            [0, 0, 16, 16],
            [16, 0, 16, 16],
            [16, 16, 16, 16],
            [0, 16, 16, 16],
        ],
        animations: {
          "default" : { "frames": [0, 1]},
          "right": { "frames": [2]},
          "left": { "frames": [3]}
        }
      });

      console.log([loader.getResult("player")])
      return spriteSheet
}


export default { createSheet } ;

