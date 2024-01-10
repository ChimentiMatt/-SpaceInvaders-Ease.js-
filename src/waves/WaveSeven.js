import InvaderParent from '../constructors/Invader'


function move(invader) {
        createjs.Tween.get(invader, {override: true})
        .to({ y: invader.y + 100 }, 2000)
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
    let invaderX = 250
    let invaderY = -30;

    for (let i = 0; i < 28; i++){

        invader = new InvaderParent.InvaderWhite(invaderWhiteSpriteSheet, 'white');

        if (i < 5){
            invaderX += 20;
        }
        else if (i === 5){
            invaderX += 225;
        }
        else if (i > 5 && i < 10 ){
            invaderX += 20;
        }
        else if (i === 10 ){
            invader = new InvaderParent.InvaderPink(invaderPinkSpriteSheet, 'pink');
            invaderX = 30;
            invaderY = -70;
        }
        else if (i > 10 && i < 14){
            invader = new InvaderParent.InvaderPink(invaderPinkSpriteSheet, 'pink');
            invaderX += 30;
        }
        else if (i === 14 ){
            invader = new InvaderParent.InvaderPink(invaderPinkSpriteSheet, 'pink');
            invaderX = 850;
        }
        else if (i > 14 && i < 18 ){
            invader = new InvaderParent.InvaderPink(invaderPinkSpriteSheet, 'pink');
            invaderX -= 30;
        }
        else if (i === 18){
            invaderX -= 105;
        }
        else if (i > 18 && i < 23){
            invaderX -= 20;
        }
        else if (i === 23){
            invaderX -= 223
        }
        else if (i > 23){
            invaderX -= 20;
        }

        invader.sprite.x = invaderX;
        invader.sprite.y = invaderY;
  
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

