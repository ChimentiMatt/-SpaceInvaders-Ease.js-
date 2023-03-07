function createSheet(loader) {
    let spriteSheet = new createjs.SpriteSheet({
        images: [loader.getResult("dashIcon")],
        framerate: 2,
        "frames": [
            [0, 0, 16, 16],
        ],
        animations: {
          "default" : { "frames": [0, 1, 2]},
        }
      });

      return spriteSheet
}

export default { createSheet } ;

