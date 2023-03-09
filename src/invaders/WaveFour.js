import Invader from '../constructors/Invader'

function move(invader, stage, invaders) {
    console.log('in 4')
    if (invader.currentAnimation !== "dying"){
        createjs.Tween.get(invader, {override: true, loop: true })
        .to({ y: invader.y + 130 }, 1000)
        .to({ x: invader.y + 100, y: invader.x - 280 }, 1000)
        .to({ x: invader.x, y: invader.y  }, 1000)
        .to({ x: invader.y + 500, y: invader.x - 280 }, 1000)
        .to({ x: invader.x, y: invader.y  }, 1000)
    }
}


function createWave (invaders, spriteSheet, invaderWhiteSpriteSheet, stage) {
    let invader;
    let invaderX = 300;
    let invaderY = -10;

    //23
    for (let i = 0; i < 20; i++){
        invader = new Invader(spriteSheet);

        invader.sprite.x = invaderX;
        invader.sprite.y = -invaderY;
        
        // 1 - 3 invaders
        if (i <= 3 ){
            invaderY -= 50
        }
        // 4th invader: the - in H
        if (i === 3 ){
            invaderY = -85;
            invaderX += 35
        }
        if (i === 4 ){
            invaderX += 35
        }
        if (i === 5) {
            invaderY = -10;
            invaderX += 35
        }
        if (i === 6 ){
            invaderY -= 50
        }
        if (i === 7){
            invaderY -= 50
        }
        if (i === 8){
            invaderY -= 50
        }
        if (i === 9){
            invaderY = -10;
            invaderX += 100
        }
        if (i === 10){
            invaderX += 35
        }
        if (i === 11){
            invaderX += 35
        }
        if (i === 12){
            invaderX += 35
        }
        if (i === 13){
            invaderX -= 52
            invaderY -= 50
        }
        if (i === 14){
            invaderY -= 50
        }
        if (i === 15){
            invaderY -= 50
            invaderX -= 52
        }
        if (i === 16){
            invaderX += 35
        }
        if (i === 17){
            invaderX += 35
        }
        if (i === 18){
            invaderX += 35
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
        if (invaders[i].currentAnimation !== "dying"){
            if (i !== 23){
                move(invaders[i].sprite, stage, invaders);
            }
            else{
                setTimeout(() => {
                    secondMovement(stage, invaders[i].sprite)
                }, 3000);
            }
        }
    }
}

export default { move, createWave, paintWave, moveInvaders } ;

