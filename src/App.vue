<script setup>

import PlayerSpriteSheet from './spriteSheets/PlayerSpriteSheet.js';
import BeamSpriteSheet from './spriteSheets/BeamSpriteSheet.js';
import ShieldSpriteSheet from './spriteSheets/ShieldSpriteSheet.js';
import HealthBarSpriteSheet from './spriteSheets/HealthBarSpriteSheet.js';
import InvaderSpriteSheet from './spriteSheets/InvaderSpriteSheet.js';
import EnemyBulletSheet from './spriteSheets/EnemyBulletSheet.js'
import DashIconSheet from './spriteSheets/DashIconSheet.js'
import CreateContactExplosion from './spriteSheets/CreateContactExplosion';

import CreateInvaders from './components/CreateInvaders.js'

import Player from './constructors/Player.js';
import Beam from './constructors/Beam.js';
import Shield from './constructors/Shield.js';
import HealthBar from './constructors/HealthBar.js';
import Invader from './constructors/Invader.js';
import EnemyBullet from './constructors/EnemyBullet.js'
import Explosion from './constructors/Explosion.js'
import DashIcon from './constructors/DashIcon.js'

import WaveOne from './components/WaveOne.js';
import WaveTwo from './components/WaveTwo.js';
import WaveThree from './components/WaveThree.js';

import InvaderImg from "./assets/invader.png";
import PlayerImg from "./assets/player.png";
import BeamImg from "./assets/beam.png";
import HealthBarImg from "./assets/health.png";
import ShieldImg from "./assets/shield.png";
import EnemyBulletImg from "./assets/enemyBullet.png"
import ContactExplosionImg from "./assets/contactExplosion.png";
import DashIconImg from "./assets/dashIcon.png"


import EnemyBulletTestImg from "./assets/enemyBulletTest.png"
</script>

<template>  
  <div id='body'>
    <div id="intro-outro-screen">
      <h1 v-if="!gameOver">Invaders</h1>
      <p v-if="gameOver">Score: {{score}}</p>
      <button v-if="!gameOver" @click="init">Start</button>
      <button v-if="gameOver" @click="resetGame">Play again?</button>
    </div>
      
    <canvas id="demoCanvas" width="900" height="500"></canvas>
    <div id="hud">
      <p>score: {{ score }}</p>
      <p>time: {{ timer }}</p>
    </div>
  </div>

</template>

<script>
  var loader;
  var manifest;
  var stage; 
  var beams = [];
  var enemyBullets = [];
  var players = [];

