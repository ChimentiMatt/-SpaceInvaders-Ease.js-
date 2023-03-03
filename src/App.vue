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

export default {
  name: 'App',

  data () {
    return {
      enemies: [],
      players: []
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
      CreatePlayer.createPlayer(this.players, loader, stage);
      console.log(stage)
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

    onPress(event) {
      if (event.code === 'ArrowUp'){
        console.log('up')
      }
      else if (event.code === 'ArrowLeft'){
       this.players[0].x -= 10
      }
      else if (event.code === 'ArrowRight'){
        this.players[0].x += 10
      }
      if (event.code === 'Space'){
        console.log('space')
      }
    }
  },

  mounted() {
    this.init()

    addEventListener('keydown', (event) => {
      this.onPress(event)
    })
    
  }


}

</script>