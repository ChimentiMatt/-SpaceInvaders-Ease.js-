import InvaderParent from '../constructors/Invader'


function move(invader) {
        createjs.Tween.get(invader, {override: true})
        .to({ y: invader.y + 200 }, 2000)
        .call(() => {
            if (invader.currentAnimation !== "dying"){
                createjs.Tween.get(invader, { loop: true })
                .to({ x: invader.x - 70}, 5000, createjs.Ease.none)
                .to({ x: invader.x + 70 }, 5000, createjs.Ease.none)
                .to({ x: invader.x  }, 5000, createjs.Ease.none)
            }
        })   
}

function secondMovement(stage,invader) {
    createjs.Tween.get(invader, {override: true})
    .to({ y: invader.y + 150 }, 2000)
    .call(() => {
        if (invader.currentAnimation !== "dying"){
            createjs.Tween.get(invader, { loop: true })
            .to({ x: invader.x - stage.canvas.width +100 }, 4000, createjs.Ease.none)
            .to({ x: invader.x + 0}, 4000, createjs.Ease.none)
        }
    })   
}

function createWave (invaders, InvadersGreenSpriteSheet, invaderWhiteSpriteSheet, invaderPinkSpriteSheet, invaderBlobSpriteSheet,  stage) {
    let invader = '';
    let invaderX = 100
    let invaderY = -30;

    // 24
    for (let i = 0; i < 16; i++){


        invader = new InvaderParent.InvaderBlob(invaderBlobSpriteSheet, 'blob');

        invader.sprite.x = invaderX;
        invader.sprite.y = invaderY;

        
        if (i < 7){
            invaderX += 100;
        }
        if ( i === 7){
            invaderY -= 150
            invaderX = 100;
        }
        if ( i > 7){
            invaderX += 100;
        }

        
        invaders.push(invader);
    }
 
    paintWave(stage, invaders);
}

function paintWave (stage, invaders) {
    // console.log(invaders.length)
    
    for (let i = 0; i < invaders.length; i++){
      stage.addChild(invaders[i].sprite);
    }
    moveInvaders(invaders, stage);
}

function moveInvaders (invaders, stage) {
    for (let i = 0; i < invaders.length; i++){
        if (invaders[i].sprite.currentAnimation !== "dying"){
            if (i !== 23){
                move(invaders[i].sprite, stage, invaders);
            }
            else{
                setTimeout(() => {
                    secondMovement(stage, invaders[i].sprite)
                }, 4000);
            }
        }
    }
}


export default { move, createWave, paintWave, moveInvaders } ;

