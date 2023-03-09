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
import EnemyBullet from './constructors/EnemyBullet.js'
import Explosion from './constructors/Explosion.js'
import DashIcon from './constructors/DashIcon.js'
import Invader from './constructors/Invader.js';

import WaveOne from './components/WaveOne.js';
import WaveTwo from './components/WaveTwo.js';
import WaveThree from './components/WaveThree.js';

import backgroundMusic from "./assets/sounds/neonGaming.mp3"
// music from pixabay, free to use by "dopestuff"

</script>
<template>  
  <div id='body'>
    <div v-if="startScreen || gameOver" id="intro-outro-screen">
      <h1 v-if="!gameOver">Invaders</h1>
      <p v-if="gameOver">Score: {{score}}</p>
      <button v-if="!gameOver" @click="init">Start</button>
      <button v-if="gameOver" @click="resetGame">Play again?</button>
    </div>

    <div v-if="postScreen" id="post-stage-screen">
      <p>Upgrade Dash</p>
      <p v-if="domRollCount < 3">current {{ domRollCount }} max 3</p>
      <button  @click="viewPostScreen('dash')">Dash</button>

      <br/>
      <p>Heal 2 Damage </p>
      <p>{{domHealthVisual}} / 10</p>
      <button  @click="viewPostScreen('heal')">heal</button>
    </div>
      
    <canvas id="demoCanvas" width="900" height="500"></canvas>
    <div id="hud">
      <p>score: {{ score }}</p>
      <p>time: {{ timer }}</p>
    </div>
    
  </div>

  <div id="temp-controls">
    <p>Arrows to move </p> 
    <p>Space bar to shoot</p> 
    <p>a and d to roll</p> 
  </div>

  <!-- temporary until I make a high quality version -->
  <div id="mobile-controls">
    <button @click="onPress(null, 'a')">l roll</button>
    <button @click="onPress(null, 'd')">r roll</button>
    <button @click="onPress(null, 'ArrowUp')" id="up">up</button>
  </div>

  <div id="mobile-controls">
    <button @click="onPress(null, 'ArrowLeft')">left</button>
    <button @click="onPress(null, 'ArrowRight')">right</button>
    <button @click="onPress(null, 'Space')" id="shoot">shoot</button>
  </div>

</template>

<script>
  var stage; 
  // var bMusic = document.createElement("audio");
  // bMusic.src = backgroundMusic
  // bMusic.volume = .5;
  // bMusic.loop = true;

