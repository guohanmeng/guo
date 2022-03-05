// Assignment 4 - Xinyu Liu Carrot

import * as PIXI from "pixi.js";
import * as dat from "dat.gui";
import { gsap } from "gsap";
import { Model, SceneState } from './model';
import { ContextSystem, LineStyle, UPDATE_PRIORITY } from "pixi.js";


var path = [100, 200, 200, 200, 240, 100];

let path2 = [{
  x: 0,
  y: 0
}];

for (let i = 0;i < path.length; i=i+2) {
  path2.push({x: path[i], y: path[i+1]})
}
let graphics = new PIXI.Graphics()
graphics.lineStyle(10, 0x3500FA, 1);
graphics.bezierCurveTo(100, 200, 200, 200, 240, 100)
// graphics.endFill();
app.stage.addChild(graphics);


gsap.registerPlugin(MotionPathPlugin);

gsap.to(bunny, {
  duration: 5, 
  repeat: 12,
  repeatDelay: 3,
  yoyo: true,
  ease: "none",
  motionPath:{
    path: path2,
    // autoRotate: true,
    type: 'cubic'
  }
});

// MotionPathHelper.create('#path')

let sizes: any = [];
let triHeights: any = [];
let triHeights2: any = [];
let Wave1Color = 0x00000;
let Wave2Color = 0xffffff;
let reachH: any = [];
let triX: any = [];
let lines: Array<PIXI.Graphics> =[];
let lines2: Array<PIXI.Graphics> =[];
let lines1Con = new PIXI.Container();
// let lines2Con = new PIXI.Container();

let tl = gsap.timeline();
let mModel = new Model();
// let sceneOne: SceneOne = new SceneOne(mModel);
// let sceneTwo: SceneTwo = new SceneTwo(mModel);
let triWidth = window.innerHeight / 40;
let gapWidth = window.innerHeight / 20;
const main = async () => {
  let app = new PIXI.Application();

  // Application Display
  document.body.style.margin = '0';
  app.renderer.view.style.position = 'absolute';
  app.renderer.view.style.display = 'block';
  app.renderer.resize(window.innerWidth, window.innerHeight);
  app.renderer.backgroundColor = mModel.colorData.secondColor;

  let bunny = new PIXI.Sprite.fromImage('https://pixijs.io/examples-v4/examples/assets/bunny.png')
app.stage.addChild(bunny)
bunny.anchor.set(0.5)
  // Handle window resizing
  window.addEventListener('resize', (_e) => {
      app.renderer.resize(window.innerWidth, window.innerHeight);
  });

  document.body.appendChild(app.view);

  for (let i = 0; i < 40; i++) {
    const element = new PIXI.Graphics();
    element.x = 20 + i * (triWidth + gapWidth);
    element.y = 20;
    lines.push(element);
    triHeights[i] = {
      value: 0,
    };
    triX[i] = {
      value: 0,
    };
    lines1Con.addChild(element);
    app.stage.addChild(element);
  }

  for (let i = 0; i < 40; i++) {
    const element = new PIXI.Graphics();
    element.x = 20 + i * (triWidth + gapWidth);
    element.y = 20;
    lines2.push(element);
    triHeights2[i] = {
      value: 0,
    };
    triX[i] = {
      value: 0,
    };
    app.stage.addChild(element);
  }


  // GUI
  const gui = new dat.GUI()
  gui.addColor(mModel.getInstance().colorData, 'firstColor').onChange( function() { Wave1Color = mModel.colorData.firstColor } );
  gui.addColor(mModel.getInstance().colorData, 'secondColor').onChange( function() { app.renderer.backgroundColor = mModel.colorData.secondColor} );
  gui.addColor(mModel.getInstance().colorData, 'thirdColor').onChange( function() { Wave2Color = mModel.colorData.thirdColor } );
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
    lines,
    lines2,
    lines1Con
  };
  app.ticker.add(update, context);
 
}

let elaspsedTime = 0;


function update(this: any, delta: number) {

  elaspsedTime += 0.1;

  // for(let j = 0; j < triX.length; j++){
  //   triX[j] = j * (triWidth + gapWidth);
  // }

  this.lines.forEach((element: PIXI.Graphics, i: number) => {
    let triH = 0;
    element.clear();
    element.beginFill(Wave1Color);
    if (triHeights[i].value <= 200){
      triH = 0;
    } else{
      triH = triHeights[i].value - 200;
    }
    element.drawRect(0, 0, triWidth, triHeights[i].value);
    element.endFill();
    element.beginFill(Wave2Color);
    element.drawRect(0, 0, triWidth, triH);
    element.endFill();
    // element.drawRect(triX[i], 0, triWidth, triHeights[i].value);
  });


  this.lines2.forEach((element: PIXI.Graphics, i: number) => {
    let triH2;
    element.clear();
    element.beginFill(Wave2Color);
    element.drawRect(0, 0, triWidth, triHeights2[i].value);
    if (triHeights2[i].value <= 200){
      triH2 = 0;
    } else{
      triH2 = triHeights2[i].value - 200;
    }
    element.beginFill(Wave1Color);
    element.drawRect(0, 0, triWidth, triH2);
    element.endFill();
    // element.drawRect(triX[i], 0, triWidth, triHeights[i].value);
  });
  // tl.to(triHeights, { value: (window.innerHeight - 40) * Math.sin(elaspsedTime), duration: 1 });
  tl.to(triHeights, { stagger: Math.sin(0.1), value: window.innerHeight - 40, duration: 1, yoyo: true });
  tl.to(triHeights, { stagger: Math.sin(0.1), value: 0, ease:"power2.out", duration: 1, yoyo: true }, "< 1");
  tl.to(triHeights2, { stagger: Math.sin(0.1), value: window.innerHeight - 40, duration: 1, yoyo: true}, "< 1");
  tl.to(triHeights2, { stagger: Math.sin(0.1), value: 0, ease:"power2.out", duration: 1, yoyo: true }, "< 1.1");
}

main();


