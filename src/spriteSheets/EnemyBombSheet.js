import enemyBomb from '../assets/enemyBomb.png'

function createSheet() {
    let spriteSheet = new createjs.SpriteSheet({
        images: [enemyBomb],
        framerate: 4,
        "frames": [
          [0, 0, 16, 16],
          [16, 0, 16, 16],
          [32, , 16, 16],
          [0, 16, 16, 16],
          [16, 16, 16, 16],
          [32, 16, 16, 16],
          [0, 32, 16, 16]
        ],
        animations: {
          "default" : { "frames": [1]},
          "exploding" : {  "frames": [2, 3, 4, 5, 6 ], next: "exploded"},
          // "exploded" : { "frames": [5, 6]},
        }
      });

      return spriteSheet
}

export default { createSheet } ;

