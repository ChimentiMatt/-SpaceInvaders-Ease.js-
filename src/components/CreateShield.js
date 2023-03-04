function createShield(shields, player, loader, stage) {
    let spriteSheet = new createjs.SpriteSheet({
        images: [loader.getResult("shield")],
        framerate: 2,
        "frames": [
            [0, 16, 16, 16],
            [0, 0, 16, 16]
        ],
        animations: {
          "on" : { "frames": [0, 1]},
          "off" : { "frames": [10]}
        }
      });

      let shield = new createjs.Sprite(spriteSheet, "off");
      shield.x = player.x + .5;
      shield.y = player.y - 10;
      shields.push(shield)
      stage.addChild(shields[0])
}

export default { createShield } ;

