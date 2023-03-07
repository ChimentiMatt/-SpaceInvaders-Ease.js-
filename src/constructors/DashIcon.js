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
        stage.addChild(dashIcons[1])

        icon = new createjs.Sprite(spriteSheet, "dashIcon");
        icon.x =  players[0].x + 9 ;
        icon.y = 483;
        dashIcons.push(icon)
        stage.addChild(dashIcons[2])
        
    }

    updateIcons = function(numDashes, dashIcons) {
        if (numDashes === 0){
            dashIcons[0].visible = false
            dashIcons[1].visible = false
            dashIcons[2].visible = false
        }
        else if (numDashes === 1){
            dashIcons[0].visible = true
            dashIcons[1].visible = false
            dashIcons[2].visible = false
        }
        else if (numDashes === 2){
            dashIcons[0].visible = true
            dashIcons[1].visible = true
            dashIcons[2].visible = false
        }
        else if (numDashes === 3){
            dashIcons[0].visible = true
            dashIcons[1].visible = true
            dashIcons[2].visible = true
        }
    }
}

export default DashIcon ;
