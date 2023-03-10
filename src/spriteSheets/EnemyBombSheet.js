import enemyBomb from '../assets/enemyBomb.png'

function createSheet() {
    let spriteSheet = new createjs.SpriteSheet({
        images: [enemyBomb],
        framerate: 2,
        "frames": [
          [0, 0, 16, 16],
          [16, 0, 16, 16],
          [0, 16, 16, 16],
          [16, 16, 16, 16],
          [0, 32, 16, 16],
          [16, 32, 16, 16]
        ],
        animations: {
          // "default" : { "frames": [0, 1, 2]},
          "default" : { "frames": [0, 1, 2, 3, 4 , 5]},
        }
      });

      return spriteSheet
}

export default { createSheet } ;

