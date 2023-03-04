<script setup>
import CreatePlayer from './components/CreatePlayer.js';
import CreateHealthBar from './components/CreateHealthBar.js'
import CreateShield from './components/CreateShield.js'
import CreateInvaders from './components/CreateInvaders.js'

import CreateWaveOne from './components/CreateWaveOne.js';
import Beam from './components/Beam.js';
import WaveOneMovements from './components/WaveOneMovements.js';

import InvaderImg from "./assets/invader.png";
import PlayerImg from "./assets/player.png";
import BeamImg from "./assets/beam.png";
import ContactExplosionImg from "./assets/contactExplosion.png";
import HealthBarImg from "./assets/health.png"
import ShieldImg from "./assets/shield.png"

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
      shields: [],
      player1Properties: {
        invincible: false
      },
      healthBars: [],
      invadersSprites: '',
      enemies: [],
      beams: [],
      explosions: [],
    }
  },

  methods: {

    init() {
      stage = new createjs.Stage("demoCanvas");

      manifest = [
        {src: InvaderImg, id: "invader"},
        {src: PlayerImg, id: "player"},
        {src: BeamImg, id: "beam"},
        {src: ContactExplosionImg, id: "contactExplosion"},
        {src: HealthBarImg, id: "healthBar"},
        {src: ShieldImg, id: "shield"}
      ];

      loader = new createjs.LoadQueue(false);
      loader.addEventListener("complete", this.handleComplete);

      loader.loadManifest(manifest, true, "./assets/");

      stage.update();

      addEventListener('keydown', (event) => {
        this.onPress(event)
      })
    },

    handleComplete() {
      CreatePlayer.createPlayer(this.players, loader, stage);
      CreateHealthBar.createHealthBar(loader, stage, this.healthBars, this.players);
      CreateShield.createShield(this.shields, this.players[0], loader, stage)
      CreateInvaders.createInvaders(loader, stage, this.invadersSprites, this.enemies)


      this.paintInvaders();
      this.moveInvaders();

      createjs.Ticker.timingMode = createjs.Ticker.RAF;
      createjs.Ticker.addEventListener("tick", stage);
      createjs.Ticker.addEventListener("tick", this.tick);

      stage.update()
    },

    tick(event){
      Beam.detectCollision(this.beams, this.enemies, stage, loader);
      this.fallCollision();
      stage.update(event);
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

    fallCollision() {
      if (!this.player1Properties.invincible){

        for (let i = 0; i < this.enemies.length; i++){
          if (this.enemies[i].currentAnimation === "dying"){
            
            // check if between y quadrates of player and falling invader
            if (this.players[0].y <= this.enemies[i].y + 8 && this.players[0].y >= this.enemies[i].y  ){
              // check if between x quadrates of player and falling invader
              if (this.players[0].x >= this.enemies[i].x -16 && this.players[0].x <= this.enemies[i].x + 16 ){

                this.shields[0].gotoAndPlay("on");
                this.player1Properties.invincible = true

                setInterval(() => 
                {
                  this.player1Properties.invincible = false;
                  this.shields[0].gotoAndPlay("off");
                }, 1000)

                switch(this.healthBars[0].currentAnimation){
                  case "health10":
                    this.healthBars[0].gotoAndPlay("health9");
                    break;
                  case "health9":
                    this.healthBars[0].gotoAndPlay("health8");
                    break;
                  case "health8":
                    this.healthBars[0].gotoAndPlay("health7");
                    break;
                  case "health7":
                    this.healthBars[0].gotoAndPlay("health6");
                    break;
                  case "health6":
                    this.healthBars[0].gotoAndPlay("health5");
                    break;
                  case "health5":
                    this.healthBars[0].gotoAndPlay("health4");
                    break;
                  case "health4":
                    this.healthBars[0].gotoAndPlay("health3");
                    break;
                  case "health3":
                    this.healthBars[0].gotoAndPlay("health2");
                    break;
                  case "health2":
                    this.healthBars[0].gotoAndPlay("health1");
                    break;
                  case "health1":
                    // this.healthBars[0].gotoAndPlay("health1");
                    console.log('dead')
                    break;
                  default:
                    this.healthBars[0].gotoAndPlay("health10");
                }
              }
              
            }
          }
        }
      }
    },

    onPress(event) {
      if (event.code === 'ArrowUp'){
        console.log('up')
      }
      else if (event.code === 'ArrowLeft'){
        this.players[0].x -= 10
        this.healthBars[0].x -= 10
        this.shields[0].x -= 10
      }
      else if (event.code === 'ArrowRight'){
        this.players[0].x += 10
        this.healthBars[0].x += 10
        this.shields[0].x += 10
      }
      if (event.code === 'Space'){
        Beam.createBeam(this.beams, loader, this.players[0])

        for (let i = 0; i < this.beams.length; i++){
          stage.addChild(this.beams[i])
        }

        let contact = Beam.moveBeams(this.beams, this.players[0])

      }
    }
  },

  mounted() {
    this.init()
  }


}

</script>