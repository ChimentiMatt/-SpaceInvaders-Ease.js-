function spritesWaveOne(spriteSheet, stage, enemies) {
    let enemy;
    let enemyX = stage.canvas.width - 50;
    let enemyY = -10;
    
    for (let i = 0; i < 23; i++){
        enemy = new createjs.Sprite(spriteSheet, "default");
        enemy.x = enemyX;
        enemy.y = enemyY;
        enemies.push(enemy)

        enemyX -= 30;
  
        if (i === 10){
          enemyX = stage.canvas.width - 50 - 60;
          enemyY += 55
        }

        if (i === 17){
          enemyX = stage.canvas.width - 50 - 89;
          enemyY += 55
        }
      }
}

export default { spritesWaveOne } ;

