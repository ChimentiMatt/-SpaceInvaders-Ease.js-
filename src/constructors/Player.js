class Player {
    constructor(spriteSheet){
      this.player = new createjs.Sprite(spriteSheet, "default");
      this.invincible = false;
      this.rolling = false;
      this.rollCount = 3;
    }
  
    addToArray = function(players, stage) {
      this.player.x = 100;
      this.player.y = 450;
      players.push(this.player)
      stage.addChild(players[0])
    }

    roll = function(direction, healthBars, shields, dashIcons) {
      if (this.rollCount > 0){
        this.invincible = true
        this.rollCount--
        this.rolling = true;
        this.player.gotoAndPlay(direction)
  
        let value = 0
  
        if (direction === "left") value = -250
        else value = 250
  
        createjs.Tween.get(healthBars[0], {override: true})
        .to({ x: healthBars[0].x + value }, 1000)
  
        createjs.Tween.get(shields[0], {override: true})
        .to({ x: shields[0].x + value }, 1000)

        createjs.Tween.get(dashIcons[0], {override: true})
        .to({ x: dashIcons[0].x + value }, 1000)

        createjs.Tween.get(dashIcons[1], {override: true})
        .to({ x: dashIcons[1].x + value }, 1000)

        createjs.Tween.get(dashIcons[2], {override: true})
        .to({ x: dashIcons[2].x + value }, 1000)
  
        createjs.Tween.get(this.player, {override: true})
        .to({ x: this.player.x + value }, 1000)
        .call(() => {
          this.rolling = false
          this.player.gotoAndPlay("default")
          this.invincible = false
        })
  
        this.refillRolls()

      }
    }

    refillRolls = function () {
      if (this.rollCount === 0){
        setTimeout(() => {
          this.rollCount++
        }, 5000)
      }
      if (this.rollCount === 1){
        setTimeout(() => {
          this.rollCount++
        }, 5000)
      }
      if (this.rollCount === 2){
        setTimeout(() => {
          this.rollCount++
        }, 5000)
      }
    }
}


export default Player ;
