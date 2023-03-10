import InvaderParent from '../constructors/Invader'


function move(invader) {
        createjs.Tween.get(invader, {override: true})
        .to({ y: invader.y + 150 }, 1000)
        .to({ x: invader.x + -500 }, 2000)
        .to({ y: invader.y + 200 }, 1000)
        .to({ x: invader.x + 0 }, 2000)      
        .to({ y: invader.y + 250 }, 1000)
        .to({ x: invader.x + -500 }, 2000)      
        .to({ y: invader.y + 300 }, 1000)
        .to({ x: invader.x + 0 }, 2000)      
        // .to({ y: invader.y + 350 }, 1000)
        // .to({ x: invader.x + -500 }, 2000) 
        .call(() => {
            if (invader.currentAnimation !== "dying"){
                createjs.Tween.get(invader, { loop: true })
                .to({ y: invader.y - 100}, 2000, createjs.Ease.none)
                .to({ x: invader.x - 500}, 3000, createjs.Ease.none)
                .to({ y: invader.y + 0 }, 2000, createjs.Ease.none)
                .to({ x: invader.x + 0}, 3000, createjs.Ease.none)
            }
        })   
}

function secondMovement(stage,invader) {
    createjs.Tween.get(invader, {override: true})
    .to({ y: invader.y + 150 }, 1000)
    .call(() => {
        if (invader.currentAnimation !== "dying"){
            createjs.Tween.get(invader, { loop: true })
            .to({ x: invader.x - stage.canvas.width +100 }, 3000, createjs.Ease.none)
            .to({ x: invader.x + 0}, 3000, createjs.Ease.none)
        }
    })   
}

function createWave (invaders, spriteSheet, invaderWhiteSpriteSheet, stage) {
    let invader = '';
    let invaderX = stage.canvas.width - 50;
    let invaderY = -10;


    for (let i = 0; i < 24; i++){
        if (i < 11){
            invader = new InvaderParent.Invader(spriteSheet);
        }
        else{
            invader = new InvaderParent.InvaderWhite(invaderWhiteSpriteSheet);
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
                }, 3000);
            }
        }
    }
}


export default { move, createWave, paintWave, moveInvaders } ;

