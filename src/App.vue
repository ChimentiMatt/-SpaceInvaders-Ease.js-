<script setup>
import PlayerSpriteSheet from './spriteSheets/PlayerSpriteSheet.js';
import BeamSpriteSheet from './spriteSheets/BeamSpriteSheet.js';
import ShieldSpriteSheet from './spriteSheets/ShieldSpriteSheet.js';
import HealthBarSpriteSheet from './spriteSheets/HealthBarSpriteSheet.js';
import InvaderSpriteSheet from './spriteSheets/InvaderSpriteSheet.js';
import InvaderWhiteSpriteSheet from './spriteSheets/InvaderWhiteSpriteSheet'

import EnemyBulletSheet from './spriteSheets/EnemyBulletSheet.js'
import EnemyBombSheet from './spriteSheets/EnemyBombSheet.js'
import DashIconSheet from './spriteSheets/DashIconSheet.js'
import CreateContactExplosion from './spriteSheets/CreateContactExplosion';
import CreateInvaders from './invaders/CreateInvaders.js'

import Player from './constructors/Player.js';
import Beam from './constructors/Beam.js';
import Shield from './constructors/Shield.js';
import HealthBar from './constructors/HealthBar.js';
import EnemyBullet from './constructors/EnemyBullet.js'
import Explosion from './constructors/Explosion.js'
import DashIcon from './constructors/DashIcon.js'
import Invader from './constructors/Invader.js';

import WaveOne from './invaders/WaveOne.js';
import WaveTwo from './invaders/WaveTwo.js';
import WaveThree from './invaders/WaveThree.js';
import WaveFour from './invaders/WaveFour.js';

// music from pixabay, free to use by "dopestuff"
import backgroundMusic from "./assets/sounds/neonGaming.mp3"

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
    <button @click="keyPressed(null, 'a')">L roll</button>
    <button @click="keyPressed(null, 'd')">R roll</button>
    <button @click="keyPressed(null, 'ArrowUp')" id="up">up</button>
    <button @click="keyPressed(null, 'ArrowDown')" >Down</button>
  </div>

  <div id="mobile-controls">
    <button @click="keyPressed(null, 'ArrowLeft')">left</button>
    <button @click="keyPressed(null, 'ArrowRight')">right</button>
    <button @click="keyPressed(null, 'Space')" id="shoot">shoot</button>
  </div>

</template>

<script>
  var stage; 
  var bMusic = document.createElement("audio");
  bMusic.src = backgroundMusic
  bMusic.volume = .5;
  bMusic.loop = true;