export default {
  name: 'App',
  data () {
    return {
      titleScreen: true,
      player: '',
      shields: [],
      healthBars: [],
      heathBar: '',
      invadersSprites: '',
      invaders: [],
      invader: '',
      beam: '',
      shield: '',
      explosions: [],
      explosion: '',
      enemyBullet: '',
      playerSheet: '',
      beamSheet: '',
      shieldSheet: '',
      healthBarSheet: '',
      enemyBulletSheet: '',
      explosionSheet: '',
      dashIconSheet: '',
      dashIcons: [],
      dashIcon: '',
      waveNumber: 1,
      gameOver: false,
      score: 0,
      timer: 99
      
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
        {src: ShieldImg, id: "shield"},
        {src: EnemyBulletImg, id: "enemyBullet"},
        {src: DashIconImg, id: "dashIcon"},
        {src: EnemyBulletTestImg, id: "enemyBulletTest"},
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
      this.reduceTime(this.timer)
      
      CreateInvaders.createInvaders(loader, stage, this.invadersSprites, this.invaders)

      createjs.Ticker.timingMode = createjs.Ticker.RAF;
      createjs.Ticker.addEventListener("tick", stage);
      createjs.Ticker.addEventListener("tick", this.tick);

      stage.update()
    },

    tick(event){
      document.querySelector('#demoCanvas').style.opacity = 1
      document.querySelector('#intro-outro-screen').style.display = 'none'
 

      this.playerBulletCollisionDetection()
      this.beamsCollisionDetection();

      this.fallCollision();
      this.changeWave();
      this.removeOldPlayerBullets();
      this.removeOldInvaderBullets();
      this.enemyFire();
      this.dashIcon.updateIcons(this.player.rollCount, this.dashIcons)
      this.gameOverCheck()

      stage.update(event);
    
    },

    createSpriteSheets() {
      this.playerSheet = PlayerSpriteSheet.createSheet(players, loader, stage);
      this.player = new Player(this.playerSheet);
      this.player.addToArray(players, stage);
      this.beamSheet = BeamSpriteSheet.createSheet(loader);
      this.shieldSheet = ShieldSpriteSheet.createSheet(loader);
      this.shield = new Shield(this.shieldSheet);
      this.shield.addToArray(players[0], stage, this.shields);
      this.shields[0].visible = false;
      this.healthBarSheet = HealthBarSpriteSheet.createSheet(loader);
      this.healthBar = new HealthBar();
      this.healthBar.addToArray(players, stage, this.healthBarSheet, this.healthBars)
      this.enemyBulletSheet = EnemyBulletSheet.createSheet(loader);
      this.explosionSheet = CreateContactExplosion.createSheet(loader);
      
      this.dashIconSheet = DashIconSheet.createSheet(loader);
      this.dashIcon = new DashIcon();
      this.dashIcon.addToArray(players, stage, this.dashIconSheet, this.dashIcons)
      
      this.invaderSheet = InvaderSpriteSheet.createSheet(loader);
      WaveOne.createWave(this.invaders, this.invaderSheet, stage)


    },

    changeWave() {
      if (this.nextWaveCheck(this.invaders)){
        
        // remove from stage invaders
        for (let i = 0; i < this.invaders.length; i++){
          stage.removeChild(this.invaders[i]);
        }
        
        // remove from array invaders
        this.invaders = []
        enemyBullets = []
        this.waveNumber++
        this.postWaveUpdateScore()
        this.updateTimerForNewWave()

        if (this.waveNumber === 2 ){
          WaveTwo.createWave(this.invaders, this.invaderSheet, stage)
        }
        else if (this.waveNumber === 3)
        {
          WaveThree.createWave(this.invaders, this.invaderSheet, stage)
        }
      }
    },

    postWaveUpdateScore() {
      this.score += this.timer
    },

    updateTimerForNewWave() {
      this.timer = 99
    },

    enemyFire () {
      // make a bullet at random intervals 
      let number = Math.floor(Math.random() * (100 + 0) + 0)
  
      if (number > 85){
        this.enemyBullet = new EnemyBullet(this.enemyBulletSheet)
        enemyBullets.push(this.enemyBullet)
        this.enemyBullet.addToStage(stage, this.invaders)

        this.enemyBullet.direction(players, this.enemyBullets, this.invaders, stage);
      }
     
    },

    removeOldPlayerBullets () {
      let isOffScreen = false;
      const stillInScreen = []
      const removeIndex = []
      
      // removes sprites that are no longer on canvas for beams
      if (beams.length > 0){
    
        for (let i = 0; i < beams.length; i++){
          isOffScreen = beams[i].removeIfOffScreen()

          if (!isOffScreen){
            stillInScreen.push(beams[i]);
          }
          else {
            removeIndex.push(beams[i])
            this.score--
          }
          isOffScreen = false;
        }

        // remove from stage
        for (let i = 0; i < removeIndex.length; i++){
          stage.removeChild(removeIndex[i]);
          beams = stillInScreen;
        }
      }
    },

    removeOldInvaderBullets () {
      if (enemyBullets.length > 0){
        let isAtEnd = false;
        const stillInScreen = []
        const removeIndex = []
        // removes sprites that are no longer on canvas for beams
        if (enemyBullets.length > 0){
      
          for (let i = 0; i < enemyBullets.length; i++){
            isAtEnd = enemyBullets[i].removeIfAtEnd()

            if (!isAtEnd){
              stillInScreen.push(enemyBullets[i]);
            }
            else {
              removeIndex.push(enemyBullets[i])
            }
            isAtEnd = false;
          }

          // remove from stage
          for (let i = 0; i < removeIndex.length; i++){
            stage.removeChild(removeIndex[i]);  
            enemyBullets = stillInScreen;
          }
        }
      }
      
    },
    
    beamsCollisionDetection() {
      let x, y;
      let results, index;
      for(let i = 0; i < beams.length; i++){
        x = beams[i].beam.x
        y = beams[i].beam.y
        results = beams[i].detectCollision(beams, this.invaders, stage, loader);
      
        if (results.collision){
          index = results.index
          beams[i].deathFall(this.invaders[index], stage)
          
          stage.removeChild(beams[i]);
          beams.splice(i, 1)

          // issue removing before fall logic      
          // this.invaders.splice(index, 1)

          this.explosion = new Explosion();
          this.explosion.addToArray(players, stage, this.explosionSheet,  this.explosions, x, y)
        }
      }
    },

    playerBulletCollisionDetection() {
      if (!players[0].invincible){

        for (let i = 0; i < enemyBullets.length; i++){
          if (enemyBullets.length > 0){

            // if between player y: top and bottom: top && bottom
            if (enemyBullets[i].bullet.y >= players[0].y - 0 && enemyBullets[i].bullet.y <= players[0].y + 16){

              // if between player x: left and right
              if (enemyBullets[i].bullet.x >= players[0].x - 10 && enemyBullets[i].bullet.x <= players[0].x + 10){
                this.takeDamage()
                this.invinciblePlayer()
                return
              }
            }
          }
        }
      }
    },

    fallCollision() {
      if (!players[0].invincible){
        
        for (let i = 0; i < this.invaders.length; i++){
     
          if (this.invaders[i].currentAnimation !== "default"){
            
            // check if between y quadrates of player and falling invader
            if (players[0].y <= this.invaders[i].y + 16 && players[0].y >= this.invaders[i].y - 16 ){
              // check if between x quadrates of player and falling invader
              if (players[0].x >= this.invaders[i].x - 16 && players[0].x <= this.invaders[i].x + 16 ){
                console.log('fall hit')
                this.takeDamage()
                this.invinciblePlayer();
              }
              
            }
          }
        }
      }
    },

    takeDamage() {
      if (!this.player.invincible){
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
            this.healthBars[0].gotoAndPlay("dead");
            // console.log('dead')
            break;
          default:
            // this.healthBars[0].gotoAndPlay("health10");
        }
      }
    },

    invinciblePlayer() {
      // console.log(this.player.invincible)
      if (!this.player.rolling && !this.player.invincible){
        this.shields[0].visible = true
        players[0].invincible = true

        setTimeout(() => {
          players[0].invincible = false;
          this.shields[0].visible = false
        }, 2000)
      }
    },

    gameOverCheck() {
      if (this.healthBars[0].currentAnimation === "dead"){
        document.querySelector('#intro-outro-screen').style.display = 'flex'
        this.gameOver = true;
      }
    },

    resetGame() {
      console.log('reset logic here :)')
    },

    onPress(event) {
      // don't allow movement during "roll" which is the invincible dash left or right
      if ( this.player.rolling === false){

        if (event.code === 'ArrowUp'){
          // for debugging
          // this.clearInvaders();
          // WaveTwo.createWave(this.invaders, this.invaderSheet, stage);
 
          if (players[0].y > 350){
            players[0].y -= 10
            this.healthBars[0].y -= 10
            this.shields[0].y -= 10
            this.dashIcons[0].y -= 10
            this.dashIcons[1].y -= 10
            this.dashIcons[2].y -= 10
          }
        }
        else if (event.code === 'ArrowDown'){
          if (players[0].y < stage.canvas.height - 50){
            players[0].y += 10
            this.healthBars[0].y += 10
            this.shields[0].y += 10
            this.dashIcons[0].y += 10
            this.dashIcons[1].y += 10
            this.dashIcons[2].y += 10
          }
        }
        else if (event.code === 'ArrowLeft'){
          if (players[0].x > 0){
            players[0].x -= 20
            this.healthBars[0].x -= 20
            this.shields[0].x -= 20
            this.dashIcons[0].x -= 20
            this.dashIcons[1].x -= 20
            this.dashIcons[2].x -= 20
          }
        }
        else if (event.code === 'ArrowRight'){
          if (players[0].x < stage.canvas.width - 32){
            players[0].x += 20
            this.healthBars[0].x += 20
            this.shields[0].x += 20
            this.dashIcons[0].x += 20
            this.dashIcons[1].x += 20
            this.dashIcons[2].x += 20
          }
        }

        if (event.code === 'Space'){
          this.beam = new Beam(this.beamSheet);
          this.beam.addToArray(players[0], stage, this.beamSheet)
          beams.push(this.beam)

          stage.addChild(this.beam.beam)

          this.beam.moveBeams(players[0])
        }
        if (event.key === 'a'){
          
          if (players[0].x > 100){
            this.player.roll("left", this.healthBars, this.shields, this.dashIcons);
          }
        }
        if (event.key === 'd'){
          if (players[0].x < stage.canvas.width - 16 - 100){
            this.player.roll("right", this.healthBars, this.shields, this.dashIcons);
          }
        }
      }
    },
    
    clearInvaders() {
      this.invaders = []
    },

    nextWaveCheck () {
      for (let i = 0; i < this.invaders.length; i++){
        if (this.invaders[i].currentAnimation !== "dead"){
            return false;
        }
      }

      this.invaders = []

      return true;
    },
    
    reduceTime (){
      setInterval(() => {
        this.timer--
      }, 1000)
    },
  },
    
  mounted() {
    // this.init()
  }


}

</script>