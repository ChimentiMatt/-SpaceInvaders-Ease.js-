

function move(invader, stage, invaders) {
    createjs.Tween.get(invader, {override: true})
    .to({ y: invader.y + 120 }, 1000)
    .call(() => {
        createjs.Tween.get(invader, { loop: true})
        .to({ x: invader.x + 30}, 500, createjs.Ease.none)
        .to({ x: invader.x - 30}, 1000, createjs.Ease.none)
        .to({ x: invader.x + 0 }, 500, createjs.Ease.none)
    })
}

function createWave (invaders, spriteSheet, stage) {
    let invader;
    let invaderX = stage.canvas.width / 2;
    invaderX = 40;

    let invaderY = -10;

    for (let i = 0; i < 26; i++){
        invader = new createjs.Sprite(spriteSheet, "default");

        invader.x = invaderX;
        invader.y = -invaderY;
        invaders.push(invader)

        invaderX += 100;

        if (i === 8){
            invaderX = 100;
            invaderY -= 55
        }

        if (i === 16){
            invaderX = 40;
            invaderY -= 55
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
    // stage.removeChild(invader);
}

export default { move, createWave, paintWave, moveInvaders } ;
