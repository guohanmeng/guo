// Assignment 2 - Xinyu Liu Carrot

import * as PIXI from "pixi.js"

interface flowerVar {
	// velocity: any;
	petal: PIXI.Graphics;
	center: PIXI.Graphics;
	backgroundBox: PIXI.Graphics;
}
let colorSet: Array<number> = [];
let pedalL: number; 
let pedalW: number;
let centerS: number;
let colorWinter: Array<number> = [0x931A25, 0xE97171, 0xF5EFEF];
let colorSpring: Array<number> = [0xEFD9D1, 0xD8AC9C, 0x999B84];
let colorSummer: Array<number> = [0xffca00, 0x240d00, 0x648e00];
let colorAutumn: Array<number> = [0xffd300, 0xffa100, 0xa74c00];
  
const main = async () => {
  let app = new PIXI.Application();

  // Application Display
  document.body.style.margin = '0';
  app.renderer.view.style.position = 'absolute';
  app.renderer.view.style.display = 'block';
  app.renderer.resize(window.innerWidth, window.innerHeight);
  app.renderer.backgroundColor = 0xFFB200;
  
  let petal = new PIXI.Graphics();
  app.stage.addChild(petal);

  let center = new PIXI.Graphics();
  app.stage.addChild(center);

  let backgroundBox = new PIXI.Graphics();
  app.stage.addChild(center);

  // Handle window resizing
  window.addEventListener('resize', (_e) => {
      app.renderer.resize(window.innerWidth, window.innerHeight);
  });

  document.body.appendChild(app.view);
  
  let context: flowerVar = {
    petal,
    center,
    backgroundBox
  };


  app.ticker.add(update, context);

}
  

  

  function update(this: any, delta: number) {

    if (new Date().getMonth() == 11 || new Date().getMonth() == 0 || new Date().getMonth() == 1){
      colorSet = colorWinter;
      pedalL = 23;
      pedalW = 20;
      centerS = 2;
    } else if (new Date().getMonth() == 2 || new Date().getMonth() == 3 || new Date().getMonth() == 4){
      colorSet = colorSpring;
      pedalL = 25;
      pedalW = 20;
      centerS = 1;
    } else if (new Date().getMonth() == 5 || new Date().getMonth() == 6 || new Date().getMonth() == 7){
      colorSet = colorSummer;
      pedalL = 30;
      pedalW = 15;
      centerS = 5;
    } else if (new Date().getMonth() == 8 || new Date().getMonth() == 9 || new Date().getMonth() == 10){
      colorSet = colorAutumn;
      pedalL = 30;
      pedalW = 8;
      centerS = 1;
    } 
  
    //Time convert
    let secondProgress = new Date().getSeconds() / 60;
    let minProgress = new Date().getMinutes() / 60;
  
    //Draw background boxes
    this.backgroundBox.clear();
    this.backgroundBox.beginFill(colorSet[2]);
    this.backgroundBox.endFill();

    //Draw pedals
    this.pedal.clear();
    this.pedal.beginFill(colorSet[0]);
    this.pedal.endFill();

    //Draw center circles
    this.center.clear();
    this.center.beginFill(colorSet[1]);
    this.center.endFill();


  }


  main();


   



