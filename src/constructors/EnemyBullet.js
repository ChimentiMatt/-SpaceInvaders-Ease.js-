class EnemyBullet {
    constructor(spriteSheet){
        this.bullet = new createjs.Sprite(spriteSheet, "default");
        this.x;
        this.y
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
            
            // current location being set
            this.bullet.x =  currentInvader.x;
            this.bullet.y = currentInvader.y;
            
            // for future reference
            this.x = currentInvader.x
            this.y = currentInvader.y;

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
        let xVariance = Math.floor(Math.random() * (stage.canvas.width - 0) + 0)
        let durationVariance = Math.floor(Math.random() * (3000 - 2000) + 2000)

        durationVariance = 2000
        // y: playerLocation.y + 4  + 150

        createjs.Tween.get(this.bullet)
        .to( { y: this.y + 500}, durationVariance)
        .call(() => {
            stage.removeChild(this.bullet);
            createjs.Tween.removeTweens(this.bullet)
        })

    }
}


export default EnemyBullet ;
