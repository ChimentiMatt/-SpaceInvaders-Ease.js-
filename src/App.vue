<script setup>

import PlayerSpriteSheet from './spriteSheets/PlayerSpriteSheet.js';
import BeamSpriteSheet from './spriteSheets/BeamSpriteSheet.js';
import ShieldSpriteSheet from './spriteSheets/ShieldSpriteSheet.js'
import HealthBarSpriteSheet from './spriteSheets/HealthBarSpriteSheet.js'
import InvaderSpriteSheet from './spriteSheets/InvaderSpriteSheet.js'

import CreateInvaders from './components/CreateInvaders.js'

import Player from './constructors/Player.js'
import Beam from './constructors/Beam.js'
import Shield from './constructors/Shield.js'
import HealthBar from './constructors/HealthBar.js'
import Invader from './constructors/Invader.js'


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
      player: '',
      shields: [],
      player1Properties: {
        invincible: false
      },
      healthBars: [],
      heathBar: '',
      invadersSprites: '',
      invaders: [],
      invader: '',
      beams: [],
      beam: '',
      shield: '',
      explosions: [],

      playerSheet: '',
      beamSheet: '',
      shieldSheet: '',
      healthBarSheet: '',
      
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
      this.createSpriteSheets()
      
      CreateInvaders.createInvaders(loader, stage, this.invadersSprites, this.invaders)

      createjs.Ticker.timingMode = createjs.Ticker.RAF;
      createjs.Ticker.addEventListener("tick", stage);
      createjs.Ticker.addEventListener("tick", this.tick);

      stage.update()
    },

    tick(event){
      this.beam.detectCollision(this.beams, this.invaders, stage, loader);
      this.fallCollision();
      
      this.beam.removeIfOffScreen(this.beams, stage)
      stage.update(event);
    },

    createSpriteSheets() {
      this.playerSheet = PlayerSpriteSheet.createSheet(this.players, loader, stage);
      this.player = new Player(this.playerSheet);
      this.player.addToArray(this.players, stage);

      this.beamSheet = BeamSpriteSheet.createSheet(loader);
      this.beam = new Beam();

      this.shieldSheet = ShieldSpriteSheet.createSheet(loader);
      this.shield = new Shield(this.shieldSheet);
      this.shield.addToArray(this.players[0], stage, this.shields);

      this.healthBarSheet = HealthBarSpriteSheet.createSheet(loader);
      this.healthBar = new HealthBar();
      this.healthBar.draw(this.players, stage, this.healthBarSheet, this.healthBars)

      this.invaderSheet = InvaderSpriteSheet.createSheet(loader);
      WaveOneMovements.createWaveOne(this.invaders, this.invaderSheet, stage)

      
    },

    fallCollision() {
      if (!this.player1Properties.invincible){

        for (let i = 0; i < this.invaders.length; i++){
          if (this.invaders[i].currentAnimation === "dying"){
            
            // check if between y quadrates of player and falling invader
            if (this.players[0].y <= this.invaders[i].y + 8 && this.players[0].y >= this.invaders[i].y  ){
              // check if between x quadrates of player and falling invader
              if (this.players[0].x >= this.invaders[i].x -16 && this.players[0].x <= this.invaders[i].x + 16 ){

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
        this.beam.draw(this.players[0], stage, this.beamSheet, this.beams)

        for (let i = 0; i < this.beams.length; i++){
          stage.addChild(this.beams[i])
        }

        let contact =  this.beam.moveBeams(this.beams, this.players[0])

      }
    }
  },

  mounted() {
    this.init()
  }


}

</script>