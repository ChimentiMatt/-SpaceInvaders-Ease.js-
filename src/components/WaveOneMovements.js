function move(enemy) {
    createjs.Tween.get(enemy)
    .to({ y: enemy.y + 50 }, 1000)
    .to({ x: enemy.x + -350 }, 2000)
    .to({ y: enemy.y + 150 }, 1000)
    .to({ x: enemy.x + 0 }, 2000)      
    .to({ y: enemy.y + 200 }, 1000)
    .to({ x: enemy.x + -350 }, 2000)      
    .to({ y: enemy.y + 250 }, 1000)
    .to({ x: enemy.x + 0 }, 2000)      
    .to({ y: enemy.y + 300 }, 1000)
    .to({ x: enemy.x + -350 }, 2000)      
}

export default {  move } ;

