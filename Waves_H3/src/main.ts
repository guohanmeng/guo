// Assignment 4 - Xinyu Liu Carrot

import * as PIXI from "pixi.js";
import * as dat from "dat.gui";
import { gsap } from "gsap";
import { Model, SceneState } from './model'
// import { SceneOne } from './sceneOne';
// import { SceneTwo } from './sceneTwo';
import { ContextSystem, LineStyle, UPDATE_PRIORITY } from "pixi.js";
let sizes: any = [];
let triHeights: any = [];
let triHeights2: any = [];
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
  gui.addColor(mModel.getInstance().colorData, 'firstColor')
  gui.addColor(mModel.getInstance().colorData, 'secondColor')
  gui.addColor(mModel.getInstance().colorData, 'thirdColor')
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
    element.clear();
    element.beginFill(mModel.colorData.firstColor);
    element.drawRect(0, 0, triWidth, triHeights[i].value);
    // element.drawRect(triX[i], 0, triWidth, triHeights[i].value);
  });


  this.lines2.forEach((element: PIXI.Graphics, i: number) => {
    element.clear();
    element.beginFill(mModel.colorData.thirdColor);
    element.drawRect(0, 0, triWidth, triHeights2[i].value);
    // element.drawRect(triX[i], 0, triWidth, triHeights[i].value);
  });
  // tl.to(triHeights, { value: (window.innerHeight - 40) * Math.sin(elaspsedTime), duration: 1 });
  tl.to(triHeights, { stagger: Math.sin(0.1), value: window.innerHeight - 40, duration: 1, yoyo: true });
  tl.to(triHeights, { stagger: Math.sin(0.1), value: 0, ease:"power2.out", duration: 1, yoyo: true }, "< 1");
  tl.to(triHeights2, { stagger: Math.sin(0.1), value: window.innerHeight - 40, duration: 1, yoyo: true}, "< 1");
  tl.to(triHeights2, { stagger: Math.sin(0.1), value: 0, ease:"power2.out", duration: 1, yoyo: true }, "< 1.1");
  // gsap.to(triHeights, { stagger: Math.sin(0.1), value: window.innerHeight - 40, duration: 1, yoyo: true });
  // triHeights.forEah((height: number, i: number) => {
  //   if (height == (window.innerHeight - 40)){
  //     reachH[i] = true;
  //   } 
  //   if(reachH[i] == true) {
  //     tl.fromTo(triHeights[i], { value: window.innerHeight - 40, duration: 1 }, {value: 0, duration: 1 });
  //   }
  //   reachH[i] = false;
  // })
  
 
 
  // gsap.to(triHeights, { stagger: 1 + Math.sin(elaspsedTime), value: 0, duration: 1 });


  // tl.delay(Math.sin(elaspsedTime));

  // tl.to(triHeights, { value: window.innerHeight - 40, duration: 1 });
  // tl.to(triHeights, { value: 0, duration: 1 });

  // this.lines.y += Math.sin(elaspsedTime);
  // renderer.backgroundColor = this.mModel.colorData.secondColor;

  // this.lines.forEach((element: PIXI.Graphics, i: number) => {
    
  //   element.clear();
  //   element.lineStyle(3, 0x00000, 1);
  //   // this.mModel.colorData.slice(2)
  //   element.moveTo(element.x, element.y);
  //   element.lineTo(element.x, lineHeight[i]);
  //   element.closePath();
  // });

}

main();


