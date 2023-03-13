import invaderBlob from '../assets/invaderBlob.png'

function createSheet() {
    let spriteSheet = new createjs.SpriteSheet({
        images: [invaderBlob],
        framerate: 2,
        "frames": [
            [0, 0, 32, 16],
            [0, 16, 32, 16],
            [0, 32, 32, 16],
        ],

        animations: {
          "default" : { "frames": [0, 1, 2]},
          "dying" : { "frames": [2]},
          "dead": { "frames": [2]}
        }
    });

      return spriteSheet
}

export default { createSheet } ;

