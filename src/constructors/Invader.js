import EnemyBullet from './EnemyBullet'

class InvaderParent {
    constructor(spriteSheet){
        this.sprite = new createjs.Sprite(spriteSheet, "default");
        this.startBtn = false
    }
}

class StartBtnInvader extends InvaderParent {
    addToArrayAndStage(startBtnInvader, invaders, stage) {
        this.sprite.x = stage.canvas.width / 2 - 16
        this.sprite.y = 100
        invaders.push(startBtnInvader)
        stage.addChild(startBtnInvader.sprite)
    }

    fire(){

    }
    fireBomb() {

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

export default {StartBtnInvader, Invader, InvaderWhite} ;
