class EnemyBullet {
    constructor(spriteSheet){
        this.bullet = new createjs.Sprite(spriteSheet, "default");
    }
  
    addToStage = function(stage, invaders) {
        let randomIndex = Math.floor(Math.random() * (invaders.length + 0) + 0)

        this.bullet.x =  invaders[randomIndex].x;
        this.bullet.y = invaders[randomIndex].y;

        stage.addChild(this.bullet)
    }

    direction = function(players, enemyBullets, invaders) {
        let playerLocation = {x: players[0].x, y: players[0].y}

        createjs.Tween.get(this.bullet, {} )
        .to( {x: playerLocation.x - 16, y: playerLocation.y + 30}, 2000)

    }
}


export default EnemyBullet ;
