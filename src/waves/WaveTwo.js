import InvaderParent from '../constructors/Invader'

function move(invader, stage, invaders) {
    if (invader.currentAnimation !== "dying"){
        createjs.Tween.get(invader, {override: true})
        .to({ y: invader.y + 50 }, 1500)
        .call(() => {
            if (invader.currentAnimation !== "dying"){
                createjs.Tween.get(invader, { loop: true })
                .to({ x: invader.x - 70}, 5000, createjs.Ease.none)
                .to({ x: invader.x + 70 }, 5000, createjs.Ease.none)
                .to({ x: invader.x  }, 5000, createjs.Ease.none)
            }
        })   
    }
}


function createWave (invaders, InvadersGreenSpriteSheet, invaderWhiteSpriteSheet, invaderPinkSpriteSheet, invaderBlobSpriteSheet, stage) {
    let invader;
    let invaderX = 90;
    let invaderY = -10;
 
    //23
    for (let i = 0; i < 28; i++){
        invader = new InvaderParent.InvaderWhite(invaderWhiteSpriteSheet, 'white');

        invader.sprite.x = invaderX;
        invader.sprite.y = -invaderY;

        if (i === 14 ){
    
            invaderX = 90;
            invaderY -= 50
        }

        invaderX += 50
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
            move(invaders[i].sprite, stage, invaders);
        }
    }
}

export default { move, createWave, paintWave, moveInvaders } ;

