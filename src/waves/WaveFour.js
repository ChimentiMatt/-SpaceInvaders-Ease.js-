import InvaderParent from '../constructors/Invader'


function move(invader, stage, invaders) {
    if (invader.currentAnimation !== "dying"){
        createjs.Tween.get(invader, {override: true, loop: true })
        .to({ x: invader.x + 200}, 4000)
        .to({ x: invader.x}, 4000)
        .to({ x: invader.x - 200}, 4000)
        .to({ x: invader.x}, 4000)
    }
}

function secondMovement(stage,invader) {
    if (invader.currentAnimation !== "dying"){
        createjs.Tween.get(invader, {override: true, loop: true })
        .to({ x: invader.x - 200}, 2000)
        .to({ x: invader.x}, 2000)
        .to({ x: invader.x + 200}, 2000)
        .to({ x: invader.x}, 2000)
    } 
}

function createWave (invaders, InvadersGreenSpriteSheet, invaderWhiteSpriteSheet, invaderPinkSpriteSheet, invaderBlobSpriteSheet, stage) {
    let invader;
    let invaderX = 210 ;
    let invaderY = -30;
    let counter = 0

    for (let i = 0; i < 20; i++){
        counter++

        
        if (i < 10){

            if (counter === 1){
                invader = new InvaderParent.Invader(InvadersGreenSpriteSheet, 'green');
            }
            else if (counter === 2){
                invader = new InvaderParent.InvaderPink(invaderPinkSpriteSheet, 'pink');   
                counter = 0;
            }

        }
        else{
            invader = new InvaderParent.InvaderWhite(invaderWhiteSpriteSheet, 'white');   
            if( i == 10){
                invaderY -= 100;
                invaderX = 210
            }

        }
        if (i === 11){
        }

        invader.sprite.x = invaderX;
        invader.sprite.y = -invaderY;
        invaderX += 50;

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
        if (invaders[i].currentAnimation !== "dying"){
            move(invaders[i].sprite, stage, invaders);
        }
    }
}

export default { move, createWave, paintWave, moveInvaders } ;

