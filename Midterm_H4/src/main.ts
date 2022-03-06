// Assignment 4 - Xinyu Liu Carrot

import * as PIXI from "pixi.js";
import * as dat from "dat.gui";
import { gsap } from "gsap";
import { Model, SceneState } from './model';
import { ContextSystem, LineStyle, UPDATE_PRIORITY } from "pixi.js";
import { MotionPathPlugin } from "gsap/MotionPathPlugin.js";
let tl = gsap.timeline();
let mModel = new Model();
let CurvePoints: Array<PIXI.AnimatedSprite> =[];
let Kids: Array<PIXI.AnimatedSprite> =[];
let Path: Array<any> = [];
let app = new PIXI.Application();
app.loader
    .add('snow1', 'assets/spr_snowball_walk/spr_snowball_walk_1.png')
    .add('snow2', 'assets/spr_snowball_walk/spr_snowball_walk_2.png')
    .add('snow3', 'assets/spr_snowball_walk/spr_snowball_walk_3.png')
    .add('snow4', 'assets/spr_snowball_walk/spr_snowball_walk_4.png')
    .add('snow5', 'assets/spr_snowball_walk/spr_snowball_walk_5.png')
    .add('snow6', 'assets/spr_snowball_walk/spr_snowball_walk_6.png')
    .load(onLoaded);

// PIXI.Loader.shared.add("assets/spriteSheetTrial.json").load(onLoaded);
function onLoaded() {
    // create an array to store the textures
    const snowballTextures = [];
    let i;

    for (i = 0; i < 6; i++) {
        const texture = PIXI.Texture.from(`snow${i + 1}`);
        snowballTextures.push(texture);
    }

    var path = [500, 200, 850, 100, 1000, 200, window.innerWidth + 100, 200]; 
  
    let path2 = [{
      x: 0,
      y: 0
    }];
  


    // let graphics = new PIXI.Graphics()
    // graphics.lineStyle(10, 0xffffff, 1);
    // graphics.bezierCurveTo(500, 200, 850, 1000, window.innerWidth + 100, 200);
    // app.stage.addChild(graphics);
    // graphics.endFill();
  
    gsap.registerPlugin(MotionPathPlugin);


    for (i = 0; i < 6; i++) {
    // create an snowball AnimatedSprite
        const snowball = new PIXI.AnimatedSprite(snowballTextures);
        snowball.animationSpeed = 0.1;
        snowball.anchor.set(0.5);
        // snowball.rotation = Math.random() * Math.PI;
        snowball.scale.set(0.09);
        snowball.gotoAndPlay(0);
        Kids.push(snowball);
        app.stage.addChild(snowball);


        const gui = new dat.GUI()
        // gui.addColor(mModel.getInstance().colorData, 'firstColor').onChange( function() { Wave1Color = mModel.colorData.firstColor } );
        // gui.addColor(mModel.getInstance().colorData, 'secondColor').onChange( function() { app.renderer.backgroundColor = mModel.colorData.secondColor} );
        // gui.addColor(mModel.getInstance().colorData, 'thirdColor').onChange( function() { Wave2Color = mModel.colorData.thirdColor } );
        let timelineFolder = gui.addFolder("timeline");
        timelineFolder.open();
        let tlCallbacks = {
            pause: () => tl.pause(),
            play: () => tl.play(),
            reverse: () => tl.reverse(),
            progress: 0
        }
      
        timelineFolder.add(tlCallbacks, "pause");
        timelineFolder.add(tlCallbacks, "play");
        timelineFolder.add(tlCallbacks, "reverse");
        timelineFolder.add(tlCallbacks, "progress", 0.0, 1.0, 0.01).onChange((value) => {
            tl.play()
            tl.progress(value)
            tl.pause()
        });

        let context = {
          CurvePoints
        };
        app.ticker.add(update, context);
    }


    // start animating
    app.start();


 
    // Application Display

    document.body.style.margin = '0';
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';
    app.renderer.resize(window.innerWidth, window.innerHeight);
    app.renderer.backgroundColor = 0x00000;
  

  
    // Handle window resizing
    window.addEventListener('resize', (_e) => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    });
  
    document.body.appendChild(app.view);
  
 
}

let elaspsedTime = 0;

function update(this: any, delta: number) {

  elaspsedTime += 0.1;

  for (let i = 0; i < 50; i ++) {
    Path.push({x: 10 * i, y: Math.sin(0.1)})
  }

  this.CurvePoints.forEach((point: PIXI.AnimatedSprite, i: number) => {
    point.x = 50 * i;
    // element.drawRect(triX[i], 0, triWidth, triHeights[i].value);
  });

}

for(let i = 0; i < Kids.length; i++){
  gsap.to(Kids[i], {
    duration: 12,
    delay: i * 0.5, 
    repeat: 12,
    repeatDelay: 2,
    ease: "none",
    motionPath:{
      path: Path,
      // autoRotate: true,
      // curviness: 1
    }
  });
}

