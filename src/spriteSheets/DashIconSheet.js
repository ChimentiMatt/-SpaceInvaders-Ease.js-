import dashIcon from '../assets/dashIcon.png'

function createSheet(loader) {
    let spriteSheet = new createjs.SpriteSheet({
        images: [dashIcon],
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

