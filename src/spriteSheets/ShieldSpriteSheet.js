import shield from "../assets/shield.png";

function createSheet() {
  let spriteSheet = new createjs.SpriteSheet({
    images: [shield],
    framerate: 2,
    frames: [
      [0, 16, 16, 16],
      [0, 0, 16, 16],
    ],
    animations: {
      on: { frames: [0, 1] },
      off: { frames: [10] },
    },
  });

  return spriteSheet;
}

export default { createSheet };
