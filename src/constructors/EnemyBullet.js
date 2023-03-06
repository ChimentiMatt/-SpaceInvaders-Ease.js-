class EnemyBullet {
    constructor(spriteSheet){
        this.bullet = new createjs.Sprite(spriteSheet, "default");
    }
  
    addToStage = function(stage, invaders) {
        // make an algorithm here where you make an array of all alive invaders by using currentAnimation. Then, select from that index 
        let randomIndex = Math.floor(Math.random() * (invaders.length + 0) + 0)

        this.bullet.x =  invaders[randomIndex].x;
        this.bullet.y = invaders[randomIndex].y;

        stage.addChild(this.bullet)
    }

    direction = function(players, enemyBullets, invaders, stage) {
        let playerLocation = {x: players[0].x, y: players[0].y}

        createjs.Tween.get(this.bullet, {} )
        .to( {x: playerLocation.x - 16, y: playerLocation.y + 4}, 2000)
        .call(() => {
            stage.removeChild(this.bullet);
            createjs.Tween.removeTweens(this.bullet)
        })

    }
}


export default EnemyBullet ;
