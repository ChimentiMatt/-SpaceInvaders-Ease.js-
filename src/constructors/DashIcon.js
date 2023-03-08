class DashIcon {
    constructor(){
    }
  
    addToArray = function(players, stage, spriteSheet, dashIcons) {
        let icon = new createjs.Sprite(spriteSheet, "dashIcon");
        icon.x =  players[0].x - 11 ;
        icon.y = 483;
        
        dashIcons.push(icon)
        stage.addChild(dashIcons[0])

        icon = new createjs.Sprite(spriteSheet, "dashIcon");
        icon.x =  players[0].x - 1;
        icon.y = 483;
        dashIcons.push(icon)
        // dashIcons[1].visible = false
        stage.addChild(dashIcons[1])

        icon = new createjs.Sprite(spriteSheet, "dashIcon");
        icon.x =  players[0].x + 9 ;
        icon.y = 483;
        dashIcons.push(icon)
        // dashIcons[2].visible = false
        stage.addChild(dashIcons[2])
        
    }

    updateIcons = function(rollCount, dashIcons) {
        if (rollCount === 0){
            dashIcons[0].visible = false
            dashIcons[1].visible = false
            dashIcons[2].visible = false
        }
        else if (rollCount === 1){
            dashIcons[0].visible = true
            dashIcons[1].visible = false
            dashIcons[2].visible = false
        }
        else if (rollCount === 2){
            dashIcons[0].visible = true
            dashIcons[1].visible = true
            dashIcons[2].visible = false
        }
        else if (rollCount === 3){
            dashIcons[0].visible = true
            dashIcons[1].visible = true
            dashIcons[2].visible = true
        }
    }
}

export default DashIcon ;
