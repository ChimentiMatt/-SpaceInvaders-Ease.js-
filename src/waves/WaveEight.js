import InvaderParent from '../constructors/Invader'


function move(invader) {
        createjs.Tween.get(invader, {override: true})
        .to({ y: invader.y + 100 }, 2000)
        .call(() => {
            if (invader.currentAnimation !== "dying"){
                // createjs.Tween.get(invader, { loop: true })
                // .to({ x: invader.x - 70}, 5000, createjs.Ease.none)
                // .to({ x: invader.x + 70 }, 5000, createjs.Ease.none)
                // .to({ x: invader.x  }, 5000, createjs.Ease.none)
            }
        })   
}

function createWave (invaders, InvadersGreenSpriteSheet, invaderWhiteSpriteSheet, invaderPinkSpriteSheet, invaderBlobSpriteSheet,  stage) {
    let invader = '';
    let invaderX = 50
    let invaderY = -70;

    for (let i = 0; i < 76; i++){

        invader = new InvaderParent.Invader(InvadersGreenSpriteSheet, 'green');

        if (i < 38){
            invaderX += 20;
        }

        if (i === 38){
            invaderX = 70
            invaderY = -50
        }
        if (i > 38){
            invaderX += 20;
        }




        invader.sprite.x = invaderX;
        invader.sprite.y = invaderY;
  
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
            move(invaders[i].sprite, stage, invaders);
        }
    }
}


export default { move, createWave, paintWave, moveInvaders } ;

