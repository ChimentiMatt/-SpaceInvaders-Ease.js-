class HealthBar {
    constructor(spriteSheet){
        this.sprite = new createjs.Sprite(spriteSheet, "health10");
        this.healthPoints = 10;
    }
  
    addToArray = function(players, stage, healthBars) {
        this.sprite.x =  players[0].x - 8 ;
        this.sprite.y = 470;
        healthBars.push(this.sprite)
        stage.addChild(healthBars[0])
    }

    takeDamage = function(invincible) {
      if (!invincible){
        switch(this.healthPoints){
          case 10:
            this.sprite.gotoAndPlay("health9");
            this.healthPoints = 9;
            break;
          case 9:
            this.sprite.gotoAndPlay("health8");
            this.healthPoints = 8;
            break;
          case 8:
            this.sprite.gotoAndPlay("health7");
            this.healthPoints = 7;
            break;
          case 7:
            this.sprite.gotoAndPlay("health6");
            this.healthPoints = 6;
            break;
          case 6:
            this.sprite.gotoAndPlay("health5");
            this.healthPoints = 5;
            break;
          case 5:
            this.sprite.gotoAndPlay("health4");
            this.healthPoints = 4;
            break;
          case 4:
            this.sprite.gotoAndPlay("health3");
            this.healthPoints = 3;
            break;
          case 3:
            this.sprite.gotoAndPlay("health2");
            this.healthPoints = 2;
            break;
          case 2:
            this.sprite.gotoAndPlay("health1");
            this.healthPoints = 1;
            break;
          case 1:
            this.sprite.gotoAndPlay("dead");
            this.healthPoints = 0;
            break;
          default:
            // this.healthBars[0].gotoAndPlay("health10");
          }
        }
      }

      heal = function() {

        switch(this.healthPoints){
          case 10:
            this.sprite.gotoAndPlay("health10");
            this.healthPoints = 10;
            break;
          case 9:
            this.sprite.gotoAndPlay("health10");
            this.healthPoints = 10;
            break;
          case 8:
            this.sprite.gotoAndPlay("health9");
            this.healthPoints = 9;
            break;
          case 7:
            this.sprite.gotoAndPlay("health8");
            this.healthPoints = 8;
            break;
          case 6:
            this.sprite.gotoAndPlay("health7");
            this.healthPoints = 7;
            break;
          case 5:
            this.sprite.gotoAndPlay("health6");
            this.healthPoints = 6;
            break;
          case 4:
            this.sprite.gotoAndPlay("health5");
            this.healthPoints = 5;
            break;
          case 3:
            this.sprite.gotoAndPlay("health4");
            this.healthPoints = 4;
            break;
          case 2:
            this.sprite.gotoAndPlay("health3");
            this.healthPoints = 3;
            break;
          case 1:
            this.sprite.gotoAndPlay("health2");
            this.healthPoints = 2;
            break;
          default:
            // this.healthBars[0].gotoAndPlay("health10");
          
        }
      }
}

export default HealthBar ;
