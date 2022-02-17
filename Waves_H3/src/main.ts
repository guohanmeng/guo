// Assignment 4 - Xinyu Liu Carrot

import * as PIXI from "pixi.js";
import * as dat from "dat.gui";
import { gsap } from "gsap";
import { Model, SceneState } from './model'
import { SceneOne } from './sceneOne';
import { SceneTwo } from './sceneTwo';
import { ContextSystem, UPDATE_PRIORITY } from "pixi.js";


let lines: Array<PIXI.Graphics> =[];
let tl = gsap.timeline();
let mModel = new Model();
let sceneOne: SceneOne = new SceneOne(mModel);
let sceneTwo: SceneTwo = new SceneTwo(mModel);
interface LINE {
	lines: PIXI.Graphics;
}

const main = async () => {
  let app = new PIXI.Application();

  // Application Display
  document.body.style.margin = '0';
  app.renderer.view.style.position = 'absolute';
  app.renderer.view.style.display = 'block';
  app.renderer.resize(window.innerWidth, window.innerHeight);
  app.renderer.backgroundColor = 0x424949;
  
  let lines = new PIXI.Graphics();
  app.stage.addChild(lines);


  // Handle window resizing
  window.addEventListener('resize', (_e) => {
      app.renderer.resize(window.innerWidth, window.innerHeight);
  });

  document.body.appendChild(app.view);
  const gui = new dat.GUI()
  gui.add(mModel.getInstance().buttonData, 'width', 0, 200)
  gui.add(mModel.getInstance().buttonData, 'height', 0, 200)
  gui.addColor(mModel.getInstance().buttonData, 'firstColor')
  gui.addColor(mModel.getInstance().buttonData, 'secondColor')
  gui.addColor(mModel.getInstance().buttonData, 'thirdColor')
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

  app.ticker.add(update);
 
}
  
function update(delta: number) {

  mModel.elapsedTime += delta;

  switch (mModel.sceneState) {
      case SceneState.first:
          sceneOne.container.visible = true;
          sceneTwo.container.visible = false;
          sceneOne.update();
          break;
      
      case SceneState.second:
          sceneOne.container.visible = false;
          sceneTwo.container.visible = true;
          sceneTwo.update();
          break;
  
      default:
          break;
  }
};

  main();


   



