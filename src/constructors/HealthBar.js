class HealthBar {
    constructor(){
    }
  
    addToArray = function(players, stage, spriteSheet, healthBars) {
        let healthBar = new createjs.Sprite(spriteSheet, "health10");
        healthBar.x =  players[0].x - 8 ;
        healthBar.y = 470;
        healthBars.push(healthBar)
        stage.addChild(healthBars[0])
    }
}

export default HealthBar ;
