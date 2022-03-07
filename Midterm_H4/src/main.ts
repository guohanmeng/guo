// Assignment 4 - Xinyu Liu Carrot

import * as PIXI from "pixi.js";
import * as dat from "dat.gui";
import { gsap } from "gsap";
import { Model, SceneState } from './model';
import { ContextSystem, LineStyle, UPDATE_PRIORITY } from "pixi.js";
import { MotionPathPlugin } from "gsap/MotionPathPlugin.js";
import { ScrollTrigger } from "gsap/ScrollTrigger";
let tl = gsap.timeline();
let mModel = new Model();
let CurvePoints: Array<PIXI.AnimatedSprite> =[];
let Kids: Array<PIXI.AnimatedSprite> =[];
let Path: Array<any> = [];
let app = new PIXI.Application();
let KidTextures_1: Array<any> = [];
let KidTextures_2: Array<any> = [];
let KidTextures_3: Array<any> = [];
app.loader
    .add('kid1_1', 'assets/spr_kids/kid1_1.png')
    .add('kid1_2', 'assets/spr_kids/kid1_2.png')
    .add('kid1_3', 'assets/spr_kids/kid1_3.png')
    .add('kid1_4', 'assets/spr_kids/kid1_4.png')
    .add('kid1_5', 'assets/spr_kids/kid1_5.png')
    .add('kid1_6', 'assets/spr_kids/kid1_6.png')
    .add('kid1_7', 'assets/spr_kids/kid1_7.png')
    .add('kid1_8', 'assets/spr_kids/kid1_8.png')
    .add('kid2_1', 'assets/spr_kids/kid2_1.png')
    .add('kid2_2', 'assets/spr_kids/kid2_2.png')
    .add('kid2_3', 'assets/spr_kids/kid2_3.png')
    .add('kid2_4', 'assets/spr_kids/kid2_4.png')
    .add('kid2_5', 'assets/spr_kids/kid2_5.png')
    .add('kid2_6', 'assets/spr_kids/kid2_6.png')
    .add('kid2_7', 'assets/spr_kids/kid2_7.png')
    .add('kid2_8', 'assets/spr_kids/kid2_8.png')
    .add('kid3_1', 'assets/spr_kids/kid3_1.png')
    .add('kid3_2', 'assets/spr_kids/kid3_2.png')
    .add('kid3_3', 'assets/spr_kids/kid3_3.png')
    .add('kid3_4', 'assets/spr_kids/kid3_4.png')
    .add('kid3_5', 'assets/spr_kids/kid3_5.png')
    .add('kid3_6', 'assets/spr_kids/kid3_6.png')
    .add('kid3_7', 'assets/spr_kids/kid3_7.png')
    .add('kid3_8', 'assets/spr_kids/kid3_8.png')
    .load(onLoaded);


