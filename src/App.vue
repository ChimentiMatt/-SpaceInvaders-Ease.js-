<script setup>
import PlayerSpriteSheet from './spriteSheets/PlayerSpriteSheet.js';
import BeamSpriteSheet from './spriteSheets/BeamSpriteSheet.js';
import ShieldSpriteSheet from './spriteSheets/ShieldSpriteSheet.js';
import HealthBarSpriteSheet from './spriteSheets/HealthBarSpriteSheet.js';
import InvaderSpriteSheet from './spriteSheets/InvaderSpriteSheet.js';
import InvaderWhiteSpriteSheet from './spriteSheets/InvaderWhiteSpriteSheet';
import InvaderPinkSpriteSheet from './spriteSheets/InvaderPinkSpriteSheet';
import InvaderBlobSpriteSheet from './spriteSheets/InvaderBlobSpriteSheet';
import EnemyBulletSheet from './spriteSheets/EnemyBulletSheet.js';
import EnemyBombSheet from './spriteSheets/EnemyBombSheet.js';
import EnemyHomingBulletSheet from './spriteSheets/EnemyHomingBulletSheet.js'

import DashIconSheet from './spriteSheets/DashIconSheet.js';
import CreateContactExplosion from './spriteSheets/CreateContactExplosion';
import CreateInvaders from './spriteSheets/CreateInvaders.js';
import Player from './constructors/Player.js';
import Beam from './constructors/Beam.js';
import Shield from './constructors/Shield.js';
import HealthBar from './constructors/HealthBar.js';
import Explosion from './constructors/Explosion.js'
import DashIcon from './constructors/DashIcon.js'
import InvaderParent from './constructors/Invader.js';

import WaveOne from './waves/WaveOne.js';
import WaveTwo from './waves/WaveTwo.js';
import WaveThree from './waves/WaveThree.js';
import WaveFour from './waves/WaveFour.js';
import WaveFive from './waves/WaveFive.js';
import WaveSix from './waves/WaveSix.js';
import WaveSeven from './waves/WaveSeven.js';
import WaveEight from './waves/WaveEight.js';
import WaveNine from './waves/WaveNine.js';

// music from pixabay, free to use by "dopestuff"
import backgroundMusic from "./assets/sounds/neonGaming.mp3"

