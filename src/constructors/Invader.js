class Invader {
    constructor(spriteSheet){
        this.sprite = new createjs.Sprite(spriteSheet, "default");
    }

    fire(enemyBullets, enemyBulletSheet, players, stage, soundOn) {
        let number = Math.floor(Math.random() * (100 + 0) + 0)
        let bullet;
  
        if (number > 85){
            bullet = new EnemyBullet(enemyBulletSheet)
            enemyBullets.push(bullet)
            bullet.addToStage(stage, invaders, soundOn)
  
            bullet.direction(players, stage);
        }
    }
}

export default Invader ;
