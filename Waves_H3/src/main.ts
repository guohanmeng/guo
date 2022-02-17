// Assignment 4 - Xinyu Liu Carrot

import * as PIXI from "pixi.js";
import * as dat from "dat.gui";
import { gsap } from "gsap";
import { Model, SceneState } from './model'
import { SceneOne } from './sceneOne';
import { SceneTwo } from './sceneTwo';
import { UPDATE_PRIORITY } from "pixi.js";

let tl = gsap.timeline;
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
  
 
}
  
function update(this: any, delta: number) {
  for (let x = 0; x < window.innerHeight; x ++){
    
 }
}

  main();


   



