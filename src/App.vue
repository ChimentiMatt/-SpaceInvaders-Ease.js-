<script setup>
import HelloWorld from './components/HelloWorld.vue'
import waveOneMovements from './components/Movements.js'
import invaderImg from "./assets/invader.png"

</script>

<template>  
  <!--<HelloWorld msg="Vite + Vue" /> -->
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
      ];

      loader = new createjs.LoadQueue(false);
      loader.addEventListener("complete", this.handleComplete);

      loader.loadManifest(manifest, true, "./assets/");

      // var circle = new createjs.Shape();
      // circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
      // circle.x = 100;
      // circle.y = 100;
      // stage.addChild(circle);

      stage.update();
    },

    handleComplete() {
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
      var spriteSheet = new createjs.SpriteSheet({
          images: [loader.getResult("invader")],
          framerate: 6,
          "frames": [
              [0, 16, 16, 16],
              [0, 0, 16, 16]
          ],

          animations: {
            "default" : { "frames": [0, 1]}
          }
        });

      let enemy = new createjs.Sprite(spriteSheet, "default");
      console.log(stage.canvas.width /2)
      enemy.y = -10;
      enemy.x = stage.canvas.width - 50;
      this.enemies.push(enemy)

    },

    paintInvaders() {
      for (let i = 0; i < this.enemies.length; i++){
        stage.addChild(this.enemies[i])
      }
    },

    moveInvaders() {
      for (let i = 0; i < this.enemies.length; i++){
        createjs.Tween.get(this.enemies[i])
        .to({ y: waveOneMovements[0] }, 1000)
        .to({ x: this.enemies[i].x - waveOneMovements[1] }, 4000)


      }

    console.log(waveOneMovements)
    }



  },


  mounted() {
    this.init()
  }


}

</script>