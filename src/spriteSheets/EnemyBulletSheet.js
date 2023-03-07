function createSheet(loader) {
    let spriteSheet = new createjs.SpriteSheet({
        images: [loader.getResult("enemyBulletTest")],
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

