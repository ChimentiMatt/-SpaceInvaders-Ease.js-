class Player {
    constructor(spriteSheet){
      this.sprite = new createjs.Sprite(spriteSheet, "default");
      this.invincible = false;
      this.rolling = false;
      this.rollCount = 1;
      this.maxRoll = 1;
    }
  
    addToArray = function(players, stage) {
      this.sprite.x = stage.canvas.width / 2 - 16;
      this.sprite.y = 450;
      players.push(this.sprite)
      stage.addChild(players[0])
    }

    roll = function(direction, healthBars, shields, dashIcons) {
      if (this.rollCount > 0){
        this.invincible = true
        this.rollCount--
        this.rolling = true;
        this.sprite.gotoAndPlay(direction)
  
        let value = 0
  
        if (direction === "left") value = -100
        else value = 100
  
        createjs.Tween.get(healthBars[0], {override: true})
        .to({ x: healthBars[0].x + value }, 500)
  
        createjs.Tween.get(shields[0], {override: true})
        .to({ x: shields[0].x + value }, 500)

        createjs.Tween.get(dashIcons[0], {override: true})
        .to({ x: dashIcons[0].x + value }, 500)

        createjs.Tween.get(dashIcons[1], {override: true})
        .to({ x: dashIcons[1].x + value }, 500)

        createjs.Tween.get(dashIcons[2], {override: true})
        .to({ x: dashIcons[2].x + value }, 500)
  
        createjs.Tween.get(this.sprite, {override: true})
        .to({ x: this.sprite.x + value }, 500)
        .call(() => {
          this.rolling = false
          this.sprite.gotoAndPlay("default")
          this.invincible = false
        })
  
        this.refillRolls();
      }
    }

    refillRolls = function () {
      if (this.rollCount === -1){
        setTimeout(() => {
          this.rollCount++
        }, 3000)
      }
      if (this.rollCount === 0){
        setTimeout(() => {
          this.rollCount++
        }, 3000)
      }
      if (this.rollCount === 1 ){
        setTimeout(() => {
          console.log(1)
          this.rollCount++
        }, 3000)
      }
      if (this.rollCount === 2 ){
        setTimeout(() => {
          console.log(2)
          this.rollCount++
        }, 3000)
      }
      
      // if (this.rollCount < this.maxRoll ){
      //   setTimeout(() => {
      //     this.rollCount++
      //   }, 2000)
      // }
    }
}


export default Player ;
