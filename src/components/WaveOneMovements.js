function move(enemy) {
    createjs.Tween.get(enemy, {override: true})
    .to({ y: enemy.y + 50 }, 1000)
    .to({ x: enemy.x + -500 }, 2000)
    .to({ y: enemy.y + 150 }, 1000)
    .to({ x: enemy.x + 0 }, 2000)      
    .to({ y: enemy.y + 200 }, 1000)
    .to({ x: enemy.x + -500 }, 2000)      
    .to({ y: enemy.y + 250 }, 1000)
    .to({ x: enemy.x + 0 }, 2000)      
    .to({ y: enemy.y + 300 }, 1000)
    .to({ x: enemy.x + -500 }, 2000) 
    .call(() => {
   
    })     
}

function createWaveOne (invaders, spriteSheet, stage) {
    let invader;
    let invaderX = stage.canvas.width - 50;
    let invaderY = -10;

    for (let i = 0; i < 23; i++){
        invader = new createjs.Sprite(spriteSheet, "default");

        invader.x = invaderX;
        invader.y = -invaderY;
        invaders.push(invader)

        invaderX -= 30;

        if (i === 10){
            invaderX = stage.canvas.width - 50 - 60;
            invaderY += 55
        }

        if (i === 17){
            invaderX = stage.canvas.width - 50 - 89;
            invaderY += 55
        }
    }
    
    paintWave(stage, invaders)
}

function paintWave (stage, invaders) {
    for (let i = 0; i < invaders.length; i++){
      stage.addChild(invaders[i])
    }
    moveInvaders(invaders)
}

function moveInvaders (invaders) {
    for (let i = 0; i < invaders.length; i++){
      move(invaders[i])
    }
}

export default { move, createWaveOne, paintWave, moveInvaders } ;

