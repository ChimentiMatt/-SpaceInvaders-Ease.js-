function createHealthBar(loader, stage, healthBars) {
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
          "default" : { "frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]}
        }
      });

      let healthBar = new createjs.Sprite(spriteSheet, "default");
      healthBar.x =  (stage.canvas.width /2) - 32;
      healthBar.y = 480;
      healthBars.push(healthBar)
      stage.addChild(healthBars[0])
}

export default { createHealthBar } ;

