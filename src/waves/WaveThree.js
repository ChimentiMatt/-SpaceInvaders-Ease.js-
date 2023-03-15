import InvaderParent from '../constructors/Invader'


function move(invader, stage, invaders) {
    createjs.Tween.get(invader, {override: true})
    .to({ y: invader.y + 220 }, 4000)
}

function secondMovement(stage,invader) {
    createjs.Tween.get(invader, {override: true})
    .to({ y: invader.y + 150 }, 3000) 
}

function thirdMovement(stage,invader) {
    createjs.Tween.get(invader, {override: true})
    .to({ y: invader.y + 150 }, 3000) 
}

function createWave (invaders, InvadersGreenSpriteSheet, invaderWhiteSpriteSheet, invaderPinkSpriteSheet, invaderBlobSpriteSheet, stage) {
    let invader;
    let invaderX =  0;

    let invaderY = 100;

    for (let i = 0; i < 17; i++){
        invader = new InvaderParent.InvaderPink(invaderPinkSpriteSheet, 'pink');

        if (i > -1 && i < 4){
            invaderX += 210
        5;
        }

        if (i === 4){
            invaderX = 50
            // invaderY -= 50
        }
        if (i > 4){
            invaderX += 25

        }   

        if (i === 11){
            invaderX = 700
        }

        invader.sprite.x = invaderX;
        invader.sprite.y = -invaderY;
    
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
            if (i > -1 && i < 5){
                move(invaders[i].sprite, stage, invaders);
            }
            else if (i > 4 && i < 11){
                setTimeout(() => {
                    secondMovement(stage, invaders[i].sprite)
                }, 5000);
            }
            else if (i > 10){
                setTimeout(() => {
                    thirdMovement(stage, invaders[i].sprite)
                }, 8000);
            }
        }
    }
}

export default { move, createWave, paintWave, moveInvaders } ;