</script>
<template>
  <div id='body'>
    <a href="https://matterofcode.xyz/" target="_blank">
      <img id="github" src="./assets/github.jpg">
    </a>

    <div id="home-screen" v-if="homeScreen">
      <h1>Game Collection</h1>
      <div id="home-cards-container">

        <div class="home-card" @click="() => chooseGame('invaders')">
          <h1>Invaders</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum voluptatibus quis dolorem aspernatur
            reiciendis, aut voluptate. Debitis exercitationem fugiat optio laboriosam, dolorem animi obcaecati laborum,
            vel quasi ex sint labore!</p>
        </div>

        <div class="home-card" @click="() => chooseGame('goblin')">
          <h1>Goblin Invasion</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum voluptatibus quis dolorem aspernatur
            reiciendis, aut voluptate. Debitis exercitationem fugiat optio laboriosam, dolorem animi obcaecati laborum,
            vel quasi ex sint labore!</p>
        </div>
      </div>
    </div>
    <div id="invaders">
      <div v-if="postScreen" id="post-stage-screen">
        <h1>Score: {{ score }}</h1>

        <p>Time Remaining: + {{ timer }} x 2</p>
        <p>Missed Hit: - {{ missedShots }} x 1</p>
        <p>Invaders Killed: + {{ invadersKilled }} x 10 </p>

        <p id="separator">----------------------</p>

        <p v-if="domRollCount < 3">Upgrade Max Dash</p>
        <p v-if="domRollCount < 3">{{ domRollCount }} / 3 <button @click="postScreenSelection('dash')">+</button></p>

        <p v-if="domAttackSpeed < 4">Increase Attack Speed</p>
        <p v-if="domAttackSpeed < 4">{{ domAttackSpeed }} / 4 <button @click="postScreenSelection('attack')">+</button>
        </p>

        <p v-if="domMoveSpeed < 4">Increase Move Speed</p>
        <p v-if="domMoveSpeed < 4">{{ domMoveSpeed }} / 4 <button @click="postScreenSelection('move')">+</button></p>

        <p>Heal 2 </p>
        <p>{{ domHealthVisual }} / 10 <button @click="postScreenSelection('heal')">+</button></p>
      </div>

      <div id="cabinet-square">
        <div v-if="gameOver" id="intro-outro-screen">
          <p v-if="gameOver">Score: {{ score }}</p>
          <button v-if="gameOver" @click="resetGame">play again?</button>
        </div>
        <div id="hud">
          <div id="hud-inner">
            <p>level: {{ waveNumber }}</p>
            <p id="score">score: {{ score }}</p>
            <p id="time">time: {{ timer }}</p>
          </div>
        </div>
        <canvas id="gameCanvas" width="900" height="500"></canvas>
      </div>

      <div id="mobile-controls">
        <div>
          <p>Roll</p>
          <button class="left-btns" @click="keyPressed(null, 'a')">Left</button>
          <button class="right-btns" @click="keyPressed(null, 'd')">Right</button>
        </div>
        <div>
          <p id="move-text">Move</p>
          <button class="left-btns" @click="keyPressed(null, 'ArrowUp')" id="up">Up</button>
          <button class="right-btns" @click="keyPressed(null, 'ArrowDown')">Down</button>
        </div>
      </div>

      <div id="mobile-controls">
        <div>
          <p>Move</p>
          <button class="left-btns" @click="keyPressed(null, 'ArrowLeft')">Left</button>
          <button class="right-btns" @click="keyPressed(null, 'ArrowRight')">Right</button>
        </div>
        <div>
          <p id="move-text">Fire</p>
          <button @click="keyPressed(null, 'Space')" id="shoot"></button>
        </div>
      </div>

    </div>
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
  data() {
    return {
      homeScreen: true,
      titleScreen: true,
      showgame: false,
      startBtnInvader: '',
      startText: [],
      // start at 0
      waveNumber: 0,
      totalLevels: 9,
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
      enemyHomingBulletSheet: '',
      explosionSheet: '',
      dashIconSheet: '',
      dashIcon: '',
      score: 0,
      missedShots: 0,
      invadersKilled: 0,
      timer: 99,
      domHealthVisual: 10,
      domRollCount: 1,
      domAttackSpeed: 1,
      domMoveSpeed: 1,
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
      myInterval: '',
      tickCounter: 0
    }
  },

  methods: {

    chooseGame(game) {
      if (game === 'invaders') {
        this.titleScreen = true;
        this.homeScreen = false;
        document.querySelector('#invaders').style.display = 'block'
      }
    },

    init() {
      this.chooseGame('invaders'); // remove line for pre game navigation menu
      this.startScreen = false;
      stage = new createjs.Stage("gameCanvas");

      // if mobile do not allow sounds as it causes bugs currently
      if (this.detectIfMobile()) {
        this.soundOn = false;
      }

      this.createSpriteSheets();
      this.createStartText();

      this.startBtnInvader = new InvaderParent.StartBtnInvader(this.invaderBlobSheet, 'blob');
      this.startBtnInvader.addToArrayAndStage(this.startBtnInvader, this.invaders, stage)

      this.nextWave()

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

    startBtn() {
      this.startScreen = false
      this.nextWave()

      this.handleCountdown('start')
    },

    tick(event) {
      // console.log(stage.children.length)

      document.querySelector('#gameCanvas').style.opacity = 1

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
      this.enemyHomingBulletSheet = EnemyHomingBulletSheet.createSheet();
      this.enemyBombSheet = EnemyBombSheet.createSheet();

      this.explosionSheet = CreateContactExplosion.createSheet();

      this.dashIconSheet = DashIconSheet.createSheet();
      this.dashIcon = new DashIcon();
      this.dashIcon.addToArray(this.players, stage, this.dashIconSheet, this.dashIcons);

      this.invaderSheet = InvaderSpriteSheet.createSheet();
      this.invaderWhiteSheet = InvaderWhiteSpriteSheet.createSheet();
      this.invaderPinkSheet = InvaderPinkSpriteSheet.createSheet();
      this.invaderBlobSheet = InvaderBlobSpriteSheet.createSheet();
    },

    createStartText() {
      let text1 = new createjs.Text("Space-bar to shoot", "36px Impact", "#85fc52");
      text1.x = 50;
      text1.y = 150;
      let text2 = new createjs.Text("Arrows to move ", "36px Impact", "#85fc52");
      text2.x = 50;
      text2.y = 200;
      let text3 = new createjs.Text("A and D to roll", "36px Impact", "#85fc52");
      text3.x = 50;
      text3.y = 250;
      this.startText.push(text1, text2, text3)
      stage.addChild(this.startText[0], this.startText[1], this.startText[2])
    },

    leaveLevel() {
      if (this.nextWaveCheck(this.invaders) && !this.inPostScreen) {
        console.log(this.beams.length)
        this.waveNumber++
        if (this.waveNumber <= this.totalLevels) {
          this.postScreen = true;
          this.inPostScreen = true;
          this.handleCountdown('stop');
          this.postWaveUpdateScore()
        }
        else {
          // game over screen
          this.postScreen = false;
          this.gameOver = true;
        }
        this.clearLevel()
      }
    },

    clearLevel() {

      this.invaders = []
      this.enemyBullets = []

      // remaining children
      console.log('remaining stage children', stage.children.length)
    },

    postScreenSelection(choice) {
      this.inPostScreen = false
      this.postScreen = false
      this.handleCountdown('start')
      this.missedShots = 0
      this.invadersKilled = 0

      if (choice === "dash") {
        this.player.rollCount++;
        this.domRollCount++;
      }
      else if (choice === "attack") {
        if (this.domAttackSpeed < 4) {
          this.player.attackSpeed -= 100;
          this.domAttackSpeed++;
        }
      }
      else if (choice === "move") {
        if (this.domMoveSpeed < 4) {
          this.player.moveSpeed += .5;
          this.domMoveSpeed++;
        }
      }
      else if (choice === "heal") {
        if (this.healthBar.healthPoints === 9) {
          this.domHealthVisual++
          this.healthBar.heal()
        }
        else if (this.healthBar.healthPoints < 9) {
          this.domHealthVisual += 2
          this.healthBar.heal()
          this.healthBar.heal()
        }
      }

      this.updateTimerForNewWave();
      this.nextWave();
    },

    postWaveUpdateScore() {
      this.score += this.timer * 2
      this.score -= this.missedShots
    },

    updateTimerForNewWave() {
      this.timer = 99
    },

    nextWave() {
      if (this.waveNumber === 1) {
        WaveOne.createWave(this.invaders, this.invaderSheet, this.invaderWhiteSheet, this.invaderPinkSheet, this.invaderBlobSheet, stage)
      }
      else if (this.waveNumber === 2) {
        WaveTwo.createWave(this.invaders, this.invaderSheet, this.invaderWhiteSheet, this.invaderPinkSheet, this.invaderBlobSheet, stage)
      }
      else if (this.waveNumber === 3) {
        WaveThree.createWave(this.invaders, this.invaderSheet, this.invaderWhiteSheet, this.invaderPinkSheet, this.invaderBlobSheet, stage)
      }
      else if (this.waveNumber === 4) {
        WaveFour.createWave(this.invaders, this.invaderSheet, this.invaderWhiteSheet, this.invaderPinkSheet, this.invaderBlobSheet, stage)
      }
      else if (this.waveNumber === 5) {
        WaveFive.createWave(this.invaders, this.invaderSheet, this.invaderWhiteSheet, this.invaderPinkSheet, this.invaderBlobSheet, stage)
      }
      else if (this.waveNumber === 6) {
        WaveSix.createWave(this.invaders, this.invaderSheet, this.invaderWhiteSheet, this.invaderPinkSheet, this.invaderBlobSheet, stage)
      }
      else if (this.waveNumber === 7) {
        WaveSeven.createWave(this.invaders, this.invaderSheet, this.invaderWhiteSheet, this.invaderPinkSheet, this.invaderBlobSheet, stage)
      }
      else if (this.waveNumber === 8) {
        WaveEight.createWave(this.invaders, this.invaderSheet, this.invaderWhiteSheet, this.invaderPinkSheet, this.invaderBlobSheet, stage)
      }
      else if (this.waveNumber === 9) {
        WaveNine.createWave(this.invaders, this.invaderSheet, this.invaderWhiteSheet, this.invaderPinkSheet, this.invaderBlobSheet, stage)
      }
    },

    removeOldPlayerBullets() {
      let isOffScreen = false;
      const stillInScreen = []
      const removeIndex = []

      // removes sprites that are no longer on canvas for beams
      if (this.beams.length > 0) {

        for (let i = 0; i < this.beams.length; i++) {
          isOffScreen = this.beams[i].removeIfOffScreen()

          if (!isOffScreen) {
            stillInScreen.push(this.beams[i]);
          }
          else {
            removeIndex.push(this.beams[i])
            // stage.removeChild(this.beams[i].sprite)

            if (!this.titleScreen && !this.postScreen) {
              this.missedShots++
              this.missedShotText(i)
            }
          }
          isOffScreen = false;

        }

        // remove from stage
        for (let i = 0; i < removeIndex.length; i++) {
          stage.removeChild(removeIndex[i].sprite);
          this.beams = stillInScreen;

        }
      }
    },

    missedShotText(i) {
      let text = new createjs.Text("-1", "10px Arial", "#FF0000");
      text.x = this.beams[i].sprite.x
      text.y = 20
      stage.addChild(text)
      setTimeout(() => { stage.removeChild(text) }, 500)
    },

    removeOldInvaderBullets() {
      // console.log(this.enemyBullets[0])
      if (this.enemyBullets.length > 0) {

        const stillInScreen = []
        const removeIndex = []
        // console.log(this.enemyBullets.length)

        // removes sprites that are no longer on canvas for beams
        if (this.enemyBullets.length > 0) {

          for (let i = 0; i < this.enemyBullets.length; i++) {

            if (!this.enemyBullets[i].sprite.visible) {
              removeIndex.push(i)
            }
            else {
              stillInScreen.push(this.enemyBullets[i])
            }
          }

          // remove from stage
          for (let i = 0; i < removeIndex.length; i++) {

            stage.removeChild(removeIndex[i].sprite);
            this.enemyBullets = stillInScreen;
          }
        }
      }

    },

    enemyFire() {
      this.tickCounter++
      for (let i = 0; i < this.invaders.length; i++) {
        if (this.invaders[i].sprite.currentAnimation !== "dead" && this.invaders[i].sprite.currentAnimation !== "dying") {
          // if on screen
          if (this.invaders[i].sprite.y > 2) {

            this.invaders[i].fire(this.invaders, i, this.enemyBullets, this.enemyBulletSheet, this.players, stage, this.soundOn);
            this.invaders[i].fireBomb(this.invaders, i, this.enemyBullets, this.enemyBombSheet, this.players, stage, this.soundOn);
            this.invaders[i].homingBullet(this.invaders, i, this.enemyBullets, this.enemyHomingBulletSheet, this.players, stage, this.soundOn);
            this.invaders[i].intervalShot(this.invaders, i, this.enemyBullets, this.enemyBulletSheet, this.players, stage, this.soundOn, this.tickCounter);
          }
        }
      }
      if (this.tickCounter > 40) this.tickCounter = 0
    },

    beamsCollisionDetection() {
      let x, y;
      let results, index;
      for (let i = 0; i < this.beams.length; i++) {
        x = this.beams[i].sprite.x
        y = this.beams[i].sprite.y
        results = this.beams[i].detectCollision(this.beams, this.invaders, stage);

        if (results.collision) {

          index = results.index
          this.beams[i].deathFall(this.invaders[index].sprite, stage)
          this.score += 10
          this.invadersKilled++
          this.connectedShotText(i)

          stage.removeChild(this.beams[i]);

          this.explosion = new Explosion(this.explosionSheet);
          this.explosion.addToStage(stage, x, y, this.soundOn)
          setTimeout(() => {
            stage.removeChild(this.explosion)
          }, 1500)

          this.firstCollisionStartGame()
        }
      }
    },

    connectedShotText(i) {
      let text = new createjs.Text("+10", "10px Arial", "#00ff00");
      text.x = this.beams[i].sprite.x
      text.y = this.beams[i].sprite.y
      stage.addChild(text)
      setTimeout(() => { stage.removeChild(text) }, 500)
    },

    firstCollisionStartGame() {
      // used to get out of the start menu as you shoot first invader
      if (this.titleScreen) {
        this.waveNumber++
        this.invaders = []
        this.startBtn()
        this.titleScreen = false
        stage.removeChild(this.startText[0], this.startText[1], this.startText[2])

        if (this.soundOn) {
          bMusic.play()
        }

      }
    },

    playerBulletCollisionDetection() {
      let spriteOffset = 6
      if (!this.player.invincible) {

        for (let i = 0; i < this.enemyBullets.length; i++) {

          if (this.enemyBullets.length > 0 && this.enemyBullets[i].sprite.visible !== false) {

            // bombs have bigger visuals so bigger hitboxes
            if (this.enemyBullets[i].type === 'bomb') {
              spriteOffset = 13
            }

            // if between player y: top and bottom: top && bottom
            if (this.enemyBullets[i].sprite.y >= this.player.sprite.y - spriteOffset && this.enemyBullets[i].sprite.y <= this.player.sprite.y + spriteOffset) {

              // if between player x: left and right
              if (this.enemyBullets[i].sprite.x >= this.player.sprite.x - spriteOffset && this.enemyBullets[i].sprite.x <= this.player.sprite.x + 15) {
                this.healthBar.takeDamage(this.player.invincible, this.soundOn)

                // dom state variable needs to be out of external component
                if (!this.player.invincible) {
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
      if (!this.player.sprite.invincible) {
        let spriteWidth;
        let spriteHeight;

        for (let i = 0; i < this.invaders.length; i++) {
          if (this.invaders[i].sprite.currentAnimation !== "default") {
            spriteWidth = this.getSpriteWidth(this.invaders[i].type)
            spriteHeight = this.getSpriteHeight(this.invaders[i].type)

            // check if between y quadrates of player and falling invader
            if (this.player.sprite.y <= this.invaders[i].sprite.y + spriteHeight && this.player.sprite.y >= this.invaders[i].sprite.y - spriteHeight) {
              // check if between x quadrates of player and falling invader
              if (this.player.sprite.x >= this.invaders[i].sprite.x - 8 && this.player.sprite.x <= this.invaders[i].sprite.x + 8 + spriteWidth) {

                this.healthBar.takeDamage(this.player.invincible, this.soundOn)

                // dom state variable needs to be out of external component
                if (!this.player.invincible) {
                  this.domHealthVisual--
                }
                this.invinciblePlayer();
              }
            }
          }
        }
      }
    },


    getSpriteWidth(invaderType) {
      if (invaderType === 'blob') {
        return 32
      }
      return 16
    },

    getSpriteHeight(invaderType) {
      return 16
    },

    invinciblePlayer() {
      if (!this.player.rolling && !this.player.invincible) {
        this.shield.sprite.visible = true
        this.player.invincible = true

        setTimeout(() => {
          this.player.invincible = false;
          this.shield.sprite.visible = false
        }, 2000)
      }
    },

    gameOverCheck() {
      if (this.healthBar.healthPoints < 1) {
        this.gameOver = true;
      }
    },

    keyPressed(event, mobileKey = null) {

      // if using mobile controls ignore event and make JS not break 
      if (event === null) {
        event = { code: '' }
      }

      // don't allow movement during "roll" which is the invincible dash left or right
      if (this.player.rolling === false && !this.homeScreen) {

        if (event.code === 'ArrowUp' || mobileKey === "ArrowUp") {
          this.pressedUp = 1;
        }
        if (event.code === 'ArrowDown' || mobileKey === "ArrowDown") {
          this.pressedDown = 1;
        }
        if (event.code === 'ArrowLeft' || mobileKey === "ArrowLeft") {
          this.pressedLeft = 1;
        }
        if (event.code === 'ArrowRight' || mobileKey === "ArrowRight") {
          this.pressedRight = 1;
        }
        if (event.code === 'Space' || mobileKey === "Space") {
          this.pressedSpace = 1;
        }
        if (event.key === 'a' || event.key === 'A' || mobileKey === "a") {
          this.pressedA = 1;
        }
        if (event.key === 'd' || event.key === 'D' || mobileKey === "d") {
          this.pressedD = 1;
        }

        if (mobileKey !== null) {
          this.mobileInput = true
          this.moveHandler()
          this.keyUp(event, mobileKey)
        }
        else {
          this.mobileInput = false
        }
      }
    },

    keyUp(event, mobileKey) {
      if (event.code === 'ArrowRight' || mobileKey === "ArrowRight") {
        this.pressedRight = 0;
      }
      else if (event.code === 'ArrowLeft' || mobileKey === "ArrowLeft") {
        this.pressedLeft = 0;
      }
      else if (event.code === 'ArrowUp' || mobileKey === "ArrowUp") {
        this.pressedUp = 0;
      }
      else if (event.code === 'ArrowDown' || mobileKey === "ArrowDown") {
        this.pressedDown = 0;
      }
      else if (event.code === 'Space' || mobileKey === "Space") {
        this.pressedSpace = 0;
      }
      else if (event.key === 'a' || event.key === 'A' || mobileKey === "a") {
        this.pressedA = 0;
      }
      else if (event.key === 'd' || event.key === 'D' || mobileKey === "d") {
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
      if (this.pressedRight === 1) {
        if (this.player.sprite.x < stage.canvas.width - 32) {
          let value = this.player.moveSpeed
          if (this.mobileInput) value = 35 + this.player.moveSpeed;

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
      if (this.pressedLeft === 1) {
        if (this.player.sprite.x > 0) {
          let value = this.player.moveSpeed
          if (this.mobileInput) value = 35 + this.player.moveSpeed;
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
      if (this.pressedUp === 1) {
        if (this.player.sprite.y > 350) {
          let value = this.player.moveSpeed
          if (this.mobileInput) value = 35 + this.player.moveSpeed;
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
      if (this.pressedDown === 1) {
        if (this.player.sprite.y < stage.canvas.height - 50) {
          let value = this.player.moveSpeed
          if (this.mobileInput) value = 35 + this.player.moveSpeed;
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
      if (this.pressedD === 1) {
        if (this.player.sprite.x < stage.canvas.width - 16 - 100) {

          // stops spending both rolls at once
          if (!this.player.rolling) {
            this.player.roll("right", this.healthBars, this.shields, this.dashIcons, this.soundOn);
          }
        }
      }
    },

    dashLeft() {
      if (this.pressedA === 1) {
        if (this.player.sprite.x > 100) {

          // stops spending both rolls at once
          if (!this.player.rolling) {
            this.player.roll("left", this.healthBars, this.shields, this.dashIcons, this.soundOn);
          }
        }
      }
    },

    fire() {
      if (this.pressedSpace === 1) {
        if (!this.fireDelay) {
          this.fireDelay = true;
          this.beam = new Beam(this.beamSheet);
          this.beam.setLocation(this.player.sprite, stage, this.beamSheet)
          this.beams.push(this.beam)
          stage.addChild(this.beam.sprite)

          this.beam.moveBeams(this.player.sprite, this.soundOn)

          setTimeout(() => { this.fireDelay = false }, this.player.attackSpeed)
          // setTimeout(() => { this.fireDelay = false}, 0)
        }
      }
    },


    nextWaveCheck() {
      if (this.startScreen) return false;

      for (let i = 0; i < this.invaders.length; i++) {
        if (this.invaders[i].sprite.currentAnimation !== "dead") {
          return false;
        }
      }
      return true;
    },

    myTimer() {
      this.timer--
    },

    handleCountdown(command) {
      if (command === 'start') {
        this.myInterval = setInterval(this.myTimer, 1000);
      }
      else {
        clearInterval(this.myInterval);
      }
    },

    detectIfMobile() {
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
    },
  },

  mounted() {
    this.init();
  }
}

</script>