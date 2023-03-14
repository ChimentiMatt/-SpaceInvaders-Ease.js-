import InvaderParent from '../constructors/Invader'


function move(invader) {
        createjs.Tween.get(invader, {override: true})
        .to({ y: invader.y + 170 }, 2000)
        .to({ x: invader.x + -500 }, 4000)
        .to({ x: invader.x + 0 }, 4000)      

        .call(() => {
            if (invader.currentAnimation !== "dying"){
                createjs.Tween.get(invader, { loop: true })
                .to({ x: invader.x - 500}, 5000, createjs.Ease.none)
                .to({ x: invader.x + 0}, 3000, createjs.Ease.none)
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
    let invaderX = stage.canvas.width - 50;
    let invaderY = -10;

    // 24
    for (let i = 0; i < 24; i++){

        if (i < 23){
            invader = new InvaderParent.Invader(InvadersGreenSpriteSheet, 'green');
        }
        else{
            invader = new InvaderParent.InvaderBlob(invaderBlobSpriteSheet, 'blob');
        }
        invader.sprite.x = invaderX;
        invader.sprite.y = -invaderY;

        invaderX -= 30;

        if (i === 10){
            invaderX = stage.canvas.width - 50 - 60;
            invaderY += 55
        }

        if (i === 17){
            invaderX = stage.canvas.width - 50 - 89;
            invaderY += 55
        }

        // second wave
        if (i === 23){
            invader.sprite.x = stage.canvas.width - 50;
            invaderY += 55
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

