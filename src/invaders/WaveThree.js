import Invader from '../constructors/Invader'

function move(invader, stage, invaders) {
    createjs.Tween.get(invader, {override: true})
    .to({ y: invader.y + 120 }, 1000)
    .call(() => {
        createjs.Tween.get(invader, { loop: true})
        .to({ y: invader.y + 40, x: invader.x + 40}, 500, createjs.Ease.none)
        .to({ y: invader.y - 40, x: invader.x - 40}, 1000, createjs.Ease.none)
        .to({ y: invader.y - 0, x: invader.x + 0 }, 500, createjs.Ease.none)
        .to({ y: invader.y + 40, x: invader.x - 40}, 500, createjs.Ease.none)
        .to({ y: invader.y - 40, x: invader.x + 40}, 1000, createjs.Ease.none)
        .to({ y: invader.y - 0, x: invader.x + 0 }, 500, createjs.Ease.none)
    })
}

function secondMovement(stage,invader) {
    createjs.Tween.get(invader, {override: true})
    .to({ y: invader.y + 210 }, 500)
    .call(() => {
        if (invader.currentAnimation !== "dying"){
            createjs.Tween.get(invader, { loop: true })
            .to({ y: invader.y - 40, x: invader.x + 40 }, 500, createjs.Ease.none)
            .to({ y: invader.y + 40, x: invader.x - 40}, 1000, createjs.Ease.none)
            .to({ y: invader.y + 0, x: invader.x - 0 }, 500, createjs.Ease.none)
            .to({ y: invader.y - 40, x: invader.x - 40 }, 500, createjs.Ease.none)
            .to({ y: invader.y + 40, x: invader.x + 40}, 1000, createjs.Ease.none)
            .to({ y: invader.y + 0, x: invader.x - 0 }, 500, createjs.Ease.none)
        }
    })   
}

function createWave (invaders, spriteSheet, stage) {
    let invader;
    let invaderX =  150;

    let invaderY = -10;

    for (let i = 0; i < 13; i++){
        invader = new Invader(spriteSheet);

        invader.sprite.x = invaderX;
        invader.sprite.y = -invaderY;
        
        invaderX += 200;
        
        // lower row 
        if (i === 3){
            invaderX = 150;
            invaderY -= 55 * 2
        }
        

        // second wave
        if (i === 7){
            invaderX = 50;
            invaderY = 16;
        }



        invaders.push(invader)
        
    }
    
    paintWave(stage, invaders)
}

function paintWave (stage, invaders) {
    for (let i = 0; i < invaders.length; i++){
        stage.addChild(invaders[i].sprite)
    }
    moveInvaders(invaders, stage)
}

function moveInvaders (invaders, stage) {
    for (let i = 0; i < invaders.length; i++){
        if (invaders[i].sprite.currentAnimation !== "dying"){
            if (i < 8){
                move(invaders[i].sprite, stage, invaders);
            }
            else{
                setTimeout(() => {
                    secondMovement(stage, invaders[i].sprite)
                }, 500);
            }
        }
    }
}

export default { move, createWave, paintWave, moveInvaders } ;
