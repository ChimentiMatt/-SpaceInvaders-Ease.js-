import enemyBullet from '../assets/enemyBullet.png'

function createSheet() {
    let spriteSheet = new createjs.SpriteSheet({
        images: [enemyBullet],
        framerate: 2,
        "frames": [
          [0, 0, 5, 5],
        ],
        animations: {
          // "default" : { "frames": [0, 1, 2]},
          "default" : { "frames": [0]},
        }
      });

      return spriteSheet
}

export default { createSheet } ;

