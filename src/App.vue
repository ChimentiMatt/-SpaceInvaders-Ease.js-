<script setup>
import CreatePlayer from './components/CreatePlayer.js';
import CreateHealthBar from './components/CreateHealthBar.js'
import CreateBeam from './components/CreateBeam.js';
import CreateWaveOne from './components/CreateWaveOne.js';
import WaveOneMovements from './components/WaveOneMovements.js';

import Invader from "./assets/invader.png";
import Player from "./assets/player.png";
import Beam from "./assets/beam.png";
import ContactExplosion from "./assets/contactExplosion.png";
import HealthBar from "./assets/health.png"

</script>

<template>  
  <div id='body'>
    <canvas id="demoCanvas" width="900" height="500"></canvas>
  </div>
</template>

<script>
  var loader;
  var manifest;
  var stage; 

export default {
  name: 'App',

  data () {
    return {
      players: [],
      healthBars: [],
      enemies: [],
      beams: [],
      explosions: [],
    }
  },

  methods: {

    init() {
      stage = new createjs.Stage("demoCanvas");

      manifest = [
        {src: Invader, id: "invader"},
        {src: Player, id: "player"},
        {src: Beam, id: "beam"},
        {src: ContactExplosion, id: "contactExplosion"},
        {src: HealthBar, id: "healthBar"},
      ];

      loader = new createjs.LoadQueue(false);
      loader.addEventListener("complete", this.handleComplete);

      loader.loadManifest(manifest, true, "./assets/");

      stage.update();
    },

    handleComplete() {
      CreatePlayer.createPlayer(this.players, loader, stage);
      CreateHealthBar.createHealthBar(loader, stage, this.healthBars);

      this.createInvaders();
      this.paintInvaders();
      this.moveInvaders();

      createjs.Ticker.timingMode = createjs.Ticker.RAF;
      createjs.Ticker.addEventListener("tick", stage);
      createjs.Ticker.addEventListener("tick", this.tick);

      stage.update()
    },

    tick(event){
      CreateBeam.detectCollision(this.beams, this.enemies, stage, loader)
      stage.update(event)
    },

    createInvaders() {
      let spriteSheet = new createjs.SpriteSheet({
        images: [loader.getResult("invader")],
        framerate: 2,
        "frames": [
            [0, 16, 16, 16],
            [0, 0, 16, 16]
        ],

        animations: {
          "default" : { "frames": [0, 1]},
          "dying" : { "frames": [0]}
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
        CreateBeam.createBeam(this.beams, loader, this.players[0])

        for (let i = 0; i < this.beams.length; i++){
          stage.addChild(this.beams[i])
        }

        let contact = CreateBeam.moveBeams(this.beams, this.players[0])

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