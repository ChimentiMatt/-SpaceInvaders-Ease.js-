function createHealthBar(loader, stage, healthBars, players) {
    let spriteSheet = new createjs.SpriteSheet({
        images: [loader.getResult("healthBar")],
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
        }
      });

      let healthBar = new createjs.Sprite(spriteSheet, "health10");
      healthBar.x =  players[0].x - 8 ;
      healthBar.y = 475;
      healthBars.push(healthBar)
      stage.addChild(healthBars[0])
}

export default { createHealthBar } ;

