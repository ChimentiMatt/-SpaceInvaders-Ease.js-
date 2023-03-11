import dashSound from "../assets/sounds/dashSound.mp3"
import notificationSound from "../assets/sounds/notificationSound.mp3"

class Player {
    constructor(spriteSheet){
      this.sprite = new createjs.Sprite(spriteSheet, "default");
      this.invincible = false;
      this.rolling = false;
      this.rollCount = 1;
      this.maxRoll = 1;
      this.attackSpeed = 200;
    }
  
    addToArray = function(players, stage) {
      this.sprite.x = stage.canvas.width / 2 - 16;
      this.sprite.y = 450;
      players.push(this.sprite)
      stage.addChild(players[0])
    }

    roll = function(direction, healthBars, shields, dashIcons, soundOn) {
      if (this.rollCount > 0){
        this.invincible = true
        this.rollCount--
        this.rolling = true;
        this.sprite.gotoAndPlay(direction)
        
        if (soundOn){
          this.playRollSoundEffect()
        }
        
        let value = 0
  
        if (direction === "left") value = -150
        else value = 150
  
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
  
        this.refillRolls(soundOn);
      }
    }

    playRollSoundEffect = function(){
      var soundEffect = new Audio(dashSound)
      soundEffect.play()
      soundEffect.volume = .6
      soundEffect.onended = function(){
        this.remove();
      }  
    }

    playNotificationSoundEffect = function(soundOn){
      if (soundOn){
        var soundEffect = new Audio(notificationSound)
        soundEffect.play()
        soundEffect.volume = .99
        soundEffect.onended = function(){
          this.remove();
        }  
      }
    }

    refillRolls = function (soundOn) {
      if (this.rollCount === -1){
        setTimeout(() => {
          this.rollCount++
          this.playNotificationSoundEffect(soundOn)
        }, 3000)
      }
      if (this.rollCount === 0){
        setTimeout(() => {
          this.rollCount++
          this.playNotificationSoundEffect(soundOn)
        }, 3000)
      }
      if (this.rollCount === 1 ){
        setTimeout(() => {
          console.log(1)
          this.rollCount++
          this.playNotificationSoundEffect(soundOn)
        }, 3000)
      }
      if (this.rollCount === 2 ){
        setTimeout(() => {
          console.log(2)
          this.rollCount++
          this.playNotificationSoundEffect(soundOn)
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
