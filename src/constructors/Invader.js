import EnemyBullet from './EnemyBullet'

class InvaderParent {
    constructor(spriteSheet, type){
        this.sprite = new createjs.Sprite(spriteSheet, "default");
        this.startBtn = false;
        this.type = type;
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
        return;
    }
    fireBomb() {
        return
    }
    homingBullet(){
        return;
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
        return;
    }

    homingBullet(invaders, index, enemyBullets, enemyBulletSheet, players, stage, soundOn){
        return;
    }
}

class InvaderWhite extends InvaderParent {
    fire(invaders, index, enemyBullets, enemyBulletSheet, players, stage, soundOn) {
        let number = Math.floor(Math.random() * (1000 + 0) + 0)
        let bullet;

        if (number > 998){
            bullet = new EnemyBullet.Bullet(enemyBulletSheet)
            enemyBullets.push(bullet)
            bullet.addToStage(stage, invaders, index)
  
            bullet.direction(players, stage);
        }
    }

    fireBomb(invaders, index, enemyBullets, enemyBulletSheet, players, stage, soundOn){
        let number = Math.floor(Math.random() * (1000 + 0) + 0)
        let bullet;
  
        if (number > 997){
            bullet = new EnemyBullet.Bomb(enemyBulletSheet)
            enemyBullets.push(bullet)
            bullet.addToStage(stage, invaders, index)
  
            bullet.direction(players, stage);
        }
    }

    homingBullet(){
        return;
    }
}


class InvaderPink extends InvaderParent {
    fire(invaders, index, enemyBullets, enemyBulletSheet, players, stage, soundOn) {
        return;
    }

    fireBomb(invaders, index, enemyBullets, enemyBulletSheet, players, stage, soundOn){
        return;
    }

    homingBullet(invaders, index, enemyBullets, enemyBulletSheet, players, stage, soundOn){
        let number = Math.floor(Math.random() * (1000 + 0) + 0)
        let bullet;

        if (number > 980){
            bullet = new EnemyBullet.Homing(enemyBulletSheet)
            enemyBullets.push(bullet)
            bullet.addToStage(stage, invaders, index)
  
            bullet.direction(players, stage);
        }
    }
}

class InvaderBlob extends InvaderParent {
    fire(invaders, index, enemyBullets, enemyBulletSheet, players, stage, soundOn) {
        return;
    }

    fireBomb(invaders, index, enemyBullets, enemyBulletSheet, players, stage, soundOn){
        return;
    }

    homingBullet(invaders, index, enemyBullets, enemyBulletSheet, players, stage, soundOn){

    }
}

export default {StartBtnInvader, Invader, InvaderWhite, InvaderPink, InvaderBlob} ;
