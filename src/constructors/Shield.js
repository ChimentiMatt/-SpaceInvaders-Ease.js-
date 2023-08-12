class Shield {
  constructor(spriteSheet) {
    this.sprite = new createjs.Sprite(spriteSheet, "on");
    // let on = false;
  }

  addToArray = function (player, stage, shields) {
    this.sprite.x = player.x + 0.5;
    this.sprite.y = player.y - 10;
    shields.push(this.sprite);
    stage.addChild(shields[0]);
  };
}

export default Shield;
