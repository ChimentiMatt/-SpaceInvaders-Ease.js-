class EnemyBullet {
    constructor(spriteSheet){
        this.sprite = new createjs.Sprite(spriteSheet, "default");
        this.x;
        this.y
    }
  
    addToStage = function(stage, invaders, index) {
        const aliveInvaders = [];  
        
        for (let i = 0; i < invaders.length; i++){
            if (invaders[i].sprite.currentAnimation === 'default'){
                aliveInvaders.push(i)
            }
        }
        // if there are any alive invaders
        if (aliveInvaders.length !== 0){
            let max = aliveInvaders.length -1
            let min = 0
            
            let randomIndex = Math.floor(Math.random() * (max - min) + min)
            
            // let currentInvader = invaders[aliveInvaders[randomIndex]].sprite
     
            let currentInvader = invaders[index].sprite;
            if (currentInvader.currentAnimation === "default"){
            
                // current location being set
                this.sprite.x =  currentInvader.x;
                this.sprite.y = currentInvader.y;
                
                // for future reference
                this.x = currentInvader.x
                this.y = currentInvader.y;
                
            
                stage.addChild(this.sprite)
            }


        }
        
    }

    removeIfAtEnd = function () {
        // if off screen return true
        if (this.sprite.y >= 450){
          return true
        }
    }

    direction = function(players, stage) {
        let playerLocation = {x: players[0].x, y: players[0].y}
        let xVariance = Math.floor(Math.random() * (stage.canvas.width - 0) + 0)
        let durationVariance = Math.floor(Math.random() * (3000 - 2000) + 2000)

        durationVariance = 2000
        // y: playerLocation.y + 4  + 150

        createjs.Tween.get(this.sprite)
        .to( { y: this.y + 500}, durationVariance)
        .call(() => {
            stage.removeChild(this.sprite);
            createjs.Tween.removeTweens(this.sprite)
        })

    }
}


export default EnemyBullet ;
