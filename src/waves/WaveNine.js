import InvaderParent from '../constructors/Invader'


function move(invader) {
        createjs.Tween.get(invader, {override: true})
        .to({ y: invader.y + 80 }, 2000)
        .to({ x: invader.y + 100, y: invader.x}, 2000, createjs.Ease.none)
        .call(() => {
            if (invader.currentAnimation !== "dying"){
                createjs.Tween.get(invader, { loop: true })
                .to({ x: 850}, 4000, createjs.Ease.none)
                .to({ x: 30}, 4000, createjs.Ease.none)
            }
        })   
}


function createWave (invaders, InvadersGreenSpriteSheet, invaderWhiteSpriteSheet, invaderPinkSpriteSheet, invaderBlobSpriteSheet,  stage) {
    let invader = '';
    let invaderX = 50
    let invaderY = -70;

    for (let i = 0; i < 42; i++){

        if (i < 14){
            invader = new InvaderParent.Invader(InvadersGreenSpriteSheet, 'green');
        }
        else if ( i < 28){
            invader = new InvaderParent.InvaderWhite(invaderWhiteSpriteSheet, 'white');
        }
        else {
            invader = new InvaderParent.InvaderPink(invaderPinkSpriteSheet, 'pink');
        }

        if (i === 14 || i === 28){
            invaderX = 50
        }

        invaderX += 20;
 

        // if (i === 38){
        //     invaderX = 70
        //     invaderY = -50
        // }
        // if (i > 38){
        //     invaderX += 20;
        // }

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
            if (i < 14){
                move(invaders[i].sprite, stage, invaders);
            }
            else if (i < 28){
                setTimeout(() => {
                    move(invaders[i].sprite, stage, invaders);
                }, 5000)
            }
            else {
                setTimeout(() => {
                    move(invaders[i].sprite, stage, invaders);
                }, 10000)
            }
        }
    }
}


export default { move, createWave, paintWave, moveInvaders } ;

