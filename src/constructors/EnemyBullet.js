class EnemyBullet {
    constructor(spriteSheet){
        this.bullet = new createjs.Sprite(spriteSheet, "default");
    }
  
    addToStage = function(stage, invaders) {
        const aliveInvaders = [];  

        for (let i = 0; i < invaders.length; i++){
            // console.log(invaders[i].currentAnimation)
            if (invaders[i].currentAnimation === 'default'){
                aliveInvaders.push(i)
            }
        }

        // if there are any alive invaders
        if (aliveInvaders.length !== 0){
            let max = aliveInvaders.length -1
            let min = 0
    
            let randomIndex = Math.floor(Math.random() * (max - min) + min)
    
            let currentInvader = invaders[aliveInvaders[randomIndex]]
    
            this.bullet.x =  currentInvader.x;
            this.bullet.y = currentInvader.y;
    
            stage.addChild(this.bullet)
        }
        
    }

    removeIfAtEnd = function () {
        // if off screen return true
        if (this.bullet.y >= 450){
          return true
        }
    }

    direction = function(players, enemyBullets, invaders, stage) {
        let playerLocation = {x: players[0].x, y: players[0].y}

        createjs.Tween.get(this.bullet )
        .to( {x: playerLocation.x , y: playerLocation.y + 4}, 2000)
        .call(() => {
            stage.removeChild(this.bullet);
            createjs.Tween.removeTweens(this.bullet)
        })

    }
}


export default EnemyBullet ;
