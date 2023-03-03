function spritesWaveOne(spriteSheet, stage, enemies) {
    let enemy;
    let enemyX = stage.canvas.width - 50;
    let enemyY = -10;
    
    for (let i = 0; i < 40; i++){
        enemy = new createjs.Sprite(spriteSheet, "default");
        enemy.x = enemyX;
        enemy.y = enemyY;
        enemies.push(enemy)

        enemyX -= 30;
        if (i === 19){
          enemyX = stage.canvas.width - 50;
          enemyY += 25
        }
      }
}

export default { spritesWaveOne } ;