export default {
  name: 'App',
  data () {
    return {
      titleScreen: true,
      players: [],
      shields: [],
      beams: [],
      enemyBullets: [],
      healthBars: [],
      invaders: [],
      explosions: [],
      dashIcons: [],
      player: '',
      heathBar: '',
      invadersSprites: '',
      invader: '',
      beam: '',
      shield: '',
      explosion: '',
      enemyBullet: '',
      playerSheet: '',
      beamSheet: '',
      shieldSheet: '',
      healthBarSheet: '',
      enemyBulletSheet: '',
      explosionSheet: '',
      dashIconSheet: '',
      dashIcon: '',
      waveNumber: 1,
      score: 0,
      timer: 99,
      domHealthVisual: 10,
      domRollCount: 1,
      gameOver: false,
      postScreen: false,
      inPostScreen: false,
      startScreen: true,
    }
  },

  methods: {

    resetGame() {
     window.location.reload();
    },

    init() {
      //Fixes audio delay in Safari 
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioContext();

      this.startScreen = false;
      stage = new createjs.Stage("demoCanvas");
      // bMusic.play()

      this.createSpriteSheets()
      this.reduceTime(this.timer)
      CreateInvaders.createInvaders(stage, this.invadersSprites, this.invaders)

      addEventListener('keydown', (event) => {
        this.onPress(event)
      })

      createjs.Ticker.timingMode = createjs.Ticker.RAF;
      createjs.Ticker.addEventListener("tick", stage);
      createjs.Ticker.addEventListener("tick", this.tick);

      stage.update()
    },

    tick(event){
      document.querySelector('#demoCanvas').style.opacity = 1

      this.playerBulletCollisionDetection()
      this.beamsCollisionDetection();

      this.fallCollision();
      this.leaveLevel();
      this.removeOldPlayerBullets();
      this.removeOldInvaderBullets();
      this.enemyFire();
    
      this.dashIcon.updateIcons(this.player.rollCount, this.dashIcons)
      this.gameOverCheck()

      stage.update(event);
    },

    createSpriteSheets() {
      this.playerSheet = PlayerSpriteSheet.createSheet(this.players, stage);
      this.player = new Player(this.playerSheet);
      this.player.addToArray(this.players, stage);
      this.beamSheet = BeamSpriteSheet.createSheet();
      this.shieldSheet = ShieldSpriteSheet.createSheet();
      this.shield = new Shield(this.shieldSheet);
      this.shield.addToArray(this.player.sprite, stage, this.shields);
      this.shields[0].visible = false;
      this.healthBarSheet = HealthBarSpriteSheet.createSheet();
      this.healthBar = new HealthBar(this.healthBarSheet);
      this.healthBar.addToArray(this.players, stage, this.healthBars)
      this.enemyBulletSheet = EnemyBulletSheet.createSheet();
      this.explosionSheet = CreateContactExplosion.createSheet();
      
      this.dashIconSheet = DashIconSheet.createSheet();
      this.dashIcon = new DashIcon();
      this.dashIcon.addToArray(this.players, stage, this.dashIconSheet, this.dashIcons)
      
      this.invaderSheet = InvaderSpriteSheet.createSheet();
      WaveOne.createWave(this.invaders, this.invaderSheet, stage)
    },

    leaveLevel() {
      if (this.nextWaveCheck(this.invaders) && !this.inPostScreen){
        this.waveNumber++
        if (this.waveNumber < 4){
          this.postScreen = true
          this.inPostScreen = true
          
        }
        else{
          // game over screen
          this.postScreen = false
          this.gameOver = true
        }
        this.clearLevel()
      }
    },

    clearLevel() {
        // remove from stage invaders
        for (let i = 0; i < this.invaders.length; i++){
          stage.removeChild(this.invaders[i]);
        }
        
        // remove from array invaders
        this.invaders = []
        this.enemyBullets = []
    },

    viewPostScreen(choice) {
      this.inPostScreen = false
      this.postScreen = false
      
      if (choice === "dash"){
        this.player.rollCount++;
        this.domRollCount++;
      }
      else if (choice === "heal"){
        if (this.healthBar.healthPoints === 9){
          this.domHealthVisual++
          this.healthBar.heal()
        }
        else if (this.healthBar.healthPoints < 9){
          this.domHealthVisual += 2
          this.healthBar.heal()
          this.healthBar.heal()
        }
      }
        
      this.postWaveUpdateScore();
      this.updateTimerForNewWave();
      this.nextWave();
    },

    postWaveUpdateScore() {
      this.score += this.timer
    },

    updateTimerForNewWave() {
      this.timer = 99
    },

    nextWave() {
      if (this.waveNumber === 2 ){
        WaveTwo.createWave(this.invaders, this.invaderSheet, stage)
      }
      else if (this.waveNumber === 3)
      {
        WaveThree.createWave(this.invaders, this.invaderSheet, stage)
      }
    },

    enemyFire () {
      // make a bullet at random intervals 
      let number = Math.floor(Math.random() * (100 + 0) + 0)
  
      if (number > 85){
        this.enemyBullet = new EnemyBullet(this.enemyBulletSheet)
        this.enemyBullets.push(this.enemyBullet)
        this.enemyBullet.addToStage(stage, this.invaders)

        this.enemyBullet.direction(this.players, stage);
      }
     
    },

    removeOldPlayerBullets () {
      let isOffScreen = false;
      const stillInScreen = []
      const removeIndex = []
      
      // removes sprites that are no longer on canvas for beams
      if (this.beams.length > 0){
    
        for (let i = 0; i < this.beams.length; i++){
          isOffScreen = this.beams[i].removeIfOffScreen()

          if (!isOffScreen){
            stillInScreen.push(this.beams[i]);
          }
          else {
            removeIndex.push(this.beams[i])
            this.score--
          }
          isOffScreen = false;
        }

        // remove from stage
        for (let i = 0; i < removeIndex.length; i++){
          stage.removeChild(removeIndex[i]);
          this.beams = stillInScreen;
        }
      }
    },

    removeOldInvaderBullets () {
      if (this.enemyBullets.length > 0){
        let isAtEnd = false;
        const stillInScreen = []
        const removeIndex = []
        // removes sprites that are no longer on canvas for beams
        if (this.enemyBullets.length > 0){
      
          for (let i = 0; i < this.enemyBullets.length; i++){
            isAtEnd = this.enemyBullets[i].removeIfAtEnd()

            if (!isAtEnd){
              stillInScreen.push(this.enemyBullets[i]);
            }
            else {
              removeIndex.push(this.enemyBullets[i])
            }
            isAtEnd = false;
          }

          // remove from stage
          for (let i = 0; i < removeIndex.length; i++){
            stage.removeChild(removeIndex[i]);  
            this.enemyBullets = stillInScreen;
          }
        }
      }
      
    },
    
    beamsCollisionDetection() {
      let x, y;
      let results, index;
      for(let i = 0; i < this.beams.length; i++){
        x = this.beams[i].sprite.x
        y = this.beams[i].sprite.y
        results = this.beams[i].detectCollision(this.beams, this.invaders);
      
        if (results.collision){

          index = results.index
          this.beams[i].deathFall(this.invaders[index], stage)
          
          stage.removeChild(this.beams[i]);
          this.beams.splice(i, 1)

          // issue removing before fall logic      
          // this.invaders.splice(index, 1)

          this.explosion = new Explosion(this.explosionSheet);
          this.explosion.addToStage(stage, x, y)
        }
      }
    },

    playerBulletCollisionDetection() {
      if (!this.player.invincible){

        for (let i = 0; i < this.enemyBullets.length; i++){
          if (this.enemyBullets.length > 0){

            // if between player y: top and bottom: top && bottom
            if (this.enemyBullets[i].sprite.y >= this.player.sprite.y - 0 && this.enemyBullets[i].sprite.y <= this.player.sprite.y + 16){

              // if between player x: left and right
              if (this.enemyBullets[i].sprite.x >= this.player.sprite.x - 10 && this.enemyBullets[i].sprite.x <= this.player.sprite.x + 10){
                this.healthBar.takeDamage(this.player.invincible)

                // dom state variable needs to be out of external component
                if (!this.player.invincible){
                  this.domHealthVisual--
                }
                this.invinciblePlayer()
                return;
              }
            }
          }
        }
      }
    },

    fallCollision() {
      if (!this.player.sprite.invincible){
        
        for (let i = 0; i < this.invaders.length; i++){
     
          if (this.invaders[i].currentAnimation !== "default"){
            
            // check if between y quadrates of player and falling invader
            if (this.player.sprite.y <= this.invaders[i].y + 16 && this.player.sprite.y >= this.invaders[i].y - 16 ){
              // check if between x quadrates of player and falling invader
              if (this.player.sprite.x >= this.invaders[i].x - 16 && this.player.sprite.x <= this.invaders[i].x + 16 ){
                this.healthBar.takeDamage(this.player.invincible)

                // dom state variable needs to be out of external component
                if (!this.player.invincible){
                  this.domHealthVisual--
                }
                this.invinciblePlayer();
              }
            }
          }
        }
      }
    },
  
    invinciblePlayer() {
      if (!this.player.rolling && !this.player.invincible){
        this.shield.sprite.visible = true
        this.player.invincible = true

        setTimeout(() => {
          this.player.invincible = false;
          this.shield.sprite.visible = false
        }, 2000)
      }
    },

    gameOverCheck() {
      if (this.healthBar.healthPoints < 1){
        this.gameOver = true;
      }
    },

    onPress(event, mobileKey = null) {

      // if using mobile controls ignore event and make it not break 
      if (event === null){event = {code: ''}}

      // don't allow movement during "roll" which is the invincible dash left or right
      if ( this.player.rolling === false){

        if (event.code === 'ArrowUp' || mobileKey === "ArrowUp"){
          // for debugging
          // this.clearInvaders();
          // WaveTwo.createWave(this.invaders, this.invaderSheet, stage);
 
          if (this.player.sprite.y > 350){
            this.player.sprite.y -= 10
            this.healthBar.sprite.y -= 10
            this.shield.sprite.y -= 10
            this.dashIcons[0].y -= 10
            this.dashIcons[1].y -= 10
            this.dashIcons[2].y -= 10
          }
        }
        else if (event.code === 'ArrowDown' || mobileKey === "ArrowDown"){
          if (this.player.sprite.y < stage.canvas.height - 50){
            this.player.sprite.y += 10
            this.healthBar.sprite.y += 10
            this.shield.sprite.y += 10
            this.dashIcons[0].y += 10
            this.dashIcons[1].y += 10
            this.dashIcons[2].y += 10
          }
        }
        else if (event.code === 'ArrowLeft' || mobileKey === "ArrowLeft"){
          if (this.player.sprite.x > 0){
            this.player.sprite.x -= 20
            this.healthBar.sprite.x -= 20
            this.shield.sprite.x -= 20
            this.dashIcons[0].x -= 20
            this.dashIcons[1].x -= 20
            this.dashIcons[2].x -= 20
          }
        }
        else if (event.code === 'ArrowRight' || mobileKey === "ArrowRight"){
          if (this.player.sprite.x < stage.canvas.width - 32){
            this.player.sprite.x += 20
            this.healthBar.sprite.x += 20
            this.shield.sprite.x += 20
            this.dashIcons[0].x += 20
            this.dashIcons[1].x += 20
            this.dashIcons[2].x += 20
          }
        }

        if (event.code === 'Space' || mobileKey === "Space"){
          this.beam = new Beam(this.beamSheet);
          this.beam.addToArray(this.player.sprite, stage, this.beamSheet)
          this.beams.push(this.beam)
          stage.addChild(this.beam.sprite)

          this.beam.moveBeams(this.player.sprite)
        }
        if (event.key === 'a' || mobileKey === "a"){
          if (this.player.sprite.x > 100){
            this.player.roll("left", this.healthBars, this.shields, this.dashIcons);
          }
        }
        if (event.key === 'd' || mobileKey === "d"){
          if (this.player.sprite.x < stage.canvas.width - 16 - 100){
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

      this.clearInvaders()

      return true;
    },


    
    reduceTime (){
      setInterval(() => {
        this.timer--
      }, 1000)
    },
  },
    
  mounted() {
                  
  }


}

</script>