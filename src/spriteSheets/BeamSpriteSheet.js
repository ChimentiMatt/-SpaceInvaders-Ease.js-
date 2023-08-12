import beamImg from "../assets/beam.png";

function createSheet() {
  let spriteSheet = new createjs.SpriteSheet({
    images: [beamImg],
    framerate: 2,
    frames: [
      [0, 0, 16, 16],
      [0, 16, 16, 16],
      [16, 0, 16, 16],
    ],
    animations: {
      default: { frames: [0, 1, 2] },
      contact: { frames: [0] },
    },
  });

  return spriteSheet;
}

export default { createSheet };
