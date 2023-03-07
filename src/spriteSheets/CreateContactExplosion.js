function createSheet(loader) {
  let spriteSheet = new createjs.SpriteSheet({
    images: [loader.getResult("contactExplosion")],
        framerate: 10,
        "frames": [
          [0, 0, 16, 16],
          [0, 16, 16, 16],
          [16, 0, 16, 16]
        ],
        animations: {
          "default" : { "frames": [0, 2, 1], next: 'done'},
          "done": {"frames": [3]}
        }
      });
      
      return spriteSheet
    }
 
export default { createSheet } ;

