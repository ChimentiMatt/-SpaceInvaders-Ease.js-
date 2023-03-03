function createPlayer(players, loader, stage) {
    let spriteSheet = new createjs.SpriteSheet({
        images: [loader.getResult("player")],
        framerate: 2,
        "frames": [
            [0, 16, 16, 16],
            [0, 0, 16, 16]
        ],
        animations: {
          "default" : { "frames": [0, 1]}
        }
      });

      let player = new createjs.Sprite(spriteSheet, "default");
      player.x = 100;
      player.y = 450;
      players.push(player)
      stage.addChild(players[0])
}

export default { createPlayer } ;

