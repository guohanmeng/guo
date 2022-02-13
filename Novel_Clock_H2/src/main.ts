// Assignment 2 - Xinyu Liu Carrot

import * as PIXI from "pixi.js"

interface flowerVar {
	// velocity: any;
	petal: PIXI.Graphics;
	center: PIXI.Graphics;
	backgroundBox: PIXI.Graphics;
}

let colorWinter: Array<number> = [0x931A25, 0xE97171, 0xF5EFEF];
let colorSpring: Array<number> = [0xEFD9D1, 0xD8AC9C, 0x999B84];
let colorSummer: Array<number> = [0xffca00, 0x240d00, 0x648e00];
let colorAutumn: Array<number> = [0xffd300, 0xffa100, 0xa74c00];

const Today = () => {
	let today = new Date();
	today.setHours(0, 0, 0, 0);
	return today;
};
// const timeNow: clockVariable = {}

// get current time
function getNow(){
  const now = new Date();
};

console.log(getNow);

  
  // const dayInSeconds = 86400;
  
  const main = async () => {
    let app = new PIXI.Application();

    // Application Display
    document.body.style.margin = '0';
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';
    app.renderer.resize(window.innerWidth, window.innerHeight);
    // app.renderer.backgroundColor = 0xFFF0D9;
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
  
  }
  main();
 
  //   // View size = windows
  //   app.renderer.resize(window.innerWidth, window.innerHeight);
  
  //   let backgroundRect = new PIXI.Graphics();
  //   app.stage.addChild(backgroundRect);
  
  //   let slider = new PIXI.Graphics();
  //   app.stage.addChild(slider);
  
  //   const dayCircle = new PIXI.Graphics();
  //   dayCircle.x = window.innerWidth / 2 - dayCircle.width / 2;
  //   dayCircle.y = window.innerHeight / 2 - dayCircle.height / 2;
  //   app.stage.addChild(dayCircle);
  

  
  //   // Handle window resizing
  //   window.addEventListener('resize', (_e) => {
  //     app.renderer.resize(window.innerWidth, window.innerHeight);
  //     dayCircle.x = window.innerWidth / 2;
  //     dayCircle.y = window.innerHeight / 2;
  //   });
  

  
  //   let time = 0;
  

  
  //   app.ticker.add(update, context);
  // };
  

  function update(this: any, delta: number) {
    let currentSeconds = Math.floor(
      (new Date().getTime() - Today().getTime()) / 1000
    );

    let circleWidth;
    let colorSet;
    let pedalL, pedalW;
    let centerS;

    if (new Date().getMonth() == 11 || new Date().getMonth() == 0 || new Date().getMonth() == 1){
      colorSet = colorWinter;
      pedalL = 23;
      pedalW = 20;
      centerS = 5;
    } else if (new Date().getMonth() == 2 || new Date().getMonth() == 3 || new Date().getMonth() == 4){
      colorSet = colorSpring;
      pedalL = 25;
      pedalW = 20;
      centerS = 3;
    } else if (new Date().getMonth() == 5 || new Date().getMonth() == 6 || new Date().getMonth() == 7){
      colorSet = colorSummer;
      pedalL = 30;
      pedalW = 15;
      centerS = 30;
    } else if (new Date().getMonth() == 8 || new Date().getMonth() == 9 || new Date().getMonth() == 10){
      colorSet = colorAutumn;
      pedalL = 30;
      pedalW = 8;
      centerS = 3;
    } 
  
    //Time convert
    let secondProgress = new Date().getSeconds() / 60;
    let minProgress = new Date().getMinutes() / 60;
  
    this.backgroundRect.clear();
    this.backgroundRect.beginFill(0x5da1e2, 1 - dayProgress);
    this.backgroundRect.drawRoundedRect(
      50,
      50,
      window.innerWidth - 100,
      window.innerHeight - 100,
      30
    );
    this.backgroundRect.endFill();
    this.dayCircle.clear();
    this.dayCircle.lineStyle(minProgress * 30, 0xffffff, 1);
    this.dayCircle.drawCircle(0, 0, circleWidth);
    if (window.innerWidth > window.innerHeight) {
      this.dayCircle.x =
        (window.innerWidth / 1.5 - this.dayCircle.width) * dayProgress +
        (window.innerWidth / 2 -
          window.innerWidth / 3 +
          this.dayCircle.width / 2);
    } else if (window.innerWidth < window.innerHeight) {
      this.dayCircle.y =
        (window.innerHeight / 1.5 - this.dayCircle.width) * dayProgress +
        (window.innerHeight / 2 -
          window.innerHeight / 3 +
          this.dayCircle.width / 2);
    }
  
    this.secondCircle.clear();
    this.secondCircle.x = this.dayCircle.x;
    this.secondCircle.y = this.dayCircle.y;
  
    this.secondCircle.beginFill(0x4f398a, secondProgress);
    this.secondCircle.drawCircle(
      0,
      0,
      (this.dayCircle.width / 2) * secondProgress
    );
    this.secondCircle.endFill();
  }
  
  // main();
  

  class Flower {
    centerSize: number;
    petalLength: number;
    petalNum: number;
    flowerSize: number;
    petalColor: number;
    centerColor: number;

    constructor(centerSize: number, petalLength: number, petalNum: number, flowerSize: number, colors: Array<number>) {
      this.centerSize = centerSize;
      this.petalLength = petalLength;
      this.petalNum = petalNum;
      this.flowerSize = Math.floor(Math.random() * 3 + 1);
      this.petalColor = colors[0];
      this.centerColor = colors[1];
    }

    petal() {

    }
  }


   