export default {
  name: 'App',
  data () {
    return {
      titleScreen: true,
      waveNumber: 1,
      totalLevels: 3, 
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
      enemyBombSheet: '',
      explosionSheet: '',
      dashIconSheet: '',
      dashIcon: '',
      score: 0,
      timer: 99,
      domHealthVisual: 10,
      domRollCount: 1,
      gameOver: false,
      postScreen: false,
      inPostScreen: false,
      startScreen: true,
      soundOn: true,

      pressedRight: 0,
      pressedLeft: 0,
      pressedUp: 0,
      pressedSpace: 0,
      pressedA: 0,
      pressedD: 0,
      mobileInput: false,

      fireDelay: false,
    }
  },

  methods: {
    init() {
      this.startScreen = false;
      stage = new createjs.Stage("demoCanvas");

      // if mobile do not allow sounds as it causes bugs currently
      if (this.detectIfMobile()){
        this.soundOn = false;
      }

      if (this.soundOn){
        bMusic.play()
      }

      this.createSpriteSheets();
      this.nextWave()
      this.reduceTime(this.timer);
      CreateInvaders.createInvaders(stage, this.invadersSprites, this.invaders)

      addEventListener('keydown', (event) => {
        this.keyPressed(event)
      })

      addEventListener('keyup', (event) => {
        this.keyUp(event)
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

      this.moveHandler()

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
      this.healthBar.addToArray(this.players, stage, this.healthBars);
      this.enemyBulletSheet = EnemyBulletSheet.createSheet();
      this.enemyBombSheet = EnemyBombSheet.createSheet();
      this.explosionSheet = CreateContactExplosion.createSheet();
      
      this.dashIconSheet = DashIconSheet.createSheet();
      this.dashIcon = new DashIcon();
      this.dashIcon.addToArray(this.players, stage, this.dashIconSheet, this.dashIcons);
      
      this.invaderSheet = InvaderSpriteSheet.createSheet();
      this.invaderWhiteSheet = InvaderWhiteSpriteSheet.createSheet();
    },

    leaveLevel() {
      if (this.nextWaveCheck(this.invaders) && !this.inPostScreen){
        this.waveNumber++
        if (this.waveNumber <= this.totalLevels){
          this.postScreen = true;
          this.inPostScreen = true;
          
        }
        else{
          // game over screen
          this.postScreen = false;
          this.gameOver = true;
        }
        this.clearLevel()
      }
    },

    clearLevel() {
        // remove from stage invaders
        for (let i = 0; i < this.invaders.length; i++){
          stage.removeChild(this.invaders[i].sprite);
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
      if (this.waveNumber === 1 ){
        WaveOne.createWave(this.invaders, this.invaderSheet, this.invaderWhiteSheet, stage)
      }
      else if (this.waveNumber === 2 ){
        WaveTwo.createWave(this.invaders, this.invaderSheet, this.invaderWhiteSheet, stage)
      }
      else if (this.waveNumber === 3)
      {
        WaveThree.createWave(this.invaders, this.invaderSheet, this.invaderWhiteSheet, stage)
      }
      else if (this.waveNumber === 4)
      {
        WaveFour.createWave(this.invaders, this.invaderSheet, this.invaderWhiteSheet, stage)
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

    enemyFire() {
      for (let i = 0; i < this.invaders.length; i++){
        this.invaders[i].fire(this.invaders, i, this.enemyBullets, this.enemyBulletSheet, this.players, stage, this.soundOn)
        this.invaders[i].fireBomb(this.invaders, i, this.enemyBullets, this.enemyBombSheet, this.players, stage, this.soundOn)
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
          this.beams[i].deathFall(this.invaders[index].sprite, stage)
          
          stage.removeChild(this.beams[i]);
          this.beams.splice(i, 1)

          // issue removing before fall logic      
          // this.invaders.splice(index, 1)

          this.explosion = new Explosion(this.explosionSheet);
          this.explosion.addToStage(stage, x, y, this.soundOn)
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
                this.healthBar.takeDamage(this.player.invincible, this.soundOn)

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
     
          if (this.invaders[i].sprite.currentAnimation !== "default"){
            
            // check if between y quadrates of player and falling invader
            if (this.player.sprite.y <= this.invaders[i].sprite.y + 16 && this.player.sprite.y >= this.invaders[i].sprite.y - 16 ){
              // check if between x quadrates of player and falling invader
              if (this.player.sprite.x >= this.invaders[i].sprite.x - 16 && this.player.sprite.x <= this.invaders[i].sprite.x + 16 ){
                this.healthBar.takeDamage(this.player.invincible, this.soundOn)

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

    keyPressed(event, mobileKey = null) {

      // if using mobile controls ignore event and make JS not break 
      if (event === null){
        event = {code: ''}
      }

      // don't allow movement during "roll" which is the invincible dash left or right
      if ( this.player.rolling === false){

        if (event.code === 'ArrowUp' || mobileKey === "ArrowUp"){
          this.pressedUp = 1;
        }
        if (event.code === 'ArrowDown' || mobileKey === "ArrowDown"){
          this.pressedDown = 1;
        }
        if (event.code === 'ArrowLeft' || mobileKey === "ArrowLeft"){  
          this.pressedLeft = 1;
        }
        if (event.code === 'ArrowRight' || mobileKey === "ArrowRight"){
          this.pressedRight = 1;
        }
        if (event.code === 'Space' || mobileKey === "Space"){
          this.pressedSpace = 1;
        }
        if (event.key === 'a' || mobileKey === "a"){
          this.pressedA = 1;
        }
        if (event.key === 'd' || mobileKey === "d"){
          this.pressedD = 1;
        }

        if (mobileKey !== null){
          this.mobileInput = true
          this.moveHandler()
          this.keyUp(event, mobileKey)
        }
        else{
          this.mobileInput = false
        }
      }
    },

    keyUp(event, mobileKey) {
      
      
      if (event.code === 'ArrowRight'  || mobileKey === "ArrowRight"){
        this.pressedRight = 0;
      }
      else if (event.code === 'ArrowLeft' || mobileKey === "ArrowLeft"){
        this.pressedLeft = 0;
      }
      else if (event.code === 'ArrowUp' || mobileKey === "ArrowUp"){
        this.pressedUp = 0;
      }
      else if (event.code === 'ArrowDown' || mobileKey === "ArrowDown"){
        this.pressedDown = 0;
      }
      else if (event.code === 'Space' || mobileKey === "Space"){
        this.pressedSpace = 0;
      }
      else if (event.key === 'a' || mobileKey === "a"){
        this.pressedA = 0;
      }
      else if (event.key === 'd' || mobileKey === "d"){
        this.pressedD = 0;
      }
    },

    moveHandler() {
      this.moveLeft();
      this.moveRight();
      this.moveUp();
      this.moveDown()
      this.dashRight();
      this.dashLeft();
      this.fire();
    },

    moveRight() {
      if (this.pressedRight === 1){
        if (this.player.sprite.x < stage.canvas.width - 32){
          let value = 5
          if (this.mobileInput) value = 35;
        
          this.player.sprite.x += value;
          this.healthBar.sprite.x += value;
          this.shield.sprite.x += value;
          this.dashIcons[0].x += value;
          this.dashIcons[1].x += value;
          this.dashIcons[2].x += value;
        }
      }
    },

    moveLeft() {
      if (this.pressedLeft === 1){
        if (this.player.sprite.x > 0){
          let value = 5
          if (this.mobileInput) value = 35;

          this.player.sprite.x -= value;
          this.healthBar.sprite.x -= value;
          this.shield.sprite.x -= value;
          this.dashIcons[0].x -= value;
          this.dashIcons[1].x -= value;
          this.dashIcons[2].x -= value;
        }
      }
    },

    moveUp() {
      if (this.pressedUp === 1){
        if (this.player.sprite.y > 350){
          let value = 5
          if (this.mobileInput) value = 35;

          this.player.sprite.y -= value;
          this.healthBar.sprite.y -= value;
          this.shield.sprite.y -= value;
          this.dashIcons[0].y -= value;
          this.dashIcons[1].y -= value;
          this.dashIcons[2].y -= value;
        }
      }
    },

    moveDown() {
      if (this.pressedDown === 1){
        if (this.player.sprite.y < stage.canvas.height - 50){
          let value = 5
          if (this.mobileInput) value = 35;

          this.player.sprite.y += value;
          this.healthBar.sprite.y += value;
          this.shield.sprite.y += value;
          this.dashIcons[0].y += value;
          this.dashIcons[1].y += value;
          this.dashIcons[2].y += value;
        }
      }
    },

    dashRight() {
      if (this.pressedD === 1){
        if (this.player.sprite.x < stage.canvas.width - 16 - 100){

           // stops spending both rolls at once
          if (!this.player.rolling){
            this.player.roll("right", this.healthBars, this.shields, this.dashIcons,  this.soundOn);
          }
        }
      }
    },

    dashLeft() {
      if (this.pressedA === 1){
        if (this.player.sprite.x > 100){

          // stops spending both rolls at once
          if (!this.player.rolling){
            this.player.roll("left", this.healthBars, this.shields, this.dashIcons, this.soundOn);
          }
        }
      }
    },

    fire() {
      if (this.pressedSpace === 1){
        if (!this.fireDelay){
          this.fireDelay = true;
          this.beam = new Beam(this.beamSheet);
          this.beam.addToArray(this.player.sprite, stage, this.beamSheet)
          this.beams.push(this.beam)
          stage.addChild(this.beam.sprite)
  
          this.beam.moveBeams(this.player.sprite, this.soundOn)

          setTimeout(() => { this.fireDelay = false}, this.player.attackSpeed)
        }
      }
    },


    
    clearInvaders() {
      this.invaders = []
    },

    nextWaveCheck() {
      for (let i = 0; i < this.invaders.length; i++){
        if (this.invaders[i].sprite.currentAnimation !== "dead"){
            return false;
        }
      }

      this.clearInvaders()

      return true;
    },
    
    reduceTime(){
      setInterval(() => {
        this.timer--
      }, 1000)
    },

    detectIfMobile(){
      let details = navigator.userAgent;
      
      /* Creating a regular expression 
      containing some mobile devices keywords 
      to search it in details string*/
      let regexp = /android|iphone|kindle|ipad/i;
        
      /* Using test() method to search regexp in details
      it returns boolean value*/
      let isMobileDevice = regexp.test(details);
        
      if (isMobileDevice) {
          return true;
      } else {
          return false;
      }
    },

    resetGame() {
     window.location.reload();
    }

  },
    
  mounted() {            
  }
}

</script>