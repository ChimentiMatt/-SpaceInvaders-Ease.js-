class HealthBar {
    constructor(){
    }
  
    draw = function(players, stage, spriteSheet, healthBars) {
        let healthBar = new createjs.Sprite(spriteSheet, "health10");
        healthBar.x =  players[0].x - 8 ;
        healthBar.y = 475;
        healthBars.push(healthBar)
        stage.addChild(healthBars[0])
    }
}


export default HealthBar ;
