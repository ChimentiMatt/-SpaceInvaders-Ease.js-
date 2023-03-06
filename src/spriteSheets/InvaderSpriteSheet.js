function createSheet(loader) {
    let spriteSheet = new createjs.SpriteSheet({
        images: [loader.getResult("invader")],
        framerate: 2,
        "frames": [
            [0, 0, 16, 16],
            [16, 0, 16, 16],
            [0, 16, 16, 16],
        ],

        animations: {
          "default" : { "frames": [0, 1]},
          "dying" : { "frames": [2]},
          "dead": { "frames": [2]}
        }
    });

      return spriteSheet
}

export default { createSheet } ;

