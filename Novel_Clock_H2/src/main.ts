// Assignment 2 - Xinyu Liu Carrot

import * as PIXI from "pixi.js"
import { PI_2, Sprite } from "pixi.js";
import * as dat from 'dat.gui';

const gui = new dat.GUI();
let folder1 = gui.addFolder('My folder');
// Add a string controller. 
// let person = {name: 'Sam'}; 
// gui.add(person, 'name');  
// Add a number controller slider. 
// let car = {speed: 45}; 
// gui.add(person, 'age', 0, 100);

const getTime = () => {
    const time = new Date();
    return {
      date: time.getDate(),
      hour: time.getHours(),
      minute: time.getMinutes(),
    };
  };

let buttonData = {
    width: 200,
    height: 100
}
gui.add(buttonData, "width", 0, 500);

// main function
const main = async () => {

    let app = new PIXI.Application();

    // Application Display
    document.body.style.margin = '0';
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';
    app.renderer.resize(window.innerWidth, window.innerHeight);
}

let button = new PIXI.Graphics();


function onHover(){

}

   



