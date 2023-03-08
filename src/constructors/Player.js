class Player {
    constructor(spriteSheet){
      this.player = new createjs.Sprite(spriteSheet, "default");
      this.invincible = false;
      this.rolling = false;
      this.rollCount = 1;
      // this.maxRoll = 3;
    }
  
    addToArray = function(players, stage) {
      this.player.x = stage.canvas.width / 2 - 16;
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
  
        createjs.Tween.get(this.player, {override: true})
        .to({ x: this.player.x + value }, 500)
        .call(() => {
          this.rolling = false
          this.player.gotoAndPlay("default")
          this.invincible = false
        })
  
        this.refillRolls()
      

      }
    }

    refillRolls = function () {
      console.log(this.rollCount)
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
