import EnemyBullet from './EnemyBullet'

class Invader {
    constructor(spriteSheet){
        this.sprite = new createjs.Sprite(spriteSheet, "default");
    }

    fire(invaders, index, enemyBullets, enemyBulletSheet, players, stage, soundOn) {
        let number = Math.floor(Math.random() * (100 + 0) + 0)
        let bullet;
  
        if (number > 95){
            bullet = new EnemyBullet(enemyBulletSheet)
            enemyBullets.push(bullet)
            bullet.addToStage(stage, invaders, index)
  
            bullet.direction(players, stage);
        }
    }
}

export default Invader ;
