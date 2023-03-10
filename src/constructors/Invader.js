import EnemyBullet from './EnemyBullet'

class InvaderParent {
    constructor(spriteSheet){
        this.sprite = new createjs.Sprite(spriteSheet, "default");
    }
}

class Invader extends InvaderParent {
    fire(invaders, index, enemyBullets, enemyBulletSheet, players, stage, soundOn) {
        let number = Math.floor(Math.random() * (100 + 0) + 0)
        let bullet;

        if (number > 98){
            bullet = new EnemyBullet.Bullet(enemyBulletSheet)
            enemyBullets.push(bullet)
            bullet.addToStage(stage, invaders, index)
  
            bullet.direction(players, stage);
        }
    }
    
    fireBomb(invaders, index, enemyBullets, enemyBulletSheet, players, stage, soundOn){
        return
    }
}

class InvaderWhite extends InvaderParent {
    fire(invaders, index, enemyBullets, enemyBulletSheet, players, stage, soundOn) {
        let number = Math.floor(Math.random() * (100 + 0) + 0)
        let bullet;

        if (number > 98){
            bullet = new EnemyBullet.Bullet(enemyBulletSheet)
            enemyBullets.push(bullet)
            bullet.addToStage(stage, invaders, index)
  
            bullet.direction(players, stage);
        }
    }

    fireBomb(invaders, index, enemyBullets, enemyBulletSheet, players, stage, soundOn){
        let number = Math.floor(Math.random() * (1000 + 0) + 0)
        let bullet;
  
        if (number > 998){
            bullet = new EnemyBullet.Bomb(enemyBulletSheet)
            enemyBullets.push(bullet)
            bullet.addToStage(stage, invaders, index)
  
            bullet.direction(players, stage);
        }
    }
}



export default {Invader, InvaderWhite} ;
