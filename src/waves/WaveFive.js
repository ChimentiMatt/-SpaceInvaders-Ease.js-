import InvaderParent from '../constructors/Invader'


function move(invader) {
        createjs.Tween.get(invader, {override: true})
        .to({ y: invader.y + 50 }, 2000)
        .call(() => {
            if (invader.currentAnimation !== "dying"){
                createjs.Tween.get(invader, { loop: true })
                .to({ x: invader.x - 70}, 5000, createjs.Ease.none)
                .to({ x: invader.x + 70 }, 5000, createjs.Ease.none)
                .to({ x: invader.x  }, 5000, createjs.Ease.none)
            }
        })   
}


function createWave (invaders, InvadersGreenSpriteSheet, invaderWhiteSpriteSheet, invaderPinkSpriteSheet, invaderBlobSpriteSheet,  stage) {
    let invader = '';
    let invaderX = 100
    let invaderY = -30;

    for (let i = 0; i < 11; i++){
        invader = new InvaderParent.InvaderBlob(invaderBlobSpriteSheet, 'blob');

        if (i < 7){
            invader.sprite.x = invaderX;
            invader.sprite.y = invaderY;
            invaderX += 100;
        }
        if ( i === 7){
            invader = new InvaderParent.InvaderPink(invaderPinkSpriteSheet, 'pink');
            invaderY = 50
            invaderX = 158;
            invader.sprite.y = invaderY
            invader.sprite.x = invaderX;
        }
        if ( i === 8){
            invader = new InvaderParent.InvaderPink(invaderPinkSpriteSheet, 'pink');
            invaderX += 200;
            invader.sprite.y = invaderY
            invader.sprite.x = invaderX;
        }
        if ( i === 9){
            invader = new InvaderParent.InvaderPink(invaderPinkSpriteSheet, 'pink');
            invaderX += 100;
            invader.sprite.y = invaderY
            invader.sprite.x = invaderX;
        }
        if ( i === 10){
            invader = new InvaderParent.InvaderPink(invaderPinkSpriteSheet, 'pink');
            invaderX += 200;
            invader.sprite.y = invaderY
            invader.sprite.x = invaderX;
        }
        invaders.push(invader);
    }

    paintWave(stage, invaders);
}

function paintWave (stage, invaders) {
    for (let i = 0; i < invaders.length; i++){
      stage.addChild(invaders[i].sprite);
    }
    moveInvaders(invaders, stage);
}

function moveInvaders (invaders, stage) {
    for (let i = 0; i < invaders.length; i++){
        if (invaders[i].sprite.currentAnimation !== "dying"){
            move(invaders[i].sprite, stage, invaders);
        }
    }
}


export default { move, createWave, paintWave, moveInvaders } ;

