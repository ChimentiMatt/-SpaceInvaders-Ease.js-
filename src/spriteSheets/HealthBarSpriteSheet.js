import health from '../assets/health.png'

function createSheet(loader) {
    let spriteSheet = new createjs.SpriteSheet({
        images: [health],
        framerate: 2,
        "frames": [
            // 100 decreasing by 10 down to an empty bar
            [0, 8, 32, 16],
            [32, 8, 32, 16],
            [64, 8, 32, 16],

            [0, 40, 32, 16],
            [32, 40, 32, 16],
            [64, 40, 32, 16],

            [0, 72, 32, 16],
            [32, 72, 32, 16],
            [64, 72, 32, 16],

            [0, 104, 32, 16],
            [32, 104, 32, 16],
        ],
        animations: {
          "health10" : { "frames": [0]},
          "health9" : { "frames": [1]},
          "health8" : { "frames": [2]},
          "health7" : { "frames": [3]},
          "health6" : { "frames": [4]},
          "health5" : { "frames": [5]},
          "health4" : { "frames": [6]},
          "health3" : { "frames": [7]},
          "health2" : { "frames": [8]},
          "health1" : { "frames": [9]},
          "dead" : { "frames": [0]},
        }
      });

      return spriteSheet
}

export default { createSheet } ;

