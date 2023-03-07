function createSheet(players, loader, stage) {
  console.log('start')
    let spriteSheet = new createjs.SpriteSheet({
        images: [loader.getResult("player")],
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
      console.log(spriteSheet)
      return spriteSheet
}


export default { createSheet } ;

