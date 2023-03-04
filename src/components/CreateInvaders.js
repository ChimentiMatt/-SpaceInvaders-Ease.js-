import CreateWaveOne from './CreateWaveOne.js';

function createInvaders(loader, stage, spriteSheet, enemies) {
    spriteSheet = new createjs.SpriteSheet({
        images: [loader.getResult("invader")],
        framerate: 2,
        "frames": [
            [0, 0, 16, 16],
            [16, 0, 16, 16],
            [0, 16, 16, 16],
        ],

        animations: {
          "default" : { "frames": [0, 1]},
          "dying" : { "frames": [2]}
        }
    });

    CreateWaveOne.spritesWaveOne(spriteSheet, stage, enemies)
}

export default { createInvaders } ;

