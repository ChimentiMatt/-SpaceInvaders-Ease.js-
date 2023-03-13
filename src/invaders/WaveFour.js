import InvaderParent from '../constructors/Invader'


function move(invader, stage, invaders) {
    if (invader.currentAnimation !== "dying"){
        createjs.Tween.get(invader, {override: true, loop: true })
        .to({ x: invader.x + 200}, 1000)
        .to({ x: invader.x}, 1000)
        .to({ x: invader.x - 200}, 1000)
        .to({ x: invader.x}, 1000)
    }
}

function secondMovement(stage,invader) {
    if (invader.currentAnimation !== "dying"){
        createjs.Tween.get(invader, {override: true, loop: true })
        .to({ x: invader.x - 200}, 1000)
        .to({ x: invader.x}, 1000)
        .to({ x: invader.x + 200}, 1000)
        .to({ x: invader.x}, 1000)
    } 
}

function createWave (invaders, spriteSheet, invaderWhiteSpriteSheet, invaderPinkSpriteSheet, stage) {
    let invader;
    let invaderX = 210 ;
    let invaderY = -30;
    let counter = 0

    //23
    for (let i = 0; i < 20; i++){
        counter++

        
        if (counter === 1){
            invader = new InvaderParent.Invader(spriteSheet);
        }
        else if (counter === 2){
            invader = new InvaderParent.InvaderWhite(invaderWhiteSpriteSheet);   
        }
        else{
            counter = 0;
            invader = new InvaderParent.InvaderPink(invaderPinkSpriteSheet);   
        }

        if (i === 11){
            invaderX = 210;
            invaderY -= 100;
        }

        
        
        invader.sprite.x = invaderX;
        invader.sprite.y = -invaderY;
        
        // 1 - 3 invaders
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
        if (invaders[i].currentAnimation !== "dying"){
            if (i < 11){
                move(invaders[i].sprite, stage, invaders);
            }
            else{
                secondMovement(stage, invaders[i].sprite)
            }
        }
    }
}

export default { move, createWave, paintWave, moveInvaders } ;

