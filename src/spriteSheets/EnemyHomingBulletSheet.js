import EnemyHomingBullet from "../assets/EnemyHomingBullet.png";

function createSheet() {
  let spriteSheet = new createjs.SpriteSheet({
    images: [EnemyHomingBullet],
    framerate: 3,
    frames: [[0, 0, 16, 16]],
    animations: {
      default: { frames: [0] },
    },
  });

  return spriteSheet;
}

export default { createSheet };
