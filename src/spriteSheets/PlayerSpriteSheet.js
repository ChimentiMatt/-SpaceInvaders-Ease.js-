import playerImg from '../assets/player.png'

function createSheet(players) {
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

      return spriteSheet
}


export default { createSheet } ;

