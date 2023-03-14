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
        
        // // 1 - 3 invaders
        // if (i <= 3 ){
        //     invaderY -= 50
        // }
        // // 4th invader: the - in H
        // if (i === 3 ){
        //     invaderY = -85;
        //     invaderX += 35
        // }
        // if (i === 4 ){
        //     invaderX += 35
        // }
        // if (i === 5) {
        //     invaderY = -10;
        //     invaderX += 35
        // }
        // if (i === 6 ){
        //     invaderY -= 50
        // }
        // if (i === 7){
        //     invaderY -= 50
        // }
        // if (i === 8){
        //     invaderY -= 50
        // }
        // if (i === 9){
        //     invaderY = -10;
        //     invaderX += 100
        // }
        // if (i === 10){
        //     invaderX += 35
        // }
        // if (i === 11){
        //     invaderX += 35
        // }
        // if (i === 12){
        //     invaderX += 35
        // }
        // if (i === 13){
        //     invaderX -= 52
        //     invaderY -= 50
        // }
        // if (i === 14){
        //     invaderY -= 50
        // }
        // if (i === 15){
        //     invaderY -= 50
        //     invaderX -= 52
        // }
        // if (i === 16){
        //     invaderX += 35
        // }
        // if (i === 17){
        //     invaderX += 35
        // }
        // if (i === 18){
        //     invaderX += 35
        // }

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
            // if (i !== 28){

            // }
            // else{
            //     setTimeout(() => {
            //         secondMovement(stage, invaders[i].sprite)
            //     }, 3000);
            // }
        }
    }
}

export default { move, createWave, paintWave, moveInvaders } ;

