import invaderPink from "../assets/invaderPink.png";

function createSheet() {
  let spriteSheet = new createjs.SpriteSheet({
    images: [invaderPink],
    framerate: 2,
    frames: [
      [0, 0, 16, 16],
      [16, 0, 16, 16],
      [0, 16, 16, 16],
    ],

    animations: {
      default: { frames: [0, 1] },
      dying: { frames: [2] },
      dead: { frames: [2] },
    },
  });

  return spriteSheet;
}

export default { createSheet };
