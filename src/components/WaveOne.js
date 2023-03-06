function move(invader, stage, invaders) {
    if (invader.currentAnimation !== "dying"){
        createjs.Tween.get(invader, {override: true})
        .to({ y: invader.y + 150 }, 1000)
        .to({ x: invader.x + -500 }, 2000)
        .to({ y: invader.y + 200 }, 1000)
        .to({ x: invader.x + 0 }, 2000)      
        .to({ y: invader.y + 250 }, 1000)
        .to({ x: invader.x + -500 }, 2000)      
        .to({ y: invader.y + 300 }, 1000)
        .to({ x: invader.x + 0 }, 2000)      
        .to({ y: invader.y + 350 }, 1000)
        .to({ x: invader.x + -500 }, 2000) 
        .call(() => {
        
            if (invader.currentAnimation !== "dying"){
            
                createjs.Tween.get(invader, { loop: true })
                .to({ y: invader.y - 100}, 1000, createjs.Ease.none)
                .to({ x: invader.x + 500}, 1000, createjs.Ease.none)
                .to({ y: invader.y + 0 }, 1000, createjs.Ease.none)
                .to({ x: invader.x + 0}, 1000, createjs.Ease.none)
            }
        })   

    }


}

function createWaveOne (invaders, spriteSheet, stage) {
    let invader;
    let invaderX = stage.canvas.width - 50;
    let invaderY = -10;

    //23
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
    moveInvaders(invaders, stage)
}

function moveInvaders (invaders, stage) {
    for (let i = 0; i < invaders.length; i++){
      move(invaders[i], stage, invaders)
    }
}

function deleteInvaders (invader, stage, invaders) {
    // invader.visible = false
    // stage.removeChild(invader);
}


export default { move, createWaveOne, paintWave, moveInvaders } ;

