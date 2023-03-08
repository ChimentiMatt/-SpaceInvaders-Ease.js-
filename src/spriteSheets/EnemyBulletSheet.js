import enemyBulletTest from '../assets/enemyBulletTest.png'

function createSheet(loader) {
    let spriteSheet = new createjs.SpriteSheet({
        images: [enemyBulletTest],
        framerate: 2,
        "frames": [
          [0, 0, 5, 5],
          // [0, 0, 16, 16],
          // [0, 16, 16, 16],
          // [16, 0, 16, 16],
          // [16, 16, 16, 16]
        ],
        animations: {
          // "default" : { "frames": [0, 1, 2]},
          "default" : { "frames": [0]},
        }
      });

      return spriteSheet
}

export default { createSheet } ;