// PIXI.Loader.shared.add("assets/spriteSheetTrial.json").load(onLoaded);
function onLoaded() {
    // create an array to store the textures

    for (let i = 0; i < 8; i++) {
        const texture = PIXI.Texture.from(`kid1_${i + 1}`);
        KidTextures_1.push(texture);
    }

    for (let i = 0; i < 8; i++) {
      const texture = PIXI.Texture.from(`kid2_${i + 1}`);
      KidTextures_2.push(texture);
  }

    for (let i = 0; i < 8; i++) {
      const texture = PIXI.Texture.from(`kid3_${i + 1}`);
      KidTextures_3.push(texture);
    }

    var path = [500, 200, 850, 1000, window.innerWidth + 100, 200]; 
  
    let path2 = [{
      x: 0,
      y: 0
    }];

    for (let i = 0; i < path.length; i=i+2) {
      path2.push({x: path[i], y: path[i+1]})
    }

    let graphics = new PIXI.Graphics()
    graphics.lineStyle(10, 0xffffff, 1);
    graphics.bezierCurveTo(500, 200, 850, 1000, window.innerWidth + 100, 200);
    app.stage.addChild(graphics);
    graphics.endFill();
  
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);


      // create kid1 AnimatedSprite
      const kid1 = new PIXI.AnimatedSprite(KidTextures_1);
      kid1.x = 0;
      kid1.y = 0;
      kid1.animationSpeed = 0.3;
      kid1.anchor.set(0.5, 0.7);
      kid1.scale.set(0.1);
      kid1.gotoAndPlay(0);
      Kids.push(kid1);
      app.stage.addChild(kid1);

      const kid2 = new PIXI.AnimatedSprite(KidTextures_2);
      kid2.x = 0;
      kid2.y = 0;
      kid2.animationSpeed = 0.3;
      kid2.anchor.set(0.5, 0.7);
      kid2.scale.set(0.1);
      kid2.gotoAndPlay(0);
      Kids.push(kid2);
      app.stage.addChild(kid2);

      const kid3 = new PIXI.AnimatedSprite(KidTextures_3);
      kid3.x = 0;
      kid3.y = 0;
      kid3.animationSpeed = 0.3;
      kid3.anchor.set(0.5, 0.7);
      kid3.scale.set(0.1);
      kid3.gotoAndPlay(0);
      Kids.push(kid3);
      app.stage.addChild(kid3);

      gsap.to(kid1, 12, {
        duration: 12,
        // delay: 1, 
        repeat: 12,
        repeatDelay: 1,
        ease: "none",
        motionPath:{          
          path: path2,
          // align: path2,
          // alignOrigin: [0.5, 0.5],
          autoRotate: true,
          useRadians: true,
          // curviness: 1
          type: "cubic"}

        
      });

      gsap.to(kid2, {
        scrollTrigger: {
          // pin: true,
          start: "top 0%",
          end: '+=1000px',
          scrub: 1,
          // snap: 1 / (window.innerWidth + 1000),
          markers: true,
          // onUpdate: self => {
          //   gsap.to(kid2, {rotation: () => self.direction === 1 ? 0 : -180, overwrite: 'auto'});
          // }
        },
        duration: 12,
        delay: 0.5, 
        repeat: 12,
        repeatDelay: 1,
        ease: "none",
        immediateRender: true,
        motionPath:{
          path: path2,
          autoRotate: true,
          useRadians: true,
          // curviness: 1
          type: "cubic",
          
        }
      });

      gsap.to(kid3, {
        duration: 12,
        delay: 1, 
        repeat: 12,
        repeatDelay: 1,
        ease: "none",
        motionPath:{
          path: path2,
          autoRotate: true,
          useRadians: true,
          type: "cubic",
          // curviness: 1
        }
      });

      // const gui = new dat.GUI()
      // // gui.addColor(mModel.getInstance().colorData, 'firstColor').onChange( function() { Wave1Color = mModel.colorData.firstColor } );
      // // gui.addColor(mModel.getInstance().colorData, 'secondColor').onChange( function() { app.renderer.backgroundColor = mModel.colorData.secondColor} );
      // // gui.addColor(mModel.getInstance().colorData, 'thirdColor').onChange( function() { Wave2Color = mModel.colorData.thirdColor } );
      // let timelineFolder = gui.addFolder("timeline");
      // timelineFolder.open();
      // let tlCallbacks = {
      //     pause: () => tl.pause(),
      //     play: () => tl.play(),
      //     reverse: () => tl.reverse(),
      //     progress: 0
      // }
    
      // timelineFolder.add(tlCallbacks, "pause");
      // timelineFolder.add(tlCallbacks, "play");
      // timelineFolder.add(tlCallbacks, "reverse");
      // timelineFolder.add(tlCallbacks, "progress", 0.0, 1.0, 0.01).onChange((value) => {
      //     tl.play()
      //     tl.progress(value)
      //     tl.pause()
      // });
  

      //   let context = {
      //     CurvePoints
      //   };
        // app.ticker.add(update, context);
    


    // start animating
    app.start();


 
    // Application Display

    document.body.style.margin = '0';
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';
    app.renderer.resize(window.innerWidth + 1000, window.innerHeight);
    app.renderer.backgroundColor = 0x00000;
  

  
    // Handle window resizing
    window.addEventListener('resize', (_e) => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    });
  
    document.body.appendChild(app.view);
  
 
}

// let elaspsedTime = 0;

// function update(this: any, delta: number) {

//   elaspsedTime += 0.1;

//   for (let i = 0; i < 50; i ++) {
//     Path.push({x: 10 * i, y: Math.sin(0.1 * elaspsedTime)})
//   }

//   this.CurvePoints.forEach((point: PIXI.AnimatedSprite, i: number) => {

//     point.x = 50 * i;

//   });

// }

// for(let i = 0; i < Kids.length; i++){
//   gsap.to(Kids[i], {
//     duration: 12,
//     delay: i * 0.5, 
//     repeat: 12,
//     repeatDelay: 2,
//     ease: "none",
//     motionPath:{
//       path: path2,
//       // autoRotate: true,
//       // curviness: 1
//     }
//   });
// }

