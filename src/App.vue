<script setup>
import CreatePlayer from './components/CreatePlayer.js';
import CreateWaveOne from './components/CreateWaveOne.js';
import WaveOneMovements from './components/WaveOneMovements.js';
import invaderImg from "./assets/invader.png";
import Player from "./assets/player.png";

</script>

<template>  
  <canvas id="demoCanvas" width="1000" height="500"></canvas>
</template>



<script>
  var loader;
  var manifest;
  var stage; 
  var knight;

export default {
  name: 'App',

  data () {
    return {
      enemies: []
    }
  },

  methods: {
    init() {
      stage = new createjs.Stage("demoCanvas");

      manifest = [
        {src: invaderImg, id: "invader"},
        {src: Player, id: "player"},
      ];

      loader = new createjs.LoadQueue(false);
      loader.addEventListener("complete", this.handleComplete);

      loader.loadManifest(manifest, true, "./assets/");

      stage.update();
    },

    handleComplete() {
      CreatePlayer.createPlayer(loader, stage);
      this.createInvaders();
      this.paintInvaders();
      this.moveInvaders();

      createjs.Ticker.timingMode = createjs.Ticker.RAF;
      createjs.Ticker.addEventListener("tick", stage);
      createjs.Ticker.addEventListener("tick", this.tick);
      stage.update()
    },

    tick(event){
      stage.update(event)
    },

    createInvaders() {
      let spriteSheet = new createjs.SpriteSheet({
        images: [loader.getResult("invader")],
        framerate: 3,
        "frames": [
            [0, 16, 16, 16],
            [0, 0, 16, 16]
        ],

        animations: {
          "default" : { "frames": [0, 1]}
        }
      });

      CreateWaveOne.spritesWaveOne(spriteSheet, stage, this.enemies)
    },

    paintInvaders() {
      for (let i = 0; i < this.enemies.length; i++){
        stage.addChild(this.enemies[i])
      }
    },

    moveInvaders() {
      for (let i = 0; i < this.enemies.length; i++){
        WaveOneMovements.move(this.enemies[i])
      }

    },
  },

  mounted() {
    this.init()
  }


}

</script>